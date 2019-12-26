<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500">
      <v-card>
        <v-card-title
          class="headline text-uppercase red darken-4 white--text"
          primary-title
        >Are You Sure?</v-card-title>
        <v-card-text class="red darken-4 white--text">Click Cancel to cancel...</v-card-text>
        <v-card-text>id: {{id}}</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="ImNotSure()">Cancel</v-btn>
          <v-btn outlined color="red" @click="deleteProp()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "DeleteProperty",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getPropType", "getCurrentPropType"])
  },
  methods: {
    ImNotSure() {
      this.dialog = false;
      this.$router.push("/backend");
    },
    deleteProp() {
      this.dialog = false;
      axios
        .delete(
          `/api/deleteprop/proptype/${this.getCurrentPropType}/id/${this.id}`
        )
        .then(doc => {
          console.log(doc);
          this.$router.push("/backend");
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/backend");
        });
    }
  },
  data() {
    return {
      dialog: true
    };
  }
};
</script>