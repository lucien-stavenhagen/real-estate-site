import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

store.subscribe((mutation, state) => {
  localStorage.setItem(
    store.state.localstoragename,
    JSON.stringify(state.proptype)
  );
});
new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    this.$store.commit("mutateInitPropType");
  },
  render: h => h(App)
}).$mount("#app");
