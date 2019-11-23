<template>
  <section>
    <v-container>
      <v-row dense>
        <v-col :key="i" v-for="(property, i) in properties" cols="12" sm="6">
          <v-card>
            <v-carousel hide-delimiters>
              <v-carousel-item :key="i" v-for="(image, i) in property.images">
                <v-card height="100%">
                  <v-img
                    class="align-end"
                    height="100%"
                    contain
                    :src="image.source"
                  >
                    <v-card-title class="justify-center">{{
                      image.caption
                    }}</v-card-title>
                  </v-img>
                </v-card>
              </v-carousel-item>
            </v-carousel>
            <v-card-title>Commercial Property</v-card-title>
            <v-card-text>
              Location: {{ property.location.city }},{{
                property.location.state
              }}
            </v-card-text>
            <v-card-text>ft/sq: {{ property.squarefeet }}</v-card-text>
            <v-card-text>plumbing? {{ property.plumbing }}</v-card-text>
            <v-card-text>electricity? {{ property.electric }}</v-card-text>
            <v-card-text>{{ property.description }}</v-card-text>
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
