<template>
  <section>
    <v-card>
      <v-card-title class="font-weight-light text-capitalize">Current User List</v-card-title>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">User Name</th>
              <th class="text-left">Email Address</th>
              <th class="text-center">Delete User</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,i) in userlist" :key="i">
              <td>{{ user.username }}</td>
              <td>{{ user.emailaddress }}</td>
              <td class="text-center">
                <v-row justify="center">
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" :disabled="userlist.length > 1? false: true" icon>
                        <v-icon color="error">mdi-alpha-x-circle</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">Delete this user?</v-card-title>
                      <v-card-text>ID: {{user._id}}</v-card-text>
                      <v-card-text>Name: {{user.username}}</v-card-text>
                      <v-card-text>Email: {{user.emailaddress}}</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="dialog = false">Cancel</v-btn>
                        <v-btn
                          color="red darken-1"
                          text
                          @click="deleteUser(user._id)"
                        >Blow them away</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </section>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ListAllUsers",
  computed: {
    ...mapGetters(["getDBUpdated"])
  },
  methods: {
    ...mapActions(["dispatchDBUpdated"]),
    getAllUsers() {
      axios
        .get("/api/users/getusers")
        .then(doc => (this.userlist = [...doc.data]))
        .catch(error => console.log(error.response.status));
    },
    deleteUser(id) {
      this.dialog = false;
      axios
        .delete(`/api/users/deleteuser/${id}`)
        .then(doc => {
          console.log(`successfully deleted ${id}. response: ${doc.data}`);
          this.dispatchDBUpdated();
        })
        .catch();
    }
  },
  watch: {
    getDBUpdated: {
      handler: "getAllUsers"
    }
  },
  mounted() {
    this.getAllUsers();
  },
  data() {
    return {
      userlist: [],
      dialog: false
    };
  }
};
</script>
<style scoped>
</style>