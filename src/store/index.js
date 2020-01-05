import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: "cycling",
    destination: "beach",
    weather: Object
  },
  mutations: {
    profile(state, val) {
      state.profile = val;
    },
    destination(state, val) {
      state.destination = val;
    },
    weather(state, val) {
      state.weather = val;
    }
  },
  actions: {
    async weather({ commit, state }, coordinates) {
      console.log("Here");
      let lng = coordinates[0];
      let lat = coordinates[1];

      let base_url = "https://api.met.no/weatherapi/locationforecast/1.9/?";
      let url = base_url + "lat=" + lat + "&lon=" + lng;

      let parseString = require("xml2js").parseString;
      let result = await axios.get(url).then(
        response => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.log("Error fetching data:", err);
            } else {
              commit("weather", result);
              return true;
            }
          });
        },
        err => {
          console.log(err);
          return false;
        }
      );
    }
  },
  modules: {}
});
