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
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn text v-on="on">Property Type</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in this.propMenuItems"
              :key="i"
              @click="dispatchPropType(item)"
            >
              <v-list-item-content>
                <v-list-item-title class="text-capitalize">{{item}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
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
import AddNewPropertyView from "./properties/AddNewPropertyView";
import EditPropertyView from "./properties/EditPropertyView";
import UserManager from "./users/UserManager";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewPropertyView",
  computed: {
    ...mapGetters(["getPropType", "getCurrentPropType"]),
    propMenuItems() {
      const t = [];
      for (const p in this.getPropType) {
        t.push(p);
      }
      return t;
    }
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