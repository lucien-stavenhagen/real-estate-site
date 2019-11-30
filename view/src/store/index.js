import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    localstoragename: "realestate",
    host: "http://localhost:4001/api",
    endpoints: {
      commercial: "commercial",
      residential: "residential",
      rental: "rental",
      land: "land",
      all: "all"
    },
    proptype: {
      commercial: false,
      residential: false,
      rental: false,
      land: false
    },
    stateList: [
      { text: "Alabama", value: "AL" },
      { text: "Alaska", value: "AK" },
      { text: "Arizona", value: "AZ" },
      { text: "Arkansas", value: "AR" },
      { text: "California", value: "CA" },
      { text: "Colorado", value: "CO" },
      { text: "Connecticut", value: "CT" },
      { text: "Delaware", value: "DE" },
      { text: "Florida", value: "FL" },
      { text: "Georgia", value: "GA" },
      { text: "Hawaii", value: "HI" },
      { text: "Idaho", value: "ID" },
      { text: "Illinois", value: "IL" },
      { text: "Indiana", value: "IN" },
      { text: "Iowa", value: "IA" },
      { text: "Kansas", value: "KS" },
      { text: "Kentucky", value: "KY" },
      { text: "Louisiana", value: "LA" },
      { text: "Maine", value: "ME" },
      { text: "Maryland", value: "MD" },
      { text: "Massachusetts", value: "MA" },
      { text: "Michigan", value: "MI" },
      { text: "Minnesota", value: "MN" },
      { text: "Mississippi", value: "MS" },
      { text: "Missouri", value: "MO" },
      { text: "Montana", value: "MT" },
      { text: "Nebraska", value: "NE" },
      { text: "Nevada", value: "NV" },
      { text: "New Hampshire", value: "NH" },
      { text: "New Jersey", value: "NJ" },
      { text: "New Mexico", value: "NM" },
      { text: "New York", value: "NY" },
      { text: "North Carolina", value: "NC" },
      { text: "North Dakota", value: "ND" },
      { text: "Ohio", value: "OH" },
      { text: "Oklahoma", value: "OK" },
      { text: "Oregon", value: "OR" },
      { text: "Pennsylvania", value: "PA" },
      { text: "Rhode Island", value: "RI" },
      { text: "South Carolina", value: "SC" },
      { text: "South Dakota", value: "SD" },
      { text: "Tennessee", value: "TN" },
      { text: "Texas", value: "TX" },
      { text: "Utah", value: "UT" },
      { text: "Vermont", value: "VT" },
      { text: "Virginia", value: "VA" },
      { text: "Washington", value: "WA" },
      { text: "West Virginia", value: "WV" },
      { text: "Wisconsin", value: "WI" },
      { text: "Wyoming", value: "WY" }
    ],
    basisList: [
      { text: "Monthly", value: "monthly" },
      { text: "Weekly", value: "weekly" }
    ],
    yesnoList: [
      { text: "Yes", value: true },
      { text: "No", value: false }
    ],
    imagefieldname: "imagepath",
    dbupdated: 0
  },
  getters: {
    getEndPoint: state => endpointname => {
      return `${state.host}/${state.endpoints[endpointname]}`;
    },
    getUSStatesList(state) {
      return state.stateList;
    },
    getBasisList(state) {
      return state.basisList;
    },
    getYesNoList(state) {
      return state.yesnoList;
    },
    getImageFieldName(state) {
      return state.imagefieldname;
    },
    getPropType(state) {
      return state.proptype;
    },
    getCurrentPropType(state) {
      for (let p in state.proptype) {
        if (state.proptype[p]) {
          return p;
        }
      }
      return null;
    },

    getDBUpdated(state) {
      return state.dbupdated;
    }
  },
  mutations: {
    mutateInitPropType(state) {
      const payload = JSON.parse(localStorage.getItem(state.localstoragename));
      if (payload) {
        state.proptype = { ...payload };
      }
    },
    mutateDBUpdated(state) {
      if (state.dbupdated > 1000) {
        state.dbupdated = 0;
      } else {
        state.dbupdated++;
      }
    },
    mutatePropType(state, settype) {
      const newstate = {
        ...state.proptype
      };
      for (const p in newstate) {
        newstate[p] = false;
      }
      newstate[settype] = true;
      state.proptype = newstate;
    }
  },
  actions: {
    dispatchPropType({ commit }, settype) {
      commit("mutatePropType", settype);
    },
    dispatchDBUpdated({ commit }) {
      commit("mutateDBUpdated");
    }
  },
  modules: {}
});
