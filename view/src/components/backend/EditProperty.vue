<template>
  <div>
    <section v-if="this.properties.length > 0">
      <v-card>
        <v-card-title
          class="font-weight-light justify-center text-uppercase"
        >Edit {{this.currentPropType}} Properties</v-card-title>
        <v-container>
          <v-row>
            <v-col :key="i" v-for="(property, i) in properties" cols="12" sm="4">
              <v-card hover>
                <v-img
                  v-if="property.images && property.images.length > 0"
                  class="mx-auto"
                  height="200"
                  contain
                  :src="property.images[0].source"
                ></v-img>
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
                <v-card-text>{{ property.description }}</v-card-text>
                <v-card-actions>
                  <v-btn small outlined>Edit</v-btn>
                  <v-btn small outlined>Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "EditProperty",
  data() {
    return {
      properties: []
    };
  },
  computed: {
    ...mapGetters(["getEndPoint", "getPropType", "getDBUpdated"]),
    currentPropType() {
      for (let p in this.getPropType) {
        if (this.getPropType[p]) {
          return p;
        }
      }
      return null;
    }
  },
  watch: {
    currentPropType() {
      this.getAllProperties();
    },
    getDBUpdated() {
      this.getAllProperties();
    }
  },
  methods: {
    getAllProperties() {
      axios
        .get(this.getEndPoint(this.currentPropType))
        .then(doc => {
          this.properties = [...doc.data];
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.getAllProperties();
  }
};
</script>