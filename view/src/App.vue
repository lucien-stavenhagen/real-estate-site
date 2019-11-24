<template>
  <v-app>
    <v-app-bar app>
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
          <v-icon v-on="on" @click="toggleTheme">mdi-light-switch</v-icon>
        </template>
        <span>Toggle Dark</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  data: () => ({
    //
  })
};
</script>
