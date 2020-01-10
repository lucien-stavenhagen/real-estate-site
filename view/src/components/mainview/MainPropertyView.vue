<template>
  <section>
    <PropByType proptype="commercial" />
    <PropByType proptype="residential" />
    <PropByType proptype="rental" />
    <PropByType proptype="land" />
  </section>
</template>

<script>
import PropByType from "./PropByType";

export default {
  name: "MainPropertyView",
  components: {
    PropByType
  }
};
</script>

<style></style>
