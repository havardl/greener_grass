<template>
  <div id="map" class="map">
    <div
      class="absolute fl my24 mx24 py24 px24 bg-gray-faint round"
      style="z-index:999"
    >
      <div id="geocoder"></div>
      <form id="params">
        <h4 class="txt-m txt-bold mb6">Chose a travel mode:</h4>
        <div class="mb12 mr12 toggle-group align-center">
          <label class="toggle-container">
            <input name="profile" type="radio" value="walking" />
            <div class="toggle toggle--active-null toggle--null">Walking</div>
          </label>
          <label class="toggle-container">
            <input name="profile" type="radio" value="cycling" checked />
            <div class="toggle toggle--active-null toggle--null">Cycling</div>
          </label>
          <label class="toggle-container">
            <input name="profile" type="radio" value="driving" />
            <div class="toggle toggle--active-null toggle--null">Driving</div>
          </label>
        </div>
        <h4 class="txt-m txt-bold mb6">Chose a maximum duration:</h4>
        <div class="mb12 mr12 toggle-group align-center">
          <label class="toggle-container">
            <input name="duration" type="radio" value="10" checked />
            <div class="toggle toggle--active-null toggle--null">10 min</div>
          </label>
          <label class="toggle-container">
            <input name="duration" type="radio" value="20" />
            <div class="toggle toggle--active-null toggle--null">20 min</div>
          </label>
          <label class="toggle-container">
            <input name="duration" type="radio" value="30" />
            <div class="toggle toggle--active-null toggle--null">30 min</div>
          </label>
          <label class="toggle-container">
            <input name="duration" type="radio" value="45" />
            <div class="toggle toggle--active-null toggle--null">45 min</div>
          </label>
          <label class="toggle-container">
            <input name="duration" type="radio" value="60" />
            <div class="toggle toggle--active-null toggle--null">60 min</div>
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.marker {
  background-image: url("~assets/custom_marker.png");
  background-size: cover;
  width: 40px;
  height: 60px;
  display: block;
  cursor: pointer;
}
.map {
  width: 100%;
  height: 100%;
  position: absolute;
}
.mapboxgl-popup {
  max-width: 200px;
  min-width: 150px;
  color: #000;
}
.mapboxgl-popup-content {
  text-align: center;
  font-family: "Open Sans", sans-serif;
}
</style>

<script>
import * as turf from "@turf/turf";

