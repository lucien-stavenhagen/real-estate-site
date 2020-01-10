<template>
  <section>
    <v-card>
      <v-card-title class="font-weight-light text-capitalize">Current Administrator Account List</v-card-title>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">User Name</th>
              <th class="text-left">Email Address</th>
              <th class="text-left">Delete Account</th>
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
    ...mapGetters(["getDBUpdated", "getUser"])
  },
  methods: {
    ...mapActions(["dispatchDBUpdated"]),
    errorHelper(err) {
      {
        const msg = encodeURIComponent(
          JSON.stringify({
            status: err.response.status,
            message: err.response.data.error
          })
        );

        this.$router.push(`/error/${msg}`);
      }
    },
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
          .delete(`/api/users/deleteuser/${id}`, {
            headers: {
              authorization: `Bearer ${this.getUser.token}`
            }
          })
          .then(doc => {
            console.log(`successfully deleted ${id}. response: ${doc.data}`);
            this.dispatchDBUpdated();
          })
          .catch(err => this.errorHelper(err));
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