<template>
  <nav>
    <v-system-bar app>
      <span v-if="getPropType.commercial">Commercial</span>
      <span v-if="getPropType.residential">Residential</span>
      <span v-if="getPropType.rental">Rental</span>
      <span v-if="getPropType.land">Land</span>
    </v-system-bar>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn text exact to="/">
          <span class="mr-2">Home</span>
        </v-btn>
        <v-btn text to="/backend">
          <span class="mr-2">Backend</span>
        </v-btn>
        <v-btn text to="/changeme">
          <span class="mr-2">Mockup View</span>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{on}">
          <v-icon right v-on="on" @click="toggleTheme">mdi-light-switch</v-icon>
        </template>
        <span>Toggle Dark</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer
      app
      hide-overlay
      disable-resize-watcher
      disable-route-watcher
      v-model="drawer"
    >
      <v-list>
        <v-list-group no-action prepend-icon="mdi-star" value="true">
          <template v-slot:activator>
            <v-list-item-title>Property Type</v-list-item-title>
          </template>
          <v-list-item
            v-for="(item, i) in this.propMenuItems"
            :key="i"
            @click="dispatchPropType(item)"
          >
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">{{item}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="drawer=!drawer">Close Drawer</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainMenubar",
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["getPropType"]),
    propMenuItems() {
      const t = [];
      for (const p in this.getPropType) {
        t.push(p);
      }
      return t;
    }
  },
  methods: {
    ...mapActions(["dispatchPropType"]),
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>

<style>
</style>