export default {
  name: "MapBox",
  props: {
    center: Array,
    marker: Object
    // icon: String,
    // data: Object
  },
  data: function() {
    return {
      map: null,
      geocoder: null,
      data: null,
      token:
        "pk.eyJ1IjoiaGF2YXJkbCIsImEiOiJtSTFleXg4In0.bCnuP121PLOPrqhdwUwYDA",
      selectedCoordinates: [],
      selectedName: "",
      profile: "cycling",
      minutes: 10
    };
  },
  mounted() {
    window.mapboxgl = require("mapbox-gl");
    window.MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");
    this.createMap();
    // document.querySelector('.mapboxgl-ctrl-geocoder input').focus()
  },
  computed: {},
  watch: {
    data() {
      this.getIso();
      this.addMarkers();
    }
  },
  methods: {
    createMap() {
      let self = this;
      mapboxgl.accessToken = this.token;

      const mapOptions = {
        container: "map",
        style: "mapbox://styles/mapbox/light-v10",
        center: this.center,
        zoom: 6,
        accessToken: this.token,
        attributionControl: false
      };

      // init the map
      this.map = new window.mapboxgl.Map(mapOptions);
      this.geocoder = new window.MapboxGeocoder({
        accessToken: this.token,
        marker: {
          color: "orange"
        }
        //mapboxgl: window.mapboxgl
      });
      //this.map.addControl(this.geocoder);
      document
        .getElementById("geocoder")
        .appendChild(this.geocoder.onAdd(this.map));

      this.map.on("load", () => {
        // this.removeInteractive();
        // this.addMarkers();
        this.addIsoUI();
        this.addIsoLayer();
      });
      this.geocoder.on("result", function(result) {
        // Fired when the geocoder returns a selected result
        // https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md#on
        console.log(result);
        self.getWeather(result);
      });
    },
    addIsoUI() {
      let self = this;
      let params = document.getElementById("params");
      params.addEventListener("change", function(e) {
        if (e.target.name === "profile") {
          self.profile = e.target.value;
          self.getIso();
        } else if (e.target.name === "duration") {
          self.minutes = e.target.value;
          self.getIso();
        }
      });
    },
    addIsoLayer() {
      // When the map loads, add the source and layer
      this.map.addSource("iso", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });

      this.map.addLayer(
        {
          id: "isoLayer",
          type: "fill",
          // Use "iso" as the data source for this layer
          source: "iso",
          layout: {},
          paint: {
            // The fill color for the layer is set to a light purple
            "fill-color": "#5a3fc0",
            "fill-opacity": 0.3
          }
        },
        "poi-label"
      );
    },
    removeInteractive() {
      // set layer visibility
      // turn off interactivity
      this.map.scrollZoom.disable();
      this.map.boxZoom.disable();
      this.map.dragRotate.disable();
      this.map.dragPan.disable();
      this.map.keyboard.disable();
      this.map.doubleClickZoom.disable();
      this.map.touchZoomRotate.disable();
    },
    addMarkers() {
      let self = this;
      var el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add it to the map
      new window.mapboxgl.Marker(el)
        .setLngLat(this.selectedCoordinates)
        .setPopup(
          new window.mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              "<h3>Sted: " +
                this.selectedName +
                "</h3>" +
                "<p><b>Temp (celsius)</b>: mellom " +
                self.data.minTemperature.value +
                " og " +
                self.data.maxTemperature.value +
                "</p>" +
                "<p><b>Nedbør (mm):</b> mellom " +
                self.data.precipitation.minvalue +
                " og " +
                self.data.precipitation.maxvalue +
                "</p>" +
                "<img src=" +
                self.getMetWeatherIcon(self.data.symbol.number) +
                " />"
            )
        )
        .addTo(self.map);
    },
    getMetWeatherIcon(symbol_id, night = 0) {
      // Build the url we need to get a specific icon
      let base_url = "https://api.met.no/weatherapi/weathericon/1.1/?";
      let content_type_png = "&content_type=image/png";
      let content_type_svg = "&content_type=image/svg%2Bxml";
      let url =
        base_url +
        "symbol=" +
        symbol_id +
        "&is_night=" +
        night +
        content_type_svg;
      return url;
    },
    getWeather: function(place) {
      this.selectedCoordinates = place.result.center;
      this.selectedName = place.result.text;
      this.getMetWeatherForecast(this.selectedCoordinates);
    },
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
            console.log(result);
            this.data = self.getData(result);
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
      // console.log(symbolWeaterData)
      // Get the prediction where the current time is within the 6 hrs timeframe:
      let current_time = this.shittyTimeRounder(new Date()).getTime();
      let forecasts = symbolWeaterData.filter(forecast =>
        forecast
          ? new Date(forecast.from).getTime() <= current_time &&
            new Date(forecast.to).getTime() >= current_time
          : false
      );

      if (forecasts[0] === undefined) {
        return symbolWeaterData[0];
      } else {
        return forecasts[0];
      }
    },
    // Create a function that sets up the Isochrone API query then makes an Ajax call
    async getIso() {
      let self = this;
      let urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";
      // var profile = "cycling";
      // var minutes = 10;
      let lon = this.selectedCoordinates[0];
      let lat = this.selectedCoordinates[1];

      var query =
        urlBase +
        this.profile +
        "/" +
        lon +
        "," +
        lat +
        "?contours_minutes=" +
        this.minutes +
        "&polygons=true&denoise=1&access_token=" +
        this.token;

      // Various color for minutes:
      //"&contours_colors=6706ce,04e813,4286f4" +

      console.log(query);
      const res = await this.$axios
        .$get(query)
        .then(response => {
          self.map.getSource("iso").setData(response);
          console.log(response);

          let coordinates = response.features[0].geometry.coordinates[0];

          // Polygon to linestring - use this for along sides?
          var poly = turf.polygon([coordinates]);
          var line = turf.polygonToLine(poly);
          console.log(line);
          line = turf.lineString(line.geometry.coordinates);

          // show a marker every 200 meters
          var distance = 0.2;

          // get the line length in kilometers
          var length = turf.lineDistance(line, {units: 'kilometers'});
          for (var i = 1; i <= length / distance; i++) {
            var turfPoint = turf.along(line, i * distance, {units: 'kilometers'});
            console.log(turfPoint)
            // // convert the generated point to a OpenLayers feature
            // var marker = format.readFeature(turfPoint);
            // marker.getGeometry().transform("EPSG:4326", "EPSG:3857");
            // source.addFeature(marker);
          }

          // var options = {units: 'kilometers'};
          // var along = turf.along(line, 0.1, options);
          // console.log(along)

          let lons = coordinates.map(function(elt) {
            return elt[0];
          });
          let lats = coordinates.map(function(elt) {
            return elt[1];
          });

          let lon_min = this.getMin(lons);
          let lon_max = this.getMax(lons);
          let lat_min = this.getMin(lats);
          let lat_max = this.getMax(lats);

          //let extent = turf.square([lon_min, lat_min, lon_max, lat_max]);
          let extent = [lon_min, lat_min, lon_max, lat_max];

          var bounds = coordinates.reduce(function(bounds, coord) {
            return bounds.extend(coord);
          }, new window.mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

          // var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
          var cellSide = 0.5;
          var options = { units: "kilometers" };
          var grid = turf.pointGrid(extent, cellSide, options);
          //console.log(grid)

          // Check if the points are within the actual polygon:
          let pt = turf.point(this.selectedCoordinates);
          var poly = turf.polygon([coordinates]);
          let check = turf.booleanPointInPolygon(pt, poly);
          //console.log(check);

          let grid_within = grid.features.filter(point =>
            point
              ? turf.booleanPointInPolygon(
                  turf.point(point.geometry.coordinates),
                  poly
                )
              : false
          );

          console.log(grid_within);

          grid_within.forEach(function(marker) {
            // create a HTML element for each feature
            var el = document.createElement("div");
            el.className = "marker";

            // make a marker for each feature and add to the map
            new window.mapboxgl.Marker(el)
              .setLngLat(marker.geometry.coordinates)
              .addTo(self.map);
          });

          self.map.fitBounds(bounds, {
            padding: { top: 25, bottom: 25, left: 200, right: 25 }
          });
        })
        .catch(e => {
          console.log("error", e);
          //error({ statusCode: 401, message: "Post not found" });
        });
    },
    getMin(arr) {
      const min = Math.min(...[].concat(...arr));
      return min;
    },
    getMax(arr) {
      const max = Math.max(...[].concat(...arr));
      return max;
    }
  }
};
</script>
