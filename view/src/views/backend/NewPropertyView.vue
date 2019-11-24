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
            v-for="(item, i) in this.propMenuItems"
            :key="i"
            @click="dispatchPropType(item)"
          >{{item}}</v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-card-title class="justify-center headline">
      <span v-if="getPropType.commercial">Commercial</span>
      <span v-if="getPropType.residential">Residential</span>
      <span v-if="getPropType.rental">Rental</span>
      <span v-if="getPropType.land">Land</span>
    </v-card-title>
    <AddNewProperty />
  </v-card>
</template>

<script>
import AddNewProperty from "../../components/backend/AddNewProperty";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewPropertyView",
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
  components: {
    AddNewProperty
  },
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    ...mapActions(["dispatchPropType"])
  },
  mounted() {
    this.dispatchPropType("residential");
  }
};
</script>

<style>
</style>