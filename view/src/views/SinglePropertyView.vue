<template>
  <v-card v-if="this.property" outlined hover :loading="this.propLoading">
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
  </v-card>
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
    ...mapGetters(["getEndPoint"]),
    propInfo() {
      return JSON.parse(this.propinfo);
    }
  },
  methods: {
    getPropertyById() {
      this.propLoading = true;
      console.log(
        `${this.getEndPoint(this.propInfo.type)}/${this.propInfo.id}`
      );
      axios
        .get(`${this.getEndPoint(this.propInfo.type)}/${this.propInfo.id}`)
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
      property: null
    };
  },
  created() {
    this.getPropertyById();
  }
};
</script>

<style></style>
