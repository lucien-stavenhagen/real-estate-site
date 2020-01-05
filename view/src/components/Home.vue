<template>
  <section>
    <WithHero :blocks="this.herodata" />
    <Testimonial />
  </section>
</template>

<script>
import WithHero from "./WithHero";
import Testimonial from "./Testimonial";

export default {
  name: "Home",
  components: {
    WithHero,
    Testimonial
  },
  data() {
    return {
      herodata: {
        colsize: "6",
        blocks: [
          {
            switch: true,
            title: "There is no escape.",
            subtitle: "Don't make me destroy you.",
            text:
              "Luke, you do not yet realize your importance. You have only begun to discover your power. Join me, and I will complete your training. With our combined strength, we can end this destructive conflict and bring order to the galaxy."
          },
          {
            switch: false,
            title: "If you only knew...",
            subtitle: "...the power of the Dark Side.",
            text:
              " ObiWan never told you what happened to your father... No... I am your father. Search your feelings, you know it to be true. Join me, and we can rule the galaxy as father and son! Come with me, it is the only way"
          }
        ]
      }
    };
  }
};
</script>

<style>
</style>