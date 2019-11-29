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
    ...mapGetters(["getPropType"]),
    isPropType() {
      for (const p in this.getPropType) {
        if (this.getPropType[p]) {
          return true;
        }
      }
      return false;
    }
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
    console.log(this.isPropType);

    if (!this.isPropType) {
      this.dispatchPropType(Object.keys(this.getPropType)[0]);
    }
  }
};
</script>
