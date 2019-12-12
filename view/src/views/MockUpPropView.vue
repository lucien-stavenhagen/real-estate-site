<template>
  <section>
    <v-container>
      <v-card>
        <v-row dense :key="j" v-for="(plist, j) in properties">
          <v-col :key="i" v-for="(property, i) in plist" cols="12" sm="4">
            <v-card hover>
              <v-carousel hide-delimiters>
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
                <v-btn small outlined @click="viewSingle(property._id,j)">Details</v-btn>
              </v-card-actions>
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
    viewSingle(id, proptype) {
      this.$router.push({
        name: "viewsingle",
        params: {
          propinfo: encodeURIComponent(
            JSON.stringify({ type: proptype, id: id })
          )
        }
      });
    },

    getAllProps() {
      axios
        .get(this.getEndPoint("all"))
        .then(doc => {
          this.properties = { ...doc.data };
        })
        .catch(error => console.log(error));
    }
  },
  data() {
    return {
      properties: {}
    };
  },
  created() {
    this.getAllProps();
  }
};
</script>

<style></style>
