<template>
  <v-container>
    <v-form v-model="valid" ref="mysubmit">
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-file-input
            v-model="propertyinfo.source"
            filled
            :rules="this.filerules"
            accept="image/jpeg, image/jpg, image/png"
            label="Upload image"
          ></v-file-input>
          <v-text-field
            filled
            :rules="this.formrules"
            v-model="propertyinfo.caption"
            label="Image Caption"
          >
            <v-icon slot="prepend">mdi-label-outline</v-icon>
          </v-text-field>
          <v-text-field
            v-if="proptype.land"
            filled
            :rules="this.formrules"
            label="Acreage"
            v-model="propertyinfo.acreage"
          >
            <v-icon slot="prepend">mdi-lightbulb-on-outline</v-icon>
          </v-text-field>

          <!-- Beds and baths -->

          <v-text-field
            v-if="proptype.residential || proptype.rental"
            filled
            :rules="this.formrules"
            label="Beds"
            v-model="propertyinfo.beds"
          >
            <v-icon slot="prepend">mdi-lightbulb-on-outline</v-icon>
          </v-text-field>
          <v-text-field
            v-if="proptype.residential || proptype.rental"
            filled
            :rules="this.formrules"
            label="Baths"
            v-model="propertyinfo.baths"
          >
            <v-icon slot="prepend">mdi-water-pump</v-icon>
          </v-text-field>

          <!--Electic and plumbing-->

          <v-select
            v-if="proptype.commercial"
            filled
            :rules="this.selectrules"
            label="Electricity?"
            v-model="propertyinfo.electric"
            :items="this.getYesNoList"
          >
            <v-icon slot="prepend">mdi-lightbulb-on-outline</v-icon>
          </v-select>
          <v-select
            v-if="proptype.commercial"
            filled
            :rules="this.selectrules"
            label="Plumbing?"
            v-model="propertyinfo.plumbing"
            :items="this.getYesNoList"
          >
            <v-icon slot="prepend">mdi-water-pump</v-icon>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-if="proptype.commercial"
            filled
            :rules="this.formrules"
            v-model="propertyinfo.squarefeet"
            label="Square feet"
          >
            <v-icon slot="prepend">mdi-sigma</v-icon>
          </v-text-field>
          <v-text-field filled :rules="this.formrules" v-model="propertyinfo.city" label="City">
            <v-icon slot="prepend">mdi-city</v-icon>
          </v-text-field>
          <v-select
            filled
            label="State"
            :rules="this.formrules"
            v-model="propertyinfo.state"
            :items="this.getUSStatesList"
          >
            <v-icon slot="prepend">mdi-map</v-icon>
          </v-select>
          <v-text-field
            v-if="!proptype.rental"
            filled
            label="Price USD"
            :rules="this.formrules"
            v-model="propertyinfo.price"
          >
            <v-icon slot="prepend">mdi-currency-usd</v-icon>
          </v-text-field>
          <v-text-field
            v-if="proptype.rental"
            filled
            label="Rent USD"
            :rules="this.formrules"
            v-model="propertyinfo.price"
          >
            <v-icon slot="prepend">mdi-currency-usd</v-icon>
          </v-text-field>
          <v-select
            v-if="proptype.rental"
            filled
            label="Rental basis"
            :rules="this.formrules"
            v-model="propertyinfo.usState"
            :items="this.getBasisList"
          >
            <v-icon slot="prepend">mdi-map</v-icon>
          </v-select>
          <v-select
            v-if="proptype.rental"
            filled
            label="All bills paid?"
            :rules="this.selectrules"
            v-model="propertyinfo.allbillspaid"
            :items="this.getYesNoList"
          >
            <v-icon slot="prepend">mdi-cash</v-icon>
          </v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea
            auto-grow
            filled
            :rules="this.formrules"
            v-model="propertyinfo.description"
            label="Property description"
          >
            <v-icon slot="prepend">mdi-comment</v-icon>
          </v-textarea>
        </v-col>
      </v-row>
      <v-btn outlined class="mr-1" @click="mySubmit">submit</v-btn>
      <v-btn outlined class="mr-1" @click="myResetValidation">clear errors</v-btn>
      <v-btn outlined class="mr-1" color="red" @click="myResetForm">reset form</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
//import axios from "axios";

export default {
  name: "AddNewCommercial",
  props: {
    proptype: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getUSStatesList", "getBasisList", "getYesNoList"])
  },
  data() {
    return {
      valid: true,
      filerules: [value => !!value || "image is required"],
      formrules: [
        value => (!!value && value.length > 0) || "field can't be empty"
      ],
      selectrules: [
        value => value === true || value === false || "must make a selection"
      ],
      propertyinfo: {
        city: null,
        state: null,
        source: null,
        caption: null,
        acreage: null,
        squarefeet: null,
        electric: null,
        plumbing: null,
        beds: null,
        baths: null,
        price: null,
        rent: null,
        allbillspaid: null,
        description: null
      }
    };
  },
  methods: {
    mySubmit() {
      if (this.$refs.mysubmit.validate()) {
        console.log(JSON.stringify(this.propertyinfo));
      }
    },
    myResetForm() {
      this.$refs.mysubmit.reset();
    },
    myResetValidation() {
      this.$refs.mysubmit.resetValidation();
    }
  }
};
</script>

<style></style>
