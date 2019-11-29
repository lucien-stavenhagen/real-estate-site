<template>
  <section>
    <v-container>
      <v-card>
        <v-row dense :key="j" v-for="(plist, j) in properties">
          <v-col :key="i" v-for="(property, i) in plist" cols="12" sm="4">
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
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Residential",
  computed: {
    ...mapGetters(["getEndPoint"])
  },
  methods: {
    getAllCommercial() {
      axios
        .get(this.getEndPoint("all"))
        .then(doc => {
          this.properties = { ...doc.data };
        })
        .catch();
    }
  },
  data() {
    return {
      properties: {}
    };
  },
  created() {
    this.getAllCommercial();
  }
};
</script>

<style></style>
