<template>
  <section>
    <v-toolbar>
      <v-toolbar-title>
        Property Edit Page
        <span class="font-weight-light">({{this.currentproptype}})</span>
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
            @click="setCurrentProptype(item)"
          >
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">{{item}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-row>
      <v-col cols="12">
        <AddNewProperty />
      </v-col>
      <v-col cols="12">
        <EditProperty />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import AddNewProperty from "../../components/backend/AddNewProperty";
import EditProperty from "../../components/backend/EditProperty";

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
    AddNewProperty,
    EditProperty
  },
  data() {
    return {
      drawer: false,
      currentproptype: null
    };
  },
  methods: {
    ...mapActions(["dispatchPropType"]),
    setCurrentProptype(item) {
      this.currentproptype = item;
      this.dispatchPropType(item);
    }
  },
  mounted() {
    this.setCurrentProptype(this.propMenuItems[0]);
  }
};
</script>

<style>
</style>