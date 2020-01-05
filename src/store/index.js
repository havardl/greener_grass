import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

/*
* Helper functions 
*/
function returnObjectData(arr) {
  if (typeof arr !== "undefined") {
    return arr[0]["$"];
  }
}

export default new Vuex.Store({
  state: {
    profile: "cycling",
    destination: "beach",
    weather: Object
  },
  getters: {
    formatWeather: (state, getters) => {
      let res = state.weather
      let weaterData = []

      res.forEach(o =>
        weaterData.push({
          to: new Date(o["$"].to).getTime(),
          from: new Date(o["$"].from).getTime(),
          to_string: o["$"].to,
          from_string: o["$"].from,
          cloudiness: returnObjectData(o.location[0].cloudiness),
          temperature: returnObjectData(o.location[0].temperature),
          temperatureProbability: returnObjectData(
            o.location[0].temperatureProbability
          ),
          dewpointTemperature: returnObjectData(
            o.location[0].dewpointTemperature
          ),
          fog: returnObjectData(o.location[0].fog),
          highClouds: returnObjectData(o.location[0].highClouds),
          humidity: returnObjectData(o.location[0].humidity),
          lowClouds: returnObjectData(o.location[0].lowClouds),
          mediumClouds: returnObjectData(o.location[0].mediumClouds),
          pressure: returnObjectData(o.location[0].pressure),
          temperature: returnObjectData(o.location[0].temperature),
          windDirection: returnObjectData(o.location[0].windDirection),
          windGust: returnObjectData(o.location[0].windGust),
          windSpeed: returnObjectData(o.location[0].windSpeed),
          windProbability: returnObjectData(o.location[0].windProbability),
          precipitation: returnObjectData(o.location[0].precipitation),
          minTemperature: returnObjectData(o.location[0].minTemperature),
          maxTemperature: returnObjectData(o.location[0].maxTemperature),
          symbol: returnObjectData(o.location[0].symbol),
          symbolProbability: returnObjectData(
            o.location[0].symbolProbability
          )
        })
      );
      // Filter the data down:
      let symbolWeaterData = weaterData.filter(x => x.symbolProbability)
      return symbolWeaterData[0]
      // // Get the prediction where the current time is within the 6 hrs timeframe:
      // let current_time = this.shittyTimeRounder(new Date()).getTime();
      // let forecasts = symbolWeaterData.filter(forecast =>
      //   forecast
      //     ? new Date(forecast.from).getTime() <= current_time &&
      //       new Date(forecast.to).getTime() >= current_time
      //     : false
      // );

      // // If the time is before the first forecast, just show the first one:
      // if (forecasts[0] === undefined) {
      //   return symbolWeaterData[0];
      // } else {
      //   return forecasts[0];
      // }
    }
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
      let lng = coordinates[0]
      let lat = coordinates[1]

      let base_url = "https://api.met.no/weatherapi/locationforecast/1.9/?"
      let url = base_url + "lat=" + lat + "&lon=" + lng

      let parseString = require("xml2js").parseString;
      let result = await axios.get(url).then(
        response => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.log("Error fetching data:", err)
            } else {
              commit("weather", result.weatherdata.product[0].time)
              return true
            }
          });
        },
        err => {
          console.log(err)
          return false
        }
      );
    }
  },
  modules: {}
});
