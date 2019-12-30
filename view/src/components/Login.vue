<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text
            class="red darken-4 white--text text-center text-uppercase"
            v-if="loginfailed"
          >login failed</v-card-text>
          <v-card-text>
            <v-form v-model="valid" ref="mylogin">
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
          </v-card-text>
          <v-card-actions>
            <v-btn @click="mySubmit" small outlined>Login</v-btn>
            <v-spacer />
            <v-btn @click="myResetForm" color="error" outlined small>reset</v-btn>
            <v-btn to="/" small outlined>home</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: {
    source: String
  },
  methods: {
    ...mapActions(["dispatchLoginUser"]),
    mySubmit() {
      if (this.$refs.mylogin.validate()) {
        axios
          .post("/api/users/login", {
            username: this.username,
            emailaddress: this.emailaddress,
            password: this.password
          })
          .then(doc => {
            this.myResetForm();
            this.loginfailed = false;
            this.dispatchLoginUser({
              username: doc.data.username,
              emailaddress: doc.data.emailaddress,
              token: doc.data.token
            });
            this.$router.push("/backend");
          })
          .catch(error => {
            this.loginfailed = true;
            this.myResetForm();
            console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
          });
      }
    },
    myResetForm() {
      this.$refs.mylogin.reset();
    },
    myResetValidation() {
      this.$refs.mylogin.resetValidation();
    }
  },
  data() {
    return {
      valid: true,
      loginfailed: false,
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