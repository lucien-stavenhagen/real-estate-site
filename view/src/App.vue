<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn text exact to="/">
          <span class="mr-2">Home</span>
        </v-btn>

        <v-btn text to="/commercial">
          <span class="mr-2">Commercial</span>
        </v-btn>
      </div>
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

  data: () => ({
    //
  })
};
</script>
