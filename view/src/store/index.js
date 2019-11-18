import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    host: "http://localhost:4001/api",
    commercial: "commercial"
  },
  getters: {
    getCommercial(state) {
      return `${state.host}/${state.commercial}`;
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
