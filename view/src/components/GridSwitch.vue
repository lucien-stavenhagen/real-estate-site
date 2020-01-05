<template>
  <section>
    <v-container>
      <v-row dense v-for="(m,i) in blocks" :key="i">
        <v-col align-self="center" cols="12" md="4" :order-md="m.switch ? 'first' : 'last'">
          <v-card flat :outlined="m.styled" :color="m.styled ? undefined : 'rgba(0,0,0,0)'">
            <v-card-title class="display-1">{{m.title}}</v-card-title>
            <v-card-subtitle>{{m.subtitle}}</v-card-subtitle>
            <v-divider v-if="m.styled"></v-divider>
            <v-card-text class="body-1">{{m.text}}</v-card-text>
            <v-card-actions class="flex-column" v-if="m.links && m.links.length > 0">
              <a
                v-for="(link, i) in m.links"
                :key="i"
                target="_blank"
                :href="link.href"
              >{{link.text}}</a>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col align-self="center" cols="12" md="8" :order-md="m.switch ? 'last' : 'first'">
          <v-card flat outlined v-for="(image, i) in m.images" :key="i">
            <v-system-bar color="rgba(0,0,0,0)"></v-system-bar>
            <a :href="image.source" target="_blank">
              <v-img
                :max-height="image.maxheight ? image.maxheight : '500px'"
                contain
                :src="image.source"
              ></v-img>
            </a>
            <v-card-subtitle class="text-center caption">{{image.caption}}</v-card-subtitle>
            <v-card-actions class="flex-column" v-if="image.links && image.links.length > 0">
              <a
                class="caption"
                v-for="(link, i) in image.links"
                :key="i"
                :href="link.href"
                target="_blank"
              >{{link.text}}</a>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// @ is an alias to /src
export default {
  name: "GridSwitch",
  props: {
    blocks: {
      type: Array,
      required: true
    }
  },
  components: {}
};
</script>
<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
