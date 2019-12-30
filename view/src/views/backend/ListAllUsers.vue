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
              <th class="text-left">Delete User</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,i) in userlist" :key="i">
              <td>{{ user.username }}</td>
              <td>{{ user.emailaddress }}</td>
              <td>
                <v-btn
                  @click="deleteUser(user.username, user._id)"
                  :disabled="userlist.length > 1? false: true"
                  icon
                >
                  <v-icon color="error">mdi-alpha-x-circle</v-icon>
                </v-btn>
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
    deleteUser(username, id) {
      if (
        confirm(`Confirm delete
      User: ${username}, 
      ID: ${id}`)
      ) {
        axios
          .delete(`/api/users/deleteuser/${id}`)
          .then(doc => {
            console.log(`successfully deleted ${id}. response: ${doc.data}`);
            this.dispatchDBUpdated();
          })
          .catch();
      }
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
      userlist: []
    };
  }
};
</script>
<style scoped>
</style>