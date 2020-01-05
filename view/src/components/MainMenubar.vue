<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase headline font-weight-thin">Real Estate App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="getUser" offset-y>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" text>Welcome {{getUser.username}}</v-btn>
        </template>
        <v-list>
          <v-list-item @click="logOut">Logout</v-list-item>
        </v-list>
      </v-menu>
      <v-btn text v-else to="/login">Login</v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{on}">
          <v-icon right v-on="on" @click="toggleTheme">mdi-light-switch</v-icon>
        </template>

        <span>Toggle Dark</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer app disable-resize-watcher disable-route-watcher v-model="drawer">
      <v-list>
        <v-list-group no-action prepend-icon="mdi-silverware-variant" value="true">
          <template v-slot:activator>
            <v-list-item-title>Main Menu</v-list-item-title>
          </template>
          <v-list-item @click="pushRoute('/')">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="pushRoute(mitem.route)" v-for="(mitem,i) in navList" :key="i">
            <v-list-item-title>{{mitem.name}}</v-list-item-title>
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
      drawer: false,
      navlist: [
        {
          name: "Search",
          route: "/quicksearch"
        },
        {
          name: "Dashboard",
          route: "/backend"
        },
        {
          name: "Property View",
          route: "/allpropsview"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getPropType", "getUser"]),
    navList() {
      return this.navlist.filter(i => {
        return !this.getUser ? i.name !== "Dashboard" : true;
      });
    }
  },
  methods: {
    ...mapActions(["dispatchPropType", "dispatchLogout"]),
    logOut() {
      this.dispatchLogout();
      this.drawer = false;
      this.$router.push("/");
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    pushRoute(route) {
      this.$router.push(route);
      this.drawer = false;
    }
  }
};
</script>

<style>
</style>