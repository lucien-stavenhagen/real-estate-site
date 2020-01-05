<template>
  <section>
    <v-container>
      <v-row dense>
        <v-col cols="12" md="4" :key="i" v-for="(comment, i) in comments">
          <v-hover>
            <template v-slot="{hover}">
              <v-card class="pa-md-3" outlined :elevation="hover ? 24: 0">
                <v-img
                  :gradient="comment.gradient ? comment.gradient : undefined"
                  contain
                  max-height="300px"
                  class="align-end"
                  :src="comment.image"
                ></v-img>
                <v-card-title class="headline">
                  <p>
                    <q>{{comment.comment}}</q>
                  </p>
                </v-card-title>

                <v-card-subtitle>
                  <cite>- {{comment.author}}</cite>
                </v-card-subtitle>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-col align-self="center" cols="12">
        <v-container>
          <v-card flat class="pa-5">
            <v-card-title class="headline justify-center">And there is so much more...</v-card-title>
            <v-card-subtitle
              class="text-center"
            >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur, tempore?</v-card-subtitle>
            <v-card-text
              class="text-center"
            >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam tenetur eligendi assumenda vero consequatur! Tempora libero commodi molestiae perferendis ut laborum. Repellendus maiores assumenda quia! Dolorum quasi earum odio est vel, quae aperiam harum a ipsum quisquam placeat, officiis voluptatibus?</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn>
                <v-icon left>mdi-speedometer</v-icon>Get Started
              </v-btn>
              <v-btn outlined>
                <v-icon left>mdi-github-circle</v-icon>Github
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "Testimonial",
  data() {
    return {
      comments: [
        {
          author: "Andrea Palladio",
          comment: "I never knew web design like this was possible.",
          image: require("../assets/persons/palladio.jpg"),
          gradient: false
        },
        {
          author: "Leon Battista Alberti",
          comment: "Never before have I seen such sites.",
          image: require("../assets/persons/alberti.jpg")
          //         gradient: "to right, rgba(0,255,0,.05), rgba(0,255,0, .05)"
        },
        {
          author: "Le Corbusier",
          comment:
            "When one sees such web pages, what can one say but ... LS designs...",
          image: require("../assets/persons/Le-Corbu.jpg")
          //          gradient: "to right, rgba(0,0,255,.05), rgba(0,0,255, .05)"
        }
      ]
    };
  }
};
</script>

<style>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>