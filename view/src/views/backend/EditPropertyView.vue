<template>
  <div>
    <section v-if="this.properties.length > 0">
      <v-card>
        <v-card-title
          class="font-weight-light justify-center text-capitalize"
        >Edit {{this.getCurrentPropType}} Properties ({{propcount}})</v-card-title>
        <v-container>
          <v-row dense>
            <v-col :key="i" v-for="(property, i) in properties" cols="12" sm="4">
              <v-card>
                <v-img
                  v-if="property.images && property.images.length > 0"
                  class="mx-auto"
                  height="200"
                  contain
                  :src="property.images[0].source"
                ></v-img>
                <v-img v-else class="mx-auto" height="200" :src="require('../../assets/logo.png')"></v-img>
                <v-card-title v-if="property.rent">${{property.rent}} / {{property.basis}}</v-card-title>
                <v-card-title v-else>${{property.price}}</v-card-title>
                <v-card-text>ID: {{property._id}}</v-card-text>
                <v-card-text>
                  {{property.location.address}}
                  <br />
                  {{ property.location.city }},{{
                  property.location.state
                  }}
                </v-card-text>
                <v-card-text class="text-truncate">{{ property.description }}</v-card-text>
                <v-card-actions>
                  <v-btn :to="`/editprop/${property._id}`" small outlined>Edit</v-btn>
                  <v-btn :to="`/deleteprop/${property._id}`" small outlined>Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <div v-if="showpagination" class="text-center">
            <v-pagination v-model="page" :length="pages"></v-pagination>
          </div>
        </v-container>
      </v-card>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "EditPropertyView",
  data() {
    return {
      showpagination: false,
      page: 1,
      pages: null,
      propcount: null,
      properties: []
    };
  },
  computed: {
    ...mapGetters([
      "getHost",
      "getCurrentPropType",
      "getPropType",
      "getDBUpdated"
    ])
  },
  watch: {
    page() {
      this.getAllProperties();
    },
    getCurrentPropType() {
      this.getAllProperties();
    },
    getDBUpdated() {
      this.getAllProperties();
    }
  },
  methods: {
    getAllProperties() {
      axios
        .get(`${this.getHost}/property`, {
          params: {
            page: this.page,
            property: this.getCurrentPropType
          }
        })
        .then(doc => {
          this.showpagination = true;
          this.properties = [...doc.data.docs];
          this.propcount = doc.data.count;
          this.pages = doc.data.pages;
        })
        .catch(error => console.log("what broke? " + error));
    }
  },
  created() {
    this.getAllProperties();
  }
};
</script>