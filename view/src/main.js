import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

store.subscribe((mutation, state) => {
  if (mutation.type === "mutatePropType") {
    localStorage.setItem(
      store.state.localstoragename,
      JSON.stringify(state.proptype)
    );
  }
  if (mutation.type === "mutateLoginUser") {
    localStorage.setItem(
      store.state.localstorageusers,
      JSON.stringify(state.login)
    );
  }
  if (mutation.type === "mutateLogout") {
    localStorage.removeItem(store.state.localstorageusers);
  }
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
