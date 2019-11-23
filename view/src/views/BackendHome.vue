<template>
  <v-container>
    <h1>Backend page</h1>
    <NewPropertyView />
  </v-container>
</template>

<script>
// @ is an alias to /src
import NewPropertyView from "./backend/NewPropertyView";

export default {
  name: "home",
  components: {
    NewPropertyView
  }
};
</script>
