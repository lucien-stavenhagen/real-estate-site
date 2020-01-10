<template>
  <section>
    <v-card>
      <v-card-title
        class="font-weight-light justify-center text-capitalize"
      >Manage Administrator Accounts</v-card-title>
      <v-container>
        <AddNewUser />
      </v-container>
      <v-container>
        <ListAllUsers />
      </v-container>
    </v-card>
  </section>
</template>
<script>
import ListAllUsers from "./ListAllUsers";
import AddNewUser from "./AddNewUser";

export default {
  name: "UserManager",
  components: {
    ListAllUsers,
    AddNewUser
  }
};
</script>
<style scoped>
</style>