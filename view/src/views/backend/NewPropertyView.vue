<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Add New Property</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn outlined v-on="on">type</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in this.propmenuitems"
            :key="i"
            @click="setPropType(item)"
          >{{item}}</v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-card-title class="justify-center headline">
      <span v-if="this.proptype.commercial">Commercial</span>
      <span v-if="this.proptype.residential">Residential</span>
      <span v-if="this.proptype.rental">Rental</span>
      <span v-if="this.proptype.land">Land</span>
    </v-card-title>
    <AddNewProperty :proptype="this.proptype" />
  </v-card>
</template>

<script>
import AddNewProperty from "../../components/backend/AddNewProperty";

export default {
  name: "NewPropertyView",
  computed: {},
  components: {
    AddNewProperty
  },
  data() {
    return {
      propmenuitems: ["commercial", "residential", "rental", "land"],
      proptype: {
        commercial: false,
        residential: false,
        rental: false,
        land: false
      },
      drawer: false
    };
  },
  methods: {
    setPropType(item) {
      for (const p in this.proptype) {
        this.proptype[p] = false;
      }
      this.proptype[item] = true;
    }
  },
  mounted() {
    this.setPropType("residential");
  }
};
</script>

<style>
</style>