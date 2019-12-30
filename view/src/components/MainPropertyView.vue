<template>
  <v-container>
    <v-toolbar class="mb-2">
      <v-toolbar-title class="text-capitalize">{{getCurrentPropType}} : {{totaldocs}} found</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Page Size</v-btn>
        </template>
        <v-list>
          <v-list-item @click="setPageSize(item)" v-for="(item, index) in pagesizes" :key="index">
            <v-list-item-title>{{item}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-row dense>
      <v-col
        :key="i"
        v-for="(property, i) in properties"
        cols="12"
        :sm="properties.length === 1 ? '12' : '6'"
      >
        <v-card>
          <v-carousel
            :key="forceme"
            v-if="!property.images || property.images.length === 0"
            hide-delimiters
          >
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
            {{property.location.address}}
            <br />
            {{ property.location.city }},{{property.location.state}}
          </v-card-text>
          <v-card-text class="text-truncate">{{ property.description }}</v-card-text>
          <v-card-actions>
            <v-btn small outlined @click="viewSingle(property._id)">Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="pages && pages > 0" class="text-center">
      <v-pagination v-model="page" :length="pages"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "MainPropertyView",
  computed: {
    ...mapGetters(["getCurrentPropType"])
  },
  methods: {
    setPageSize(s) {
      const newtotal = Math.ceil(this.totaldocs / s);
      if (this.pagesize !== s) {
        this.pagesize = s;
        if (newtotal < this.page) {
          this.page = newtotal;
        }
      }
    },
    viewSingle(id) {
      this.$router.push({
        name: "viewsingle",
        params: {
          propinfo: id
        }
      });
    },
    getAllProps() {
      axios
        .get(`/api/property`, {
          params: {
            page: this.page,
            pagesize: this.pagesize,
            property: this.getCurrentPropType
          }
        })
        .then(doc => {
          this.properties = [...doc.data.docs];
          this.pages = doc.data.pages;
          this.totaldocs = doc.data.count;
        })
        .catch(error => console.log(error));
    }
  },
  watch: {
    page() {
      this.getAllProps();
      this.forceme = !this.forceme;
    },
    pagesize() {
      this.getAllProps();
      this.forceme = !this.forceme;
    },
    getCurrentPropType() {
      this.getAllProps();
      this.forceme = !this.forceme;
    }
  },
  data() {
    return {
      forceme: true,
      totaldocs: null,
      pagesizes: [1, 2, 4],
      page: 1,
      pagesize: 2,
      pages: null,
      properties: []
    };
  },
  created() {
    this.getAllProps();
  }
};
</script>

<style></style>
