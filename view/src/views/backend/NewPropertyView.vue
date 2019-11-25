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
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn text v-on="on">Property Type</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in this.propMenuItems"
            :key="i"
            @click="dispatchPropType(item)"
          >
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">{{item}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <AddNewProperty />
  </v-card>
</template>

<script>
import AddNewProperty from "../../components/backend/AddNewProperty";
import { mapGetters, mapActions } from "vuex";

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
  }
};
</script>

<style>
</style>