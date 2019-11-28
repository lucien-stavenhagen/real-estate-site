<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-autocomplete
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
        ></v-autocomplete>
      </v-card-text>
    </v-card>
    <v-card :loading="resultsLoading" v-if="this.citymodel" class="pa-2">
      <v-card-title class="headline justify-center">Properties in {{this.citymodel}}</v-card-title>
      <v-row dense :key="j" v-for="(plist, j) in properties">
        <v-card-text
          v-if="plist.length > 0"
          class="text-uppercase text-center"
        >{{j}} ({{plist.length}})</v-card-text>
        <v-col :key="i" v-for="(property, i) in plist" cols="12" sm="6">
          <v-card outlined hover>
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
      cities: [],
      properties: {},
      searchLoading: false,
      resultsLoading: false,
      citymodel: null,
      search: null
    };
  },
  computed: {
    ...mapGetters(["getEndPoint"])
  },

  watch: {
    citymodel() {
      if (!this.citymodel) {
        this.properties = {};
        return;
      }
      const city = this.citymodel.split(",")[0];
      const state = this.citymodel.split(",")[1];
      this.resultsLoading = true;
      axios
        .get(`${this.getEndPoint("all")}/city/${city}/state/${state}`)
        .then(doc => {
          console.log(doc.data);
          this.properties = { ...doc.data };
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.resultsLoading = false;
        });
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
  }
};
</script>