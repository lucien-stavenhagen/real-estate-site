<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>
        Search
        <span class="font-weight-light">({{this.getCurrentPropType}})</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card>
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
      </v-card-text>
    </v-card>
    <v-card v-if="this.bycityproperties" class="pa-2">
      <v-card-title
        v-if="this.citymodel"
        class="headline justify-center"
      >Properties in {{this.citymodel}}</v-card-title>
      <v-row dense>
        <v-col cols="12">
          <div
            class="d-flex flex-column text-uppercase text-center"
            v-if="bycityproperties.length > 0"
          >
            <v-divider></v-divider>
            <span class="pa-3">{{j}} ({{bycityproperties.length}})</span>
            <v-divider></v-divider>
          </div>
        </v-col>
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
    </v-card>
    <div v-if="pages && pages > 0" class="text-center">
      <v-pagination v-model="page" :length="pages"></v-pagination>
    </div>
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
      resultsLoading: false,
      citymodel: null,
      search: null
    };
  },
  methods: {
    getPropsByCity() {
      if (!this.citymodel) {
        this.bycityproperties = null;
        this.pages = null;
        localStorage.removeItem(this.savedsearch);
        return;
      }
      const city = this.citymodel.split(",")[0];
      const state = this.citymodel.split(",")[1];
      axios
        .get(`${this.getHost}/location/property`, {
          params: {
            city,
            state,
            page: this.page,
            pagesize: this.pagesize,
            property: this.getCurrentPropType
          }
        })
        .then(doc => {
          this.bycityproperties = { ...doc.data.docs };
          this.propcount = doc.data.count;
          this.pages = doc.data.pages;
          localStorage.setItem(
            this.savedsearch,
            JSON.stringify(this.citymodel)
          );
        })
        .catch(error => console.log(error));
    },
    getCities() {
      // Items have already been loaded
      if (this.cities.length > 0) return;

      // Items have already been requested
      if (this.searchLoading) return;
      this.searchLoading = true;

      // Lazily load input items
      axios
        .get(`${this.getHost}/cities/property`, {
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
      const savedsearch = localStorage.getItem(this.savedsearch);
      if (savedsearch) {
        this.citymodel = JSON.parse(savedsearch);
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
    ...mapGetters(["getHost", "getCurrentPropType"]),
    savedsearch() {
      return `ssearch_${this.getCurrentPropType}`;
    }
  },
  watch: {
    citymodel() {
      this.getPropsByCity();
    },
    search() {
      this.getCities();
    },
    page() {
      this.getPropsByCity();
    },
    getCurrentPropType() {
      this.cities = [];
      this.citymodel = null;
      this.pages = null;
      this.bycityproperties = null;
      this.search = null;
      this.saveSearch();
    }
  },
  mounted() {
    this.saveSearch();
  }
};
</script>