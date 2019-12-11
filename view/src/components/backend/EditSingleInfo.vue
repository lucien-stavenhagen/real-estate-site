<template>
  <v-card :loading="this.propLoading" v-if="this.propertyinfo">
    <v-container>
      <v-card-title class="font-weight-light justify-center">Edit Info for {{id}}</v-card-title>
      <v-form v-model="valid" ref="updateInfo">
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              v-if="getPropType.land"
              filled
              :rules="this.numrules"
              label="Acreage"
              v-model="propertyinfo.acreage"
            >
              <v-icon slot="prepend">mdi-lightbulb-on-outline</v-icon>
            </v-text-field>

            <!-- Beds and baths -->

            <v-text-field
              v-if="getPropType.residential || getPropType.rental"
              filled
              :rules="this.numrules"
              label="Beds"
              v-model="propertyinfo.beds"
            >
              <v-icon slot="prepend">mdi-lightbulb-on-outline</v-icon>
            </v-text-field>
            <v-text-field
              v-if="getPropType.residential || getPropType.rental"
              filled
              :rules="this.numrules"
              label="Baths"
              v-model="propertyinfo.baths"
            >
              <v-icon slot="prepend">mdi-water-pump</v-icon>
            </v-text-field>

            <!--Electic and plumbing-->

            <v-select
              v-if="getPropType.commercial"
              filled
              :rules="this.selectrules"
              label="Electricity?"
              v-model="propertyinfo.electric"
              :items="this.getYesNoList"
            >
              <v-icon slot="prepend">mdi-lightbulb-on-outline</v-icon>
            </v-select>
            <v-select
              v-if="getPropType.commercial"
              filled
              :rules="this.selectrules"
              label="Plumbing?"
              v-model="propertyinfo.plumbing"
              :items="this.getYesNoList"
            >
              <v-icon slot="prepend">mdi-water-pump</v-icon>
            </v-select>
            <v-text-field
              v-if="getPropType.commercial"
              filled
              :rules="this.numrules"
              v-model="propertyinfo.squarefeet"
              label="Square feet"
            >
              <v-icon slot="prepend">mdi-sigma</v-icon>
            </v-text-field>
            <v-text-field
              filled
              :rules="this.formrules"
              v-model="propertyinfo.location.address"
              label="Address"
            >
              <v-icon slot="prepend">mdi-map-marker-outline</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              filled
              :rules="this.formrules"
              v-model="propertyinfo.location.city"
              label="City"
            >
              <v-icon slot="prepend">mdi-city</v-icon>
            </v-text-field>
            <v-select
              filled
              label="State"
              :rules="this.formrules"
              v-model="propertyinfo.location.state"
              :items="this.getUSStatesList"
            >
              <v-icon slot="prepend">mdi-map</v-icon>
            </v-select>
            <v-text-field
              v-if="!getPropType.rental"
              filled
              label="Price USD"
              :rules="this.numrules"
              v-model="propertyinfo.price"
            >
              <v-icon slot="prepend">mdi-currency-usd</v-icon>
            </v-text-field>
            <v-text-field
              v-if="getPropType.rental"
              filled
              label="Rent USD"
              :rules="this.numrules"
              v-model="propertyinfo.rent"
            >
              <v-icon slot="prepend">mdi-currency-usd</v-icon>
            </v-text-field>
            <v-select
              v-if="getPropType.rental"
              filled
              label="Rental basis"
              :rules="this.formrules"
              v-model="propertyinfo.basis"
              :items="this.getBasisList"
            >
              <v-icon slot="prepend">mdi-map</v-icon>
            </v-select>
            <v-select
              v-if="getPropType.rental"
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
        <v-btn outlined class="mr-1" color="red" @click="myResetForm">refresh form</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "EditSingleInfo",
  props: {
    id: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters([
      "getUSStatesList",
      "getBasisList",
      "getYesNoList",
      "getEndPoint",
      "getPropType",
      "getDBUpdated"
    ]),
    currentPropType() {
      for (let p in this.getPropType) {
        if (this.getPropType[p]) {
          return p;
        }
      }
      return null;
    }
  },
  methods: {
    myResetValidation() {
      this.$refs.updateInfo.resetValidation();
    },

    myResetForm() {
      this.$refs.updateInfo.reset();
      this.getPropertyById();
    },
    mySubmit() {
      if (this.$refs.updateInfo.validate()) {
        alert(JSON.stringify(this.propertyinfo));
      }
    },
    getPropertyById() {
      if (this.propLoading) {
        return;
      }
      this.propLoading = true;
      axios
        .get(`${this.getEndPoint(this.currentPropType)}/${this.id}`)
        .then(doc => {
          this.propertyinfo = { ...doc.data };
        })
        .catch(err => console.log(err))
        .finally(() => (this.propLoading = false));
    }
  },
  data() {
    return {
      valid: true,
      propertyinfo: null,
      propLoading: false,
      formrules: [
        value => (!!value && value.length > 0) || "field can't be empty"
      ],
      numrules: [
        value =>
          (!!value && value.length > 0 && !!parseInt(value)) ||
          "field must be a number"
      ],
      selectrules: [
        value => value === true || value === false || "must make a selection"
      ]
    };
  },
  watch: {
    getDBUpdated() {
      this.getPropertyById();
    }
  },
  created() {
    this.getPropertyById();
  }
};
</script>

<style>
</style>