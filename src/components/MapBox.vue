<template>
  <div id="map" class="map">
    <div class="loader" v-if="loading">
      <div class="text-center">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
        <p>loading</p>
      </div>
    </div>
    <!-- <div
      class="absolute fl my24 mx24 py24 px24 bg-gray-faint round"
      style="z-index:999"
    >
      <div>
        <button v-on:click="removeAllMarkersFromMap">
          Remove markers
        </button>
      </div>
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
            <input name="duration" type="radio" value="15" checked />
            <div class="toggle toggle--active-null toggle--null">15 min</div>
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
    </div> -->
    <div class="ui">
      <div class="ui-widget">
        <b-container fluid>
          <b-row>
            <b-col sm="10">
              <b-collapse id="collapse-1" class="mt-2">
                <b-card class="ui-content">
                  <div>
                    <button v-on:click="removeAllMarkersFromMap">
                      Remove markers
                    </button>
                  </div>
                  <div id="geocoder"></div>
                  <!-- <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
            <b-collapse id="collapse-1-inner" class="mt-2">
              <b-card>Hello!</b-card>
            </b-collapse> -->

                  <form id="params">
                    <h4 class="txt-m txt-bold mb6">Chose travel mode:</h4>
                    <div class="mb12 mr12 toggle-group align-center">
                      <label class="toggle-container">
                        <input name="profile" type="radio" value="walking" />
                        <div class="toggle toggle--active-null toggle--null">
                          <font-awesome-icon :icon="['fas', 'walking']" />
                        </div>
                      </label>
                      <label class="toggle-container">
                        <input
                          name="profile"
                          type="radio"
                          value="cycling"
                          checked
                        />
                        <div class="toggle toggle--active-null toggle--null">
                          <font-awesome-icon :icon="['fas', 'biking']" />
                        </div>
                      </label>
                      <label class="toggle-container">
                        <input name="profile" type="radio" value="driving" />
                        <div class="toggle toggle--active-null toggle--null">
                          <font-awesome-icon :icon="['fas', 'car']" />
                        </div>
                      </label>
                    </div>
                    <h4 class="txt-m txt-bold mb6">
                      Chose maximum duration:
                    </h4>
                    <div class="mb12 mr12 toggle-group align-center">
                      <label class="toggle-container">
                        <input
                          name="duration"
                          type="radio"
                          value="15"
                          checked
                        />
                        <div class="toggle toggle--active-null toggle--null">
                          15 min
                        </div>
                      </label>
                      <label class="toggle-container">
                        <input name="duration" type="radio" value="30" />
                        <div class="toggle toggle--active-null toggle--null">
                          30 min
                        </div>
                      </label>
                      <label class="toggle-container">
                        <input name="duration" type="radio" value="45" />
                        <div class="toggle toggle--active-null toggle--null">
                          45 min
                        </div>
                      </label>
                      <label class="toggle-container">
                        <input name="duration" type="radio" value="60" />
                        <div class="toggle toggle--active-null toggle--null">
                          60 min
                        </div>
                      </label>
                    </div>
                  </form>
                </b-card>
              </b-collapse>
            </b-col>

            <b-col class="pt-3" sm="2">
              <b-button v-b-toggle.collapse-1 variant="info" size="sm">
                <span class="when-opened">Close</span>
                <span class="when-closed">Open</span> Menu
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}

.loader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.5);
}

.map {
  width: 100%;
  height: 100%;
  position: absolute;
}

.ui {
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 200px;
}

.ui-widget {
  width: 100%;
}

.ui-content {
  background-color: #fff;
  width: 100%;
  align-self: right;
}

