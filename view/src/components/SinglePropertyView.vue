<template>
  <v-container>
    <v-card v-if="this.property" outlined :loading="this.propLoading">
      <v-toolbar dense>
        <v-btn v-if="!toggleview" small outlined @click="toggleView()">Grid</v-btn>
        <v-btn v-else small outlined @click="toggleView()">Carousel</v-btn>
      </v-toolbar>
      <div v-if="!property.images || property.images.length === 0">
        <v-row>
          <v-col cols="12">
            <v-img height="300" contain :src="require('../assets/logo.png')"></v-img>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row no-gutters v-if="this.toggleview">
          <v-col cols="12" sm="4" :key="i" v-for="(image, i) in property.images">
            <v-card :href="image.source" target="_blank">
              <v-img height="100%" contain :src="image.source"></v-img>
            </v-card>
          </v-col>
        </v-row>
        <v-carousel hide-delimiters v-else>
          <v-carousel-item :key="i" v-for="(image, i) in property.images">
            <v-card height="100%" :href="image.source" target="_blank">
              <v-img height="100%" contain :src="image.source"></v-img>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </div>
      <v-card-title v-if="property.rent">${{property.rent}} / {{property.basis}}</v-card-title>
      <v-card-title v-else>${{property.price}}</v-card-title>
      <v-card-text>
        {{property.location.address}}
        <br />
        {{ property.location.city }},{{property.location.state}}
      </v-card-text>

      <v-card-text v-if="property.acreage">Acreage: {{property.acreage}}</v-card-text>
      <v-card-text v-if="property.squarefeet">Ft/sq: {{property.squarefeet}}</v-card-text>
      <v-card-text v-if="property.electric === true">Electricity available? Yes</v-card-text>
      <v-card-text v-if="property.electric === false">Electricity available? No</v-card-text>
      <v-card-text v-if="property.plumbing === true">Plumbing available? Yes</v-card-text>
      <v-card-text v-if="property.plumbing === false">Plumbing available? No</v-card-text>
      <v-card-text v-if="property.beds">Beds: {{property.beds}}</v-card-text>
      <v-card-text v-if="property.baths">Baths: {{property.baths}}</v-card-text>
      <v-card-text v-if="property.allbillspaid === true">All bills paid? Yes</v-card-text>
      <v-card-text v-if="property.allbillspaid === false">All bills paid? No</v-card-text>
      <v-card-text>{{ property.description }}</v-card-text>
      <v-card-actions>
        <v-btn outlined to="/quicksearch">Search</v-btn>
        <v-btn outlined to="/allpropsview">Main View</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "SinglePropertyView",
  props: {
    propinfo: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters(["getHost", "getCurrentPropType"])
  },
  methods: {
    toggleView() {
      this.toggleview = !this.toggleview;
    },
    getPropertyById() {
      if (this.propLoading) {
        return;
      }
      this.propLoading = true;
      axios
        .get(`${this.getHost}/propertybyid`, {
          params: {
            id: this.propinfo,
            property: this.getCurrentPropType
          }
        })
        .then(doc => {
          this.property = { ...doc.data };
        })
        .catch()
        .finally(() => {
          this.propLoading = false;
        });
    }
  },
  data() {
    return {
      propLoading: false,
      property: null,
      toggleview: false
    };
  },
  created() {
    this.getPropertyById();
  }
};
</script>

<style></style>
