<template>
  <v-container>
    <v-card>
      <v-card-title
        class="font-weight-light justify-center text-uppercase"
      >Add New {{this.currentPropType}} Property to Database</v-card-title>
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
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-if="getPropType.commercial"
                filled
                :rules="this.numrules"
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
          <v-btn outlined class="mr-1" color="red" @click="myResetForm">reset form</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "AddNewProperty",
  computed: {
    ...mapGetters([
      "getUSStatesList",
      "getBasisList",
      "getYesNoList",
      "getImageFieldName",
      "getEndPoint",
      "getPropType"
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
  data() {
    return {
      valid: true,
      filerules: [value => !!value || "image is required"],
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
        const formData = this.createFormData();
        let endpoint;
        if (this.getPropType.commercial) {
          endpoint = this.getEndPoint("commercial");
        } else if (this.getPropType.residential) {
          endpoint = this.getEndPoint("residential");
        } else if (this.getPropType.rental) {
          endpoint = this.getEndPoint("rental");
        } else if (this.getPropType.land) {
          endpoint = this.getEndPoint("land");
        } else {
          //
          // TBD error condition
          //
          return false;
        }
        axios
          .post(endpoint, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(() => {
            console.log("successful entry");
            this.myResetForm();
          })
          .catch(err => this.$router.push(`/error/${err.data}`));
      }
    },
    myResetForm() {
      this.$refs.mysubmit.reset();
    },
    myResetValidation() {
      this.$refs.mysubmit.resetValidation();
    },
    createFormData() {
      let fd = new FormData();
      //
      // these attributes can be found in the
      // backend, in the mongoose model sources
      // RealEstateModels.js and subSchema.js.

      //
      // everybody has these
      //
      fd.append(this.getImageFieldName, this.propertyinfo.source);
      fd.append("caption", this.propertyinfo.caption);
      fd.append("city", this.propertyinfo.city);
      fd.append("state", this.propertyinfo.state);
      fd.append("description", this.propertyinfo.description);

      //
      // rental only
      //
      if (this.getPropType.rental) {
        fd.append("rent", this.propertyinfo.rent);
        fd.append("allbillspaid", this.propertyinfo.allbillspaid);
        fd.append("basis", this.propertyinfo.basis);
      }

      //
      // everybody except rental
      //
      if (!this.getPropType.rental) {
        fd.append("price", this.propertyinfo.price);
      }

      //
      // rental and residential
      //
      if (this.getPropType.rental || this.getPropType.residential) {
        fd.append("beds", this.propertyinfo.beds);
        fd.append("baths", this.propertyinfo.baths);
      }

      //
      // commercial only
      //
      if (this.getPropType.commercial) {
        fd.append("squarefeet", this.propertyinfo.squarefeet);
        fd.append("plumbing", this.propertyinfo.plumbing);
        fd.append("electric", this.propertyinfo.electric);
      }

      //
      // land only
      //
      if (this.getPropType.land) {
        fd.append("acreage", this.propertyinfo.acreage);
      }
      return fd;
    }
  }
};
</script>

<style></style>
