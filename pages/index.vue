<template>
  <map-box
    :center="center"
    :marker="marker"
    :data="data"
  />
</template>

<style scoped></style>

<script>
//import Card from "~/components/Card";
import MapBox from "~/components/MapBox";

export default {
  name: "HomePage",
  components: {
    // Card,
    MapBox
  },
  data() {
    return {
      data: null,
      ip: null,
      center: [10.74761, 59.9147],
      marker: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: null
            },
            properties: {
              title: "",
              description: ""
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.marker.features[0].geometry.coordinates = this.center;
    this.marker.features[0].properties.title = "Title";
    this.marker.features[0].properties.description = "Description";

    // this.getMetWeatherForecast(this.center);
    // this.getMetWeatherIcon(1)
  },
  methods: {
    shittyTimeRounder: function(a = new Date()) {
      if (typeof a === "number") {
        let b = new Date();
        b.setHours(b.getHours() + a);
        a = b;
      }
      return new Date(
        `${a.getFullYear()}/${a.getMonth() + 1}/${a.getDate()} ${a.getHours() +
          1}:00`
      );
    },
    async getMetWeatherForecast(arr) {
      let self = this;
      let lng = arr[0];
      let lat = arr[1];

      let base_url = "https://api.met.no/weatherapi/locationforecast/1.9/?";
      let url = base_url + "lat=" + lat + "&lon=" + lng;

      let parseString = require("xml2js").parseString;
      const res = await this.$axios.$get(url).then(response => {
        parseString(response, (err, result) => {
          if (err) {
            console.log("Error fetching data:", err);
          } else {
            this.data = self.getData(result);
            console.log(this.data)
          }
        });
      });
    },
    returnObjectData(arr) {
      if (typeof arr !== "undefined") {
        return arr[0]["$"];
      }
    },
    round(str) {
      return Math.round(parseInt(str)).toString();
    },
    getData(data) {
      console.log(data)
      let self = this;
      // Result is reformatted with this:
      // https://www.npmjs.com/package/xml2js
      let res = data.weatherdata.product[0].time;
      let weaterData = [];

      res.forEach(o =>
        weaterData.push({
          to: new Date(o["$"].to).getTime(),
          from: new Date(o["$"].from).getTime(),
          to_string: o["$"].to,
          from_string: o["$"].from,
          cloudiness: self.returnObjectData(o.location[0].cloudiness),
          temperature: self.returnObjectData(o.location[0].temperature),
          temperatureProbability: self.returnObjectData(
            o.location[0].temperatureProbability
          ),
          dewpointTemperature: self.returnObjectData(
            o.location[0].dewpointTemperature
          ),
          fog: self.returnObjectData(o.location[0].fog),
          highClouds: self.returnObjectData(o.location[0].highClouds),
          humidity: self.returnObjectData(o.location[0].humidity),
          lowClouds: self.returnObjectData(o.location[0].lowClouds),
          mediumClouds: self.returnObjectData(o.location[0].mediumClouds),
          pressure: self.returnObjectData(o.location[0].pressure),
          temperature: self.returnObjectData(o.location[0].temperature),
          windDirection: self.returnObjectData(o.location[0].windDirection),
          windGust: self.returnObjectData(o.location[0].windGust),
          windSpeed: self.returnObjectData(o.location[0].windSpeed),
          windProbability: self.returnObjectData(o.location[0].windProbability),
          precipitation: self.returnObjectData(o.location[0].precipitation),
          minTemperature: self.returnObjectData(o.location[0].minTemperature),
          maxTemperature: self.returnObjectData(o.location[0].maxTemperature),
          symbol: self.returnObjectData(o.location[0].symbol),
          symbolProbability: self.returnObjectData(
            o.location[0].symbolProbability
          )
        })
      );
      // Filter the data down:
      let symbolWeaterData = weaterData.filter(x => x.symbolProbability);

      // Get the prediction where the current time is within the 6 hrs timeframe:
      let current_time = this.shittyTimeRounder(new Date()).getTime();
      let forecasts = symbolWeaterData.filter(forecast =>
        forecast
          ? new Date(forecast.from).getTime() <= current_time &&
            new Date(forecast.to).getTime() > current_time
          : false
      );

      return forecasts[0];
    }
  },
  watch: {
    // data() {
    //   let self = this;
    //   // Result is reformatted with this:
    //   // https://www.npmjs.com/package/xml2js
    //   let res = this.data.weatherdata.product[0].time;
    //   let weaterData = [];
    //   //console.log(res.length);
    //   res.forEach(o =>
    //     weaterData.push({
    //       to: new Date(o["$"].to).getTime(),
    //       from: new Date(o["$"].from).getTime(),
    //       to_string: o["$"].to,
    //       from_string: o["$"].from,
    //       cloudiness: self.returnObjectData(o.location[0].cloudiness),
    //       temperature: self.returnObjectData(o.location[0].temperature),
    //       temperatureProbability: self.returnObjectData(
    //         o.location[0].temperatureProbability
    //       ),
    //       dewpointTemperature: self.returnObjectData(
    //         o.location[0].dewpointTemperature
    //       ),
    //       fog: self.returnObjectData(o.location[0].fog),
    //       highClouds: self.returnObjectData(o.location[0].highClouds),
    //       humidity: self.returnObjectData(o.location[0].humidity),
    //       lowClouds: self.returnObjectData(o.location[0].lowClouds),
    //       mediumClouds: self.returnObjectData(o.location[0].mediumClouds),
    //       pressure: self.returnObjectData(o.location[0].pressure),
    //       temperature: self.returnObjectData(o.location[0].temperature),
    //       windDirection: self.returnObjectData(o.location[0].windDirection),
    //       windGust: self.returnObjectData(o.location[0].windGust),
    //       windSpeed: self.returnObjectData(o.location[0].windSpeed),
    //       windProbability: self.returnObjectData(o.location[0].windProbability),
    //       precipitation: self.returnObjectData(o.location[0].precipitation),
    //       minTemperature: self.returnObjectData(o.location[0].minTemperature),
    //       maxTemperature: self.returnObjectData(o.location[0].maxTemperature),
    //       symbol: self.returnObjectData(o.location[0].symbol),
    //       symbolProbability: self.returnObjectData(
    //         o.location[0].symbolProbability
    //       )
    //     })
    //   );
    //   // Filter the data down:
    //   let symbolWeaterData = weaterData.filter(x => x.symbolProbability);
    //   // Get the prediction where the current time is within the 6 hrs timeframe:
    //   let current_time = this.shittyTimeRounder(new Date()).getTime();
    //   let forecasts = symbolWeaterData.filter(forecast =>
    //     forecast
    //       ? new Date(forecast.from).getTime() <= current_time &&
    //         new Date(forecast.to).getTime() > current_time
    //       : false
    //   );
    //   return forecasts[0];
    // }
  }
};
</script>
