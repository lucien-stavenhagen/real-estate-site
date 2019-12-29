<template>
  <v-app>
    <MainMenubar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MainMenubar from "./components/MainMenubar";
export default {
  name: "App",
  computed: {
    ...mapGetters(["getPropType", "getCurrentPropType"])
  },
  components: {
    MainMenubar
  },
  methods: {
    ...mapActions(["dispatchPropType", "dispatchCheckLogin"])
  },
  //
  // set property type to first
  // attribute in the global prop type
  // object.
  //
  created() {
    if (!this.getCurrentPropType) {
      this.dispatchPropType(Object.keys(this.getPropType)[0]);
    }
    this.dispatchCheckLogin();
  }
};
</script>
