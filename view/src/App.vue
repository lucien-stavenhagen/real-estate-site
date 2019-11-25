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
    ...mapGetters(["getPropType"])
  },
  components: {
    MainMenubar
  },
  methods: {
    ...mapActions(["dispatchPropType"])
  },
  //
  // set property type to first
  // attribute in the global prop type
  // object.
  //
  created() {
    this.dispatchPropType(Object.keys(this.getPropType)[0]);
  }
};
</script>
