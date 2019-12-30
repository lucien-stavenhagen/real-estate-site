<template>
  <section>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>
          Property Edit Page
          <span
            class="font-weight-light text-capitalize"
          >({{this.getCurrentPropType}})</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-row>
        <v-col cols="12">
          <AddNewPropertyView />
        </v-col>
        <v-col cols="12">
          <EditPropertyView />
        </v-col>
        <v-col cols="12">
          <UserManager />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import AddNewPropertyView from "./AddNewPropertyView";
import EditPropertyView from "./EditPropertyView";
import UserManager from "./UserManager";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewPropertyView",
  computed: {
    ...mapGetters(["getPropType", "getCurrentPropType"])
  },
  components: {
    AddNewPropertyView,
    EditPropertyView,
    UserManager
  },
  data() {
    return {
      drawer: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.getUser) {
        next("/login");
      } else {
        next();
      }
    });
  },
  methods: {
    ...mapActions(["dispatchPropType"])
  }
};
</script>

<style>
</style>