.marker-container {
  cursor: pointer;
  width: 80px;
  text-align: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;

  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  justify-content: center;

  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;

  flex-direction: column;
}
.marker-symbol {
  background-size: cover;
  width: 60px;
  height: 60px;
  display: block;
  text-align: center;
}
.marker-text {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  // -webkit-text-stroke: 1px #fff;
  text-shadow: 1px 1px 0 #fff;
}
.marker-attr {
  font-size: 12px;
  font-weight: normal;
  color: #000;
}
.selected-marker {
  background-color: #f86767;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  border: 3px solid #fff;
  cursor: pointer;
}
.marker {
  //background-image: url("~assets/custom_marker.png");
  background-image: url("https://www.yr.no/grafikk/sym/v2017/symbol_background_pin.svg");
  background-size: cover;
  width: 60px;
  height: 60px;
  display: block;
  cursor: pointer;
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
import axios from "axios";

export default {
  name: "MapBox",
  props: {
    center: Array,
    marker: Object
  },
  data: function() {
    return {
      map: null,
      geocoder: null,
      data: null,
      token:
        "pk.eyJ1IjoiaGF2YXJkbCIsImEiOiJtSTFleXg4In0.bCnuP121PLOPrqhdwUwYDA",
      selectedCoordinates: [],
      selectedMarker: Object,
      selectedName: "",
      selectedDistance: 0,
      selectedDuration: 0,
      profile: "cycling",
      minutes: 15,
      allMarkers: [],
      allPoints: [],
      clusteredPoints: [],
      userAddedPoints: [],
      flying: false,
      loading: true
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
      this.addSelectedLocation();
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
        // Settings from: https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md
        accessToken: this.token,
        flyTo: false,
        marker: false,
        mapboxgl: window.mapboxgl,
        placeholder: "Søk etter sted",
        collapsed: true,
        countries: "NO,DK,SE"
      });
      //this.map.addControl(this.geocoder);
      document
        .getElementById("geocoder")
        .appendChild(this.geocoder.onAdd(this.map));

      this.map.on("load", () => {
        this.addIsoUI();
        this.addIsoLayer();
      });
      this.map.on("style.load", () => {
        let self = this;
        const waiting = () => {
          if (!self.map.isStyleLoaded()) {
            self.stillLoading();
            setTimeout(waiting, 200);
          } else {
            //loadMyLayers();
            self.finishedLoading();
            self.loading = false;
          }
        };
        waiting();
      });
      // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
      this.map.on("click", function(e) {
        // var features = self.map.queryRenderedFeatures(e.point);

        // // Limit the number of properties we're displaying for
        // // legibility and performance
        // var displayProperties = [
        //   "type",
        //   "properties",
        //   "id",
        //   "layer",
        //   "source",
        //   "sourceLayer",
        //   "state"
        // ];

        // var displayFeatures = features.map(function(feat) {
        //   var displayFeat = {};
        //   displayProperties.forEach(function(prop) {
        //     displayFeat[prop] = feat[prop];
        //   });
        //   return displayFeat;
        // });
        // console.log(displayFeatures)

        let clickedCoords = [e.lngLat.lng, e.lngLat.lat];
        let outsideBounds = true;
        let allReleventPoints = self.clusteredPoints
          .concat(turf.point(self.selectedCoordinates))
          .concat(self.userAddedPoints);
        for (let existingPoint of allReleventPoints) {
          let distance = turf.distance(
            turf.point(clickedCoords),
            existingPoint,
            { units: "kilometers" }
          );
          if (distance <= 0.5) {
            outsideBounds = false;
            break;
          }
        }
        if (outsideBounds) {
          // If the clicked point is outside the radius of .5 km from other markers, add it with directions:
          self.getPointWeather(clickedCoords, true);
        }
      });
      this.map.on("flystart", function() {
        self.flying = true;
      });
      this.map.on("flyend", function() {
        self.flying = false;
      });
      this.map.on("moveend", function() {
        console.log("Stopped moving");
      });
      this.geocoder.on("result", function(result) {
        // Fired when the geocoder returns a selected result
        // https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md#on
        self.getWeather(result);
      });
    },
    addIsoUI() {
      let self = this;
      let params = document.getElementById("params");
      params.addEventListener("change", function(e) {
        //self.removeAllMarkersFromMap();
        if (e.target.name === "profile") {
          self.profile = e.target.value;
        } else if (e.target.name === "duration") {
          self.minutes = e.target.value;
        }
        if (self.selectedName != "") {
          console.log("get iso");
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

      this.map.addSource("iso_tess", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });
      this.map.addLayer(
        {
          id: "isoTessLayer",
          type: "fill",
          source: "iso_tess",
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
    addInteractive() {
      // set layer visibility
      // turn off interactivity
      this.map.scrollZoom.enable();
      this.map.boxZoom.enable();
      this.map.dragRotate.enable();
      this.map.dragPan.enable();
      this.map.keyboard.enable();
      this.map.doubleClickZoom.enable();
      this.map.touchZoomRotate.enable();
    },    
    addSelectedLocation() {
      let self = this;
      var el = document.createElement("div");
      el.className = "selected-marker";

      // make a marker for each feature and add it to the map
      let selected_marker = new window.mapboxgl.Marker(el)
        .setLngLat(this.selectedCoordinates)
        .setPopup(
          new window.mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              "<h5>Sted: " +
                this.selectedName +
                "</h5>" +
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
      this.selectedMarker = selected_marker;
    },
    getMetWeatherIcon(symbol_id, night = 0, type = "svg") {
      // Build the url we need to get a specific weather icon
      let base_url = "https://api.met.no/weatherapi/weathericon/1.1/?";
      let content_type_png = "&content_type=image/png";
      let content_type_svg = "&content_type=image/svg%2Bxml";
      let url = base_url + "symbol=" + symbol_id + "&is_night=" + night;
      if (type === "svg") {
        url = url + content_type_svg;
      } else {
        url = url + content_type_png;
      }
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
    async getMetWeatherForecast(coordinates) {
      let self = this;
      let lng = coordinates[0];
      let lat = coordinates[1];

      let base_url = "https://api.met.no/weatherapi/locationforecast/1.9/?";
      let url = base_url + "lat=" + lat + "&lon=" + lng;

      // Convert XML to JS object
      let parseString = require("xml2js").parseString;
      const res = await axios.get(url).then(response => {
        parseString(response.data, (err, result) => {
          if (err) {
            console.log("Error fetching data:", err);
          } else {
            self.data = self.getData(result);
          }
        });
      });
    },
    async getPointWeather(coordinates, get_directions = false) {
      let self = this;
      let lng = coordinates[0];
      let lat = coordinates[1];

      let base_url = "https://api.met.no/weatherapi/locationforecast/1.9/?";
      let url = base_url + "lat=" + lat + "&lon=" + lng;
      //console.log(url);

      // Convert XML to JS object
      let parseString = require("xml2js").parseString;
      let res = await axios.get(url).then(response => {
        parseString(response.data, (err, result) => {
          if (err) {
            console.log("Error fetching data:", err);
          } else {
            let weather = self.getData(result);
            self.addWeatherMarkerToMap(coordinates, weather);
            if (get_directions) {
              self.addDirectionRouteToMap(coordinates);
            }
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

      // Get the prediction where the current time is within the 6 hrs timeframe:
      let current_time = this.shittyTimeRounder(new Date()).getTime();
      let forecasts = symbolWeaterData.filter(forecast =>
        forecast
          ? new Date(forecast.from).getTime() <= current_time &&
            new Date(forecast.to).getTime() >= current_time
          : false
      );

      // If the time is before the first forecast, just show the first one:
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

      //console.log(query);
      const res = await axios
        .get(query)
        .then(response => {
          console.log(response);
          // Add isochrones:
          self.map.getSource("iso").setData(response.data);
          let coordinates = response.data.features[0].geometry.coordinates[0];

          // Polygon to linestring - use this for along side and calculations on the markers
          let poly = turf.polygon([coordinates]);
          let line = turf.polygonToLine(poly);
          line = turf.lineString(line.geometry.coordinates);

          // // Create tesselate within polygon
          // let tess = turf.tesselate(poly);
          // // Add tesselate:
          // self.map.getSource("iso_tess").setData(tess);
          // console.log(self.map.getSource("iso_tess"));

          // Add points along the edge of the shape
          let distance = 1;
          let length = turf.lineDistance(line, { units: "kilometers" });
          for (let i = 1; i <= length / distance; i++) {
            let point = turf.along(line, i * distance, {
              units: "kilometers"
            });
            //self.addMarkerToMap(point.geometry.coordinates);
            self.allPoints.push(point);
          }

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
          let extent = [lon_min, lat_min, lon_max, lat_max];

          let bounds = coordinates.reduce(function(bounds, coord) {
            return bounds.extend(coord);
          }, new window.mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

          let cellSide = 0.5;
          let options = { units: "kilometers" };
          let grid = turf.pointGrid(extent, cellSide, options);

          // // Check if the points are within the actual polygon:
          // let pt = turf.point(this.selectedCoordinates);
          // var poly = turf.polygon([coordinates]);
          // let check = turf.booleanPointInPolygon(pt, poly);

          // Filter out points outside our polygon
          let scaledPoly = turf.transformScale(poly, 0.5);
          let grid_within = grid.features.filter(point =>
            point
              ? turf.booleanPointInPolygon(
                  turf.point(point.geometry.coordinates),
                  poly
                ) &&
                !turf.booleanPointInPolygon(
                  turf.point(point.geometry.coordinates),
                  scaledPoly
                )
              : false
          );

          // Add markers to map
          grid_within.forEach(function(marker) {
            //self.addMarkerToMap(marker.geometry.coordinates);
            self.allPoints.push(turf.point(marker.geometry.coordinates));
          });
          self.map.fitBounds(bounds, {
            padding: { top: 25, bottom: 25, left: 200, right: 25 }
          });

          // Create clusters from the grid points
          var clustered = turf.clustersKmeans(
            turf.featureCollection(self.allPoints),
            { numberOfClusters: 20 }
          );

          // Iterate over each cluster
          turf.clusterEach(clustered, "cluster", function(
            cluster,
            clusterValue,
            currentIndex
          ) {
            let clusterCenter = turf.center(cluster);
            if (
              turf.booleanPointInPolygon(
                turf.point(clusterCenter.geometry.coordinates),
                poly
              )
            ) {
              self.clusteredPoints.push(clusterCenter);
              //self.addMarkerToMap(clusterCenter.geometry.coordinates);
              // Get weather for the center of the cluster and add icon to the map:
              self.getPointWeather(clusterCenter.geometry.coordinates, false);
            }
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
    },
    addMarkerToMap(coordinates) {
      // Add a marker without popup to the map
      let self = this;
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add to the map
      let new_marker = new window.mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .addTo(self.map);
      self.allMarkers.push(new_marker);
    },
    addWeatherMarkerToMap(coordinates, data) {
      // Add a weather marker after clicking on the map

      let self = this;
      // create a HTML element for each feature
      let el = document.createElement("div");
      el.className = "marker-container";
      let lng = coordinates[0];
      let lat = coordinates[1];
      el.dataset.lng = lng;
      el.dataset.lat = lat;
      el.addEventListener("click", function(e) {
        let clickedCoords = [
          parseFloat(e.target.attributes["data-lng"].value),
          parseFloat(e.target.attributes["data-lat"].value)
        ];
        self.addDirectionRouteToMap(clickedCoords);
      });

      let marker_symbol = document.createElement("div");
      marker_symbol.className = "marker-symbol";
      let symbol = self.getMetWeatherIcon(data.symbol.number);
      marker_symbol.style.backgroundImage = "url(" + symbol + ")";
      marker_symbol.dataset.lng = lng;
      marker_symbol.dataset.lat = lat;
      el.appendChild(marker_symbol);

      let marker_text = document.createElement("div");
      marker_text.className = "marker-text";
      marker_text.dataset.lng = lng;
      marker_text.dataset.lat = lat;
      el.appendChild(marker_text);

      let marker_attr = document.createElement("div");
      marker_attr.className = "marker-attr";
      marker_attr.dataset.lng = lng;
      marker_attr.dataset.lat = lat;
      el.appendChild(marker_attr);

      // Get the place name using MapBox's reverese geocoder
      let place = this.getNamedPlace(coordinates).then(function(res) {
        marker_text.innerHTML = res.data.features[1].text;
        marker_attr.innerHTML =
          data.minTemperature.value +
          " - " +
          data.maxTemperature.value +
          "&#176;";

        // make a marker for each feature and add to the map
        let new_marker = new window.mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(
            new window.mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h5>" +
                  res.data.features[0].text +
                  ", " +
                  res.data.features[1].text +
                  "</h5>" +
                  "<p><b>Temp (celsius)</b>: mellom " +
                  data.minTemperature.value +
                  " og " +
                  data.maxTemperature.value +
                  "</p>" +
                  "<p><b>Nedbør (mm):</b> mellom " +
                  data.precipitation.minvalue +
                  " og " +
                  data.precipitation.maxvalue +
                  "</p>"
              )
          )
          .addTo(self.map);
        self.allMarkers.push(new_marker);
        self.userAddedPoints.push(turf.point(coordinates));
      });
    },
    addDirectionRouteToMap(coordinates) {
      let self = this;
      let directions = this.getDirections(coordinates).then(function(result) {
        console.log(result);
        self.selectedDistance = result.routes[0].distance * 0.001; // convert to km
        self.selectedDuration = result.routes[0].duration / 60; // convert to minutes

        // add results to info box
        // document.getElementById("calculated-line").innerHTML =
        //   "Distance: " +
        //   distance.toFixed(2) +
        //   " km<br>Duration: " +
        //   duration.toFixed(2) +
        //   " minutes";
        self.addRoute(result.routes[0].geometry);
      });
    },
    removeAllMarkersFromMap() {
      // remove all added markers
      if (this.allMarkers !== null) {
        for (let i = this.allMarkers.length - 1; i >= 0; i--) {
          this.allMarkers[i].remove();
        }
      }
    },
    async getNamedPlace(coordinates) {
      // Get the name (address + place) of specific coordinates
      let self = this;
      let lng = coordinates[0];
      let lat = coordinates[1];

      let base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
      let url =
        base_url +
        lng +
        "," +
        lat +
        ".json" +
        "?types=address,place" +
        "&access_token=" +
        this.token;
      //console.log(url);
      let res = await axios.get(url).then(response => {
        return response;
      });
      return res;
    },
    async getDirections(coordinates) {
      // Get directions from the selected spot to a given set of coordinates
      let self = this;
      let lng = coordinates[0];
      let lat = coordinates[1];

      let base_url = "https://api.mapbox.com/directions/v5/mapbox/";
      let url =
        base_url +
        this.profile +
        "/" +
        this.selectedCoordinates[0] +
        "," +
        this.selectedCoordinates[1] +
        ";" +
        lng +
        "," +
        lat +
        "?geometries=geojson" +
        "&overview=full" +
        "&access_token=" +
        this.token;
      console.log(url);

      let res = await axios
        .get(url)
        .then(response => {
          if (response.data.code === "Ok") {
            return response.data;
          } else {
            console.log(
              "We got a different code returned: ",
              response.data.code
            );
            console.log(response);
          }
        })
        .catch(e => {
          console.log("error", e);
          //error({ statusCode: 401, message: "Post not found" });
        });
      return res;
    },
    addRoute(coords) {
      // Remove, then re-add the layer:
      this.removeRoute();
      this.map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: coords
          }
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#3b9ddd",
          "line-width": 8,
          "line-opacity": 0.8
        }
      });
    },
    removeRoute() {
      if (this.map.getSource("route")) {
        this.map.removeLayer("route");
        this.map.removeSource("route");
      } else {
        return;
      }
    },
    stillLoading() {
      this.removeInteractive()
    },
    finishedLoading() {
      this.addInteractive()
    }
  }
};
</script>
