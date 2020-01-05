<template>
  <div>
    <v-container>
      <v-toolbar class="mb-2">
        <v-toolbar-title>Search</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card class="mb-2">
        <v-card-text>
          <v-combobox
            v-model="citystate"
            :items="cities.all"
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
    </v-container>
    <SearchView :propinfo="this.compileParms('commercial')" />
    <SearchView :propinfo="this.compileParms('residential')" />
    <SearchView :propinfo="this.compileParms('rental')" />
    <SearchView :propinfo="this.compileParms('land')" />
  </div>
</template>
<script>
import axios from "axios";
import SearchView from "./SearchView";

export default {
  components: {
    SearchView
  },
  data() {
    return {
      cities: {
        all: [],
        commercial: [],
        residential: [],
        rental: [],
        land: []
      },
      searchLoading: false,
      citystate: null,
      minimumprice: null,
      maximumprice: null,
      search: null,
      numrules: [
        value => !value || value === "0" || !!+value || "field must be a number"
      ]
    };
  },
  methods: {
    async getCities() {
      // Items have already been loaded
      if (this.cities.length > 0) return;

      // Items have already been requested
      if (this.searchLoading) return;
      this.searchLoading = true;

      // Lazily load input items
      try {
        const [commercial, residential, rental, land] = await axios.all([
          axios.get(`/api/cities/property`, {
            params: {
              property: "commercial"
            }
          }),
          axios.get(`/api/cities/property`, {
            params: {
              property: "residential"
            }
          }),
          axios.get(`/api/cities/property`, {
            params: {
              property: "rental"
            }
          }),
          axios.get(`/api/cities/property`, {
            params: {
              property: "land"
            }
          })
        ]);
        // this.cities.commercial = [...commercial.data];
        // this.cities.residential = [...residential.data];
        // this.cities.rental = [...rental.data];
        // this.cities.land = [...land.data];
        this.cities.all = Array.from(
          new Set([
            ...commercial.data,
            ...residential.data,
            ...rental.data,
            ...land.data
          ])
        );
      } catch (error) {
        console.log("something broke? " + error);
      } finally {
        this.searchLoading = false;
      }
    },
    compileParms(pt) {
      return encodeURIComponent(
        JSON.stringify({
          proptype: pt,
          citystate: this.citystate,
          minimumprice: this.minimumprice,
          maximumprice: this.maximumprice
        })
      );
    }
  },
  watch: {
    search: {
      handler: "getCities"
    }
  }
};
</script>