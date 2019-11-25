<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>
        Add New
        <span v-if="getPropType.commercial">Commercial</span>
        <span v-if="getPropType.residential">Residential</span>
        <span v-if="getPropType.rental">Rental</span>
        <span v-if="getPropType.land">Land</span> Property
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <AddNewProperty />
  </v-card>
</template>

<script>
import AddNewProperty from "../../components/backend/AddNewProperty";
import { mapGetters } from "vuex";

export default {
  name: "NewPropertyView",
  computed: {
    ...mapGetters(["getPropType"])
  },
  components: {
    AddNewProperty
  },
  data() {
    return {
      drawer: false
    };
  },
  methods: {}
};
</script>

<style>
</style>