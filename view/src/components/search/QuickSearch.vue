<template>
  <div>
    <v-container>
      <v-card outlined>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon left>mdi-magnify</v-icon>Search
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>
      <v-card outlined>
        <v-card-text>
          <v-combobox
            v-model="citystate"
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
      <SearchView :propinfo="this.compileParms('commercial')" />
      <SearchView :propinfo="this.compileParms('residential')" />
      <SearchView :propinfo="this.compileParms('rental')" />
      <SearchView :propinfo="this.compileParms('land')" />
    </v-container>
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
      cities: [],
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
    getPropsForType(type) {
      return axios.get(`/api/cities/property`, {
        params: {
          property: type
        }
      });
    },
    async getCities() {
      // Items have already been loaded
      if (this.cities.length > 0) return;

      // Items have already been requested
      if (this.searchLoading) return;
      this.searchLoading = true;

      // Lazily load input items
      try {
        const [commercial, residential, rental, land] = await axios.all([
          this.getPropsForType("commercial"),
          this.getPropsForType("residential"),
          this.getPropsForType("rental"),
          this.getPropsForType("land")
        ]);
        this.cities = Array.from(
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