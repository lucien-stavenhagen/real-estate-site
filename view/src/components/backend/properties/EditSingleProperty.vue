<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title class="text-uppercase">Edit {{this.getCurrentPropType}} Property</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/backend" text>Dashboard</v-btn>
    </v-toolbar>
    <EditSingleImages :id="id" />
    <EditSingleInfo :id="id" />
  </v-container>
</template>
<script>
import EditSingleImages from "./EditSingleImages";
import EditSingleInfo from "./EditSingleInfo";

import { mapGetters } from "vuex";

export default {
  name: "EditSingleProperty",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.getUser) {
        next("/login");
      } else {
        next();
      }
    });
  },

  props: {
    id: {
      type: String,
      required: false
    }
  },
  components: {
    EditSingleImages,
    EditSingleInfo
  },
  computed: {
    ...mapGetters(["getPropType", "getCurrentPropType"])
  },
  watch: {
    getCurrentPropType() {
      this.$router.push("/backend");
    }
  }
};
</script>

<style></style>
