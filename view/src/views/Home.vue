<template>
  <div class="home">
    <h1>Home page</h1>
    <AddNewProperty />
  </div>
</template>

<script>
// @ is an alias to /src
import AddNewProperty from "./AddNewProperty";

export default {
  name: "home",
  components: {
    AddNewProperty
  }
};
</script>
