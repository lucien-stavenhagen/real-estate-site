<template>
  <v-container>
    <v-card max-width="70%" class="mx-auto">
      <v-card-title class="headline text-capitalize">Error {{msg.status}}: {{msg.message}}</v-card-title>
      <v-card-text>Perhaps your login has expired? Please logout and login again.</v-card-text>
      <v-card-actions>
        <v-btn @click="goBack">Back</v-btn>
        <v-btn @click="logOut">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ResponseError",
  props: {
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    msg() {
      return JSON.parse(decodeURIComponent(this.message));
    }
  },
  methods: {
    ...mapActions(["dispatchLogout"]),
    goBack() {
      this.$router.back();
    },
    logOut() {
      this.dispatchLogout();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>