<template>
  <v-container>
    <v-card v-if="this.propertyinfo">
      <v-card-title
        class="font-weight-light justify-center text-uppercase"
      >Edit {{this.currentPropType}} Property</v-card-title>
      <v-container>
        <v-card outlined :loading="this.propLoading">
          <v-card-title class="font-weight-light justify-center text-uppercase">Edit images</v-card-title>
          <v-row no-gutters>
            <v-col cols="12" sm="4" :key="i" v-for="(image, i) in propertyinfo.images">
              <v-card>
                <v-img height="100%" contain :src="image.source"></v-img>
                <v-card-actions>
                  <v-btn small outlined @click="deleteImage(propertyinfo._id,image)">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-form class="mt-2" v-model="valid" ref="updatePhotos">
            <v-file-input
              v-model="newimages"
              filled
              multiple
              accept="image/jpeg, image/jpg, image/png"
              label="Add Photos"
            ></v-file-input>
            <v-btn outlined class="mr-1" @click="addImagesById">submit</v-btn>
          </v-form>
        </v-card>
      </v-container>
      <v-container>
        <v-card>
          <v-card-title class="font-weight-light justify-center text-uppercase">Edit Info</v-card-title>
          <v-form v-model="valid" ref="mysubmit">
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
            <!--
            <v-btn outlined class="mr-1" @click="mySubmit">submit</v-btn>
            <v-btn outlined class="mr-1" @click="myResetValidation">clear errors</v-btn>
            <v-btn outlined class="mr-1" color="red" @click="myResetForm">reset form</v-btn>
            -->
          </v-form>
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "EditProperty",
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
  methods: {
    myResetForm() {
      this.$refs.updatePhotos.reset();
      this.getPropertyById();
    },
    myResetValidation() {
      this.$refs.mysubmit.resetValidation();
    },
    deleteImage(mainid, imageobj) {
      const filename = encodeURIComponent(imageobj.filename);
      axios
        .delete(
          `${this.getEndPoint(this.currentPropType)}/${mainid}/deletephoto/${
            imageobj._id
          }/imagepath/${filename}`
        )
        .then(doc => {
          console.log({ msg: "successfully deleted photo", doc });
          this.myResetForm();
        })
        .catch(err => console.log(err));
    },

    addImagesById() {
      let fd = new FormData();
      this.newimages.forEach(item => {
        fd.append(this.getImageFieldName, item);
      });
      axios
        .patch(
          `${this.getEndPoint(this.currentPropType)}/${this.id}/addphotos`,
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(doc => {
          console.log({ msg: "succefully added images", doc });
          this.myResetForm();
        })
        .catch(err => console.log({ msg: "adding images failed", err }));
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
      propLoading: false,
      propertyinfo: null,
      newimages: null,
      toggleview: false,
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
  created() {
    this.getPropertyById();
  }
};
</script>

<style></style>
