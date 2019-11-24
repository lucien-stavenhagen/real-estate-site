<template>
  <v-container>
    <v-card>
      <v-card-title>Error type: {{error}}</v-card-title>
      <v-btn to="/">Home</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ResponseError",
  props: {
    error: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>