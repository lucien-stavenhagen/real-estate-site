<template>
  <v-card :loading="loading" outlined v-if="pages && pages > 0" class="pa-2">
    <v-card-title class="headline">
      <span
        class="text-capitalize"
        v-if="propInfo.citystate"
      >{{propInfo.proptype}} Properties in {{propInfo.citystate}}</span>
      <span class="text-capitalize" v-else>{{propInfo.proptype}} Properties (all locations)</span>
    </v-card-title>
    <div class="d-flex flex-column">
      <v-card-text
        class="text-capitalize my-0 py-0"
        v-if="propInfo.minimumprice"
      >low: ${{propInfo.minimumprice}}</v-card-text>
      <v-card-text
        class="text-capitalize my-0 py-0"
        v-if="propInfo.maximumprice"
      >high: ${{propInfo.maximumprice}}</v-card-text>
    </div>
    <v-card-subtitle class="text-capitalize">{{propcount}} results found</v-card-subtitle>

    <v-row dense>
      <v-col
        :key="i"
        v-for="(property, i) in bycityproperties"
        cols="12"
        :sm="propcount === 1 ? '12' : '6'"
      >
        <v-card>
          <v-carousel v-if="!property.images || property.images.length === 0" hide-delimiters>
            <v-carousel-item>
              <v-img height="100%" contain :src="require('../../assets/logo.png')"></v-img>
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
</template>
<script>
import axios from "axios";
import _ from "lodash";

export default {
  name: "SearchView",
  props: {
    propinfo: { type: String, required: true }
  },
  //
  // proptype
  // citystate,
  // minimumprice
  // maximumprice
  //
  computed: {
    propInfo() {
      return JSON.parse(decodeURIComponent(this.propinfo));
    },
    getPropsDebounced() {
      return _.debounce(this.getPropsByCity, 250);
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      pages: null,
      pagesize: 2,
      propcount: null,
      bycityproperties: null
    };
  },
  methods: {
    async getPropsByCity() {
      try {
        if (this.loading) {
          return;
        }
        if (
          !this.propInfo.citystate &&
          !this.propInfo.minimumprice &&
          !this.propInfo.maximumprice
        ) {
          this.bycityproperties = null;
          this.pages = null;
          return;
        }
        this.loading = true;
        let parms = {
          page: this.page,
          pagesize: this.pagesize,
          property: this.propInfo.proptype
        };
        if (this.propInfo.citystate) {
          parms = {
            ...parms,
            city: this.propInfo.citystate.split(",")[0],
            state: this.propInfo.citystate.split(",")[1]
          };
        }
        if (this.propInfo.maximumprice) {
          parms = {
            ...parms,
            max: this.propInfo.maximumprice
          };
        }
        if (this.propInfo.minimumprice) {
          parms = {
            ...parms,
            min: this.propInfo.minimumprice
          };
        }
        const docs = await axios.get(`/api/location/property`, {
          params: parms
        });
        this.bycityproperties = { ...docs.data.docs };
        this.propcount = docs.data.count;
        this.pages = docs.data.pages;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    viewSingle(id) {
      this.$router.push({
        name: "viewsingle",
        params: {
          propinfo: encodeURIComponent(
            JSON.stringify({
              id,
              proptype: this.propInfo.proptype
            })
          )
        }
      });
    }
  },
  watch: {
    propInfo: {
      handler: "getPropsDebounced"
    },
    page: {
      handler: "getPropsDebounced"
    }
  }
};
</script>