<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card :loading="this.propLoading" v-if="this.propertyinfo">
          <v-card-title class="font-weight-light justify-center">Edit images for {{id}}</v-card-title>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="4" :key="i" v-for="(image, i) in propertyinfo.images">
                <v-card>
                  <v-img height="100%" contain :src="image.source"></v-img>
                  <v-card-actions>
                    <v-btn x-small outlined @click="deleteImage($event,image)">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-form v-model="valid" ref="updatePhotos">
              <v-file-input
                v-model="newimages"
                filled
                multiple
                accept="image/jpeg, image/jpg, image/png"
                label="Add Photos"
              ></v-file-input>
              <v-btn outlined class="mr-1" @click="addImagesById">Add</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12"></v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "EditSingleImages",
  props: {
    id: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters([
      "getImageFieldName",
      "getPropType",
      "getDBUpdated",
      "getUser",
      "getCurrentPropType"
    ])
  },
  watch: {
    getDBUpdated() {
      this.getPropertyById();
    }
  },
  methods: {
    ...mapActions(["dispatchDBUpdated"]),

    myResetForm() {
      this.$refs.updatePhotos.reset();
      this.newimages = null;
      this.dispatchDBUpdated();
    },
    // "/patchprop/proptype/:proptype/propid/:propid/deletephoto/:imageid/imagepath/:imagepath",
    deleteImage(event, imageobj) {
      event.preventDefault();
      const filename = encodeURIComponent(imageobj.filename);
      axios
        .delete(
          `/api/patchprop/proptype/${this.getCurrentPropType}/propid/${this.id}/deletephoto/${imageobj._id}/imagepath/${filename}`,
          {
            headers: {
              authorization: `Bearer ${this.getUser.token}`
            }
          }
        )
        .then(doc => {
          console.log({ msg: "successfully deleted photo", doc });
          this.myResetForm();
        })
        .catch(err => console.log({ msg: "somtthings broke", err }));
    },

    addImagesById(event) {
      event.preventDefault();
      if (!this.newimages) {
        return;
      }
      let fd = new FormData();
      this.newimages.forEach(item => {
        fd.append(this.getImageFieldName, item);
      });
      axios
        .patch(
          `/api/patchprop/proptype/${this.getCurrentPropType}/id/${this.id}/addphotos`,
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${this.getUser.token}`
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
        .get(`/api/propertybyid`, {
          params: {
            id: this.id,
            property: this.getCurrentPropType
          }
        })
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
      newimages: null
    };
  },
  created() {
    this.getPropertyById();
  }
};
</script>

<style></style>
