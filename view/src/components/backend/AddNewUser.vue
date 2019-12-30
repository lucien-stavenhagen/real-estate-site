<template>
  <section>
    <v-card>
      <v-card-title class="font-weight-light text-capitalize">Add New User</v-card-title>
      <v-card-title
        class="red darken-4 white--text justify-center text-capitalize font-weight-light"
        v-if="addfailed"
      >{{this.failedmsg.msg}}</v-card-title>
      <v-container>
        <v-form v-model="valid" ref="newuser">
          <v-text-field
            v-model="username"
            label="Username"
            name="username"
            :rules="textrules"
            prepend-icon="mdi-account"
            type="text"
            clearable
          />
          <v-text-field
            v-model="emailaddress"
            label="Email"
            name="emailaddress"
            prepend-icon="mdi-at"
            :rules="emailrules"
            :append-icon=" showemail ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showemail? 'text' : 'password'"
            @click:append="showemail = !showemail"
            clearable
          />

          <v-text-field
            v-model="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock-question"
            :rules="textrules"
            :append-icon=" showpassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpassword ? 'text' : 'password'"
            @click:append="showpassword = !showpassword"
            clearable
          />
        </v-form>
        <v-card-actions>
          <v-btn @click="addNewUser" small outlined>Add User</v-btn>
          <v-spacer />
          <v-btn @click="myResetForm" color="error" outlined small>reset</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </section>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "AddNewUser",
  methods: {
    ...mapActions(["dispatchDBUpdated"]),
    myResetForm() {
      this.$refs.newuser.reset();
      this.addfailed = false;
      this.failedmsg = null;
    },
    addNewUser() {
      if (this.$refs.newuser.validate()) {
        axios
          .post("/api/users/newuser", {
            username: this.username,
            emailaddress: this.emailaddress,
            password: this.password
          })
          .then(() => {
            this.myResetForm();
            this.dispatchDBUpdated();
            this.addfailed = false;
          })
          .catch(error => {
            this.addfailed = true;
            this.$refs.newuser.reset();
            this.failedmsg = error.response.data;
            //console.log(error.response.status);
            //console.log(error.response.headers);
          });
      }
    }
  },
  data() {
    return {
      userlist: [],
      valid: true,
      addfailed: false,
      failedmsg: null,
      showemail: true,
      showpassword: false,
      username: null,
      emailaddress: null,
      password: null,
      textrules: [
        value =>
          (!!value && (value || "").length > 4) ||
          "Must be at least 4 characters"
      ],
      emailrules: [
        value => !!value || "Required.",
        value => (value || "").length <= 30 || "Max 30 characters",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      ]
    };
  }
};
</script>
<style scoped>
</style>