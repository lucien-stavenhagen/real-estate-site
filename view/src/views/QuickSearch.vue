<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">Enter a city</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="cities"
          :loading="searchLoading"
          :search-input.sync="search"
          hide-no-data
          cache-items
          label="Start typing"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
    <v-card>
      <v-row dense :key="j" v-for="(plist, j) in properties">
        <v-col :key="i" v-for="(property, i) in plist" cols="12" sm="6">
          <v-card>
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

export default {
  data() {
    return {
      cities: [],
      properties: {},
      searchLoading: false,
      resultsLoading: false,
      model: null,
      search: null
    };
  },
  computed: {},

  watch: {
    model() {
      if (!this.model) {
        return;
      }
      const city = this.model.split(",")[0];
      const state = this.model.split(",")[1];
      this.resultsLoading = true;
      axios
        .get(`http://localhost:4001/api/all/city/${city}/state/${state}`)
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
        .get("http://localhost:4001/api/all/cities")
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