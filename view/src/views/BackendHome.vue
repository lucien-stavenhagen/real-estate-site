<template>
  <v-container>
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
