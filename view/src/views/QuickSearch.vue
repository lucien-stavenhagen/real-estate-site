<template>
  <v-container>
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
          cache-items
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
      <v-row dense :key="j" v-for="(plist, j) in bycityproperties">
        <v-col cols="12">
          <div class="d-flex flex-column text-uppercase text-center" v-if="plist.length > 0">
            <v-divider></v-divider>
            <span class="pa-3">{{j}} ({{plist.length}})</span>
            <v-divider></v-divider>
          </div>
        </v-col>
        <v-col :key="i" v-for="(property, i) in plist" cols="12" sm="4">
          <v-card hover>
            <v-carousel hide-delimiters>
              <v-carousel-item :key="i" v-for="(image, i) in property.images">
                <v-card height="100%">
                  <v-img class="align-end" height="100%" contain :src="image.source">
                    <v-card-title class="justify-center">
                      {{
                      image.caption
                      }}
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-carousel-item>
            </v-carousel>
            <v-card-title v-if="property.rent">${{property.rent}} / {{property.basis}}</v-card-title>
            <v-card-title v-else>${{property.price}}</v-card-title>
            <v-card-text>
              Location: {{ property.location.city }},{{
              property.location.state
              }}
            </v-card-text>
            <v-card-text>{{ property.description }}</v-card-text>
            <v-card-actions>
              <v-btn small outlined @click="viewSingle(property._id, j)">Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      savedsearch: "savedsearch",
      cities: [],
      bycityproperties: null,
      searchLoading: false,
      resultsLoading: false,
      citymodel: null,
      search: null
    };
  },
  methods: {
    viewSingle(id, proptype) {
      this.$router.push({
        name: "viewsingle",
        params: {
          propinfo: encodeURIComponent(
            JSON.stringify({ type: proptype, id: id })
          )
        }
      });
    }
  },
  computed: {
    ...mapGetters(["getEndPoint"])
  },
  watch: {
    citymodel() {
      if (!this.citymodel) {
        this.bycityproperties = null;
        localStorage.removeItem(this.savedsearch);
        return;
      }
      const city = this.citymodel.split(",")[0];
      const state = this.citymodel.split(",")[1];
      axios
        .get(`${this.getEndPoint("all")}/city/${city}/state/${state}`)
        .then(doc => {
          this.bycityproperties = { ...doc.data };
          localStorage.setItem(
            this.savedsearch,
            JSON.stringify(this.citymodel)
          );
        })
        .catch(error => console.log(error));
    },

    search() {
      // Items have already been loaded
      if (this.cities.length > 0) return;

      // Items have already been requested
      if (this.searchLoading) return;
      this.searchLoading = true;

      // Lazily load input items
      axios
        .get(`${this.getEndPoint("all")}/cities`)
        .then(res => {
          this.cities = [...res.data.cities];
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.searchLoading = false));
    }
  },
  created() {
    const savedsearch = localStorage.getItem(this.savedsearch);
    if (savedsearch) {
      this.citymodel = JSON.parse(savedsearch);
    }
  }
};
</script>