<template>
  <v-container>
    <v-select clearable filled label="State" v-model="usState" :items="this.getUSStatesList"></v-select>
    <h1>{{this.usState}}</h1>
    <v-select clearable filled label="Rent basis" v-model="rentBasis" :items="this.getBasisList"></v-select>
    <h1>{{this.rentBasis}}</h1>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AddNewProperty",
  computed: {
    ...mapGetters(["getUSStatesList", "getBasisList"])
  },
  data() {
    return {
      usState: "",
      rentBasis: ""
    };
  }
};
</script>

<style>
</style>