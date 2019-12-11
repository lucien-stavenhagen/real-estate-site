<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title class="text-uppercase">Edit {{this.currentPropType}} Property</v-toolbar-title>
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
    ...mapGetters(["getPropType"]),
    currentPropType() {
      for (let p in this.getPropType) {
        if (this.getPropType[p]) {
          return p;
        }
      }
      return null;
    }
  }
};
</script>

<style></style>
