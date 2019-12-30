<template>
  <v-container>
    <v-toolbar class="mb-2">
      <v-toolbar-title>
        Search
        <span class="font-weight-light">({{this.getCurrentPropType}})</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card class="mb-2">
      <v-card-text>
        <v-combobox
          v-model="citymodel"
          :items="cities"
          :loading="searchLoading"
          :search-input.sync="search"
          clearable
          filled
          hide-no-data
          label="Enter a city"
          prepend-icon="mdi-database-search"
          return-object
        ></v-combobox>
        <div class="d-flex flex-column flex-sm-row">
          <v-text-field
            filled
            clearable
            label="Minimum Price USD"
            :rules="this.numrules"
            v-model="minimumprice"
          >
            <v-icon slot="prepend">mdi-currency-usd</v-icon>
          </v-text-field>
          <v-text-field
            filled
            clearable
            label="Maximum Price USD"
            :rules="this.numrules"
            v-model="maximumprice"
          >
            <v-icon slot="prepend">mdi-currency-usd</v-icon>
          </v-text-field>
        </div>
      </v-card-text>
    </v-card>
    <v-card v-if="pages && pages > 0" class="pa-2">
      <v-card-title class="headline justify-center">
        <span v-if="this.citymodel">Properties in {{this.citymodel}}</span>
        <span v-else>Properties (all locations)</span>
      </v-card-title>
      <v-card-text
        class="text-center text-capitalize"
        v-if="minimumprice"
      >low: ${{this.minimumprice}}</v-card-text>
      <v-card-text
        class="text-center text-capitalize"
        v-if="maximumprice"
      >high: ${{this.maximumprice}}</v-card-text>
      <v-row dense>
        <v-col :key="i" v-for="(property, i) in bycityproperties" cols="12" sm="6">
          <v-card>
            <v-carousel v-if="!property.images || property.images.length === 0" hide-delimiters>
              <v-carousel-item>
                <v-img height="100%" contain :src="require('../assets/logo.png')"></v-img>
              </v-carousel-item>
            </v-carousel>
            <v-carousel v-else hide-delimiters>
              <v-carousel-item :key="i" v-for="(image, i) in property.images">
                <v-img height="100%" contain :src="image.source"></v-img>
              </v-carousel-item>
            </v-carousel>
            <v-card-title v-if="property.rent">${{property.rent}} / {{property.basis}}</v-card-title>
            <v-card-title v-else>${{property.price}}</v-card-title>
            <v-card-text>
              Location: {{ property.location.city }},{{
              property.location.state
              }}
            </v-card-text>
            <v-card-text class="text-truncate">{{ property.description }}</v-card-text>
            <v-card-actions>
              <v-btn small outlined @click="viewSingle(property._id)">Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination v-model="page" :length="pages"></v-pagination>
      </div>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      page: 1,
      pages: null,
      pagesize: 2,
      propcount: null,
      cities: [],
      bycityproperties: null,
      searchLoading: false,
      citymodel: null,
      minimumprice: null,
      maximumprice: null,
      search: null,
      numrules: [
        value => !value || value === "0" || !!+value || "field must be a number"
      ]
    };
  },
  methods: {
    getPropsByCity() {
      if (!this.citymodel && !this.minimumprice && !this.maximumprice) {
        this.bycityproperties = null;
        this.pages = null;
        localStorage.removeItem(this.savedsearch);
        return;
      }
      let parms = {
        page: this.page,
        pagesize: this.pagesize,
        property: this.getCurrentPropType
      };
      if (this.citymodel) {
        parms = {
          ...parms,
          city: this.citymodel.split(",")[0],
          state: this.citymodel.split(",")[1]
        };
      }
      if (this.maximumprice) {
        parms = {
          ...parms,
          max: this.maximumprice
        };
      }
      if (this.minimumprice) {
        parms = {
          ...parms,
          min: this.minimumprice
        };
      }
      axios
        .get(`/api/location/property`, {
          params: parms
        })
        .then(doc => {
          this.bycityproperties = { ...doc.data.docs };
          this.propcount = doc.data.count;
          this.pages = doc.data.pages;
          localStorage.setItem(
            this.savedsearch,
            JSON.stringify({
              citymodel: this.citymodel,
              minimumprice: this.minimumprice,
              maximumprice: this.maximumprice
            })
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCities() {
      // Items have already been loaded
      if (this.cities.length > 0) return;

      // Items have already been requested
      if (this.searchLoading) return;
      this.searchLoading = true;

      // Lazily load input items
      axios
        .get(`/api/cities/property`, {
          params: {
            property: this.getCurrentPropType
          }
        })
        .then(res => {
          this.cities = [...res.data];
        })
        .catch(err => {
          console.log("something broke? " + err);
        })
        .finally(() => (this.searchLoading = false));
    },
    saveSearch() {
      this.cities = [];
      const savedsearch = localStorage.getItem(this.savedsearch);
      if (savedsearch) {
        const saved = JSON.parse(savedsearch);
        this.citymodel = saved.citymodel;
        this.minimumprice = saved.minimumprice;
        this.maximumprice = saved.maximumprice;
      } else {
        this.citymodel = null;
        this.minimumprice = null;
        this.maximumprice = null;
      }
    },
    viewSingle(id) {
      this.$router.push({
        name: "viewsingle",
        params: {
          propinfo: id
        }
      });
    }
  },
  computed: {
    ...mapGetters(["getCurrentPropType"]),
    savedsearch() {
      return `ssearch_${this.getCurrentPropType}`;
    }
  },
  watch: {
    citymodel: {
      handler: "getPropsByCity"
    },
    maximumprice: {
      handler: "getPropsByCity"
    },
    minimumprice: {
      handler: "getPropsByCity"
    },
    search: {
      handler: "getCities"
    },
    page: {
      handler: "getPropsByCity"
    },
    getCurrentPropType: {
      handler: "saveSearch"
    }
  },
  mounted() {
    this.saveSearch();
  }
};
</script>