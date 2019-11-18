<template>
  <section>
    <v-container>
      <v-row>
        <v-col :key="i" v-for="(property, i) in properties" cols="12" sm="4">
          <v-card>
            <v-img :key="i" v-for="(image,i) in property.images" :src="image.source"></v-img>
            <v-card-title>Commercial Property</v-card-title>
            <v-card-text>
              Location: {{ property.location.city }},{{
              property.location.state
              }}
            </v-card-text>
            <v-card-text>ft/sq: {{ property.squarefeet }}</v-card-text>
            <v-card-text>plumbing? {{ property.plumbing }}</v-card-text>
            <v-card-text>electricity? {{ property.electric }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Residential",
  computed: {
    ...mapGetters(["getCommercial"])
  },
  methods: {
    getAllCommercial() {
      axios
        .get(this.getCommercial)
        .then(doc => {
          this.properties = [...doc.data];
        })
        .catch();
    }
  },
  data() {
    return {
      properties: []
    };
  },
  created() {
    this.getAllCommercial();
  }
};
</script>

<style></style>
