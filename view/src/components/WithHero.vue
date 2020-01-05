<template>
  <section class="home">
    <v-container>
      <v-row dense v-for="(m,i) in blocks.blocks" :key="i">
        <v-col :md="blocks.colsize" :offset-md="m.switch ? 0 : 12-blocks.colsize">
          <v-card outlined dark color="rgba(0,0,0,0)">
            <v-card-title class="display-2">{{m.title}}</v-card-title>
            <v-card-subtitle>{{m.subtitle}}</v-card-subtitle>
            <v-card-text class="headline font-weight-light">{{m.text}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "WithHero",
  props: {
    blocks: {
      type: Object,
      required: true
    }
  },
  components: {}
};
</script>
<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.home::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 1;
  z-index: -30;
  background: url("../assets/roman/willian-west-YpKiwlvhOpI-unsplash.jpg")
    no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}

.home::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.5;
  z-index: -20;
  background-color: black;
}
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
