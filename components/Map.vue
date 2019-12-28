<template>
  <div>
    <h1>Test</h1>
    <div :id="mapId" class="map" ref="map"></div>
  </div>
</template>

<style lang="scss">
.marker {
  background-image: url("/img/custom_marker.png");
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
}
.mapboxgl-popup-content {
  text-align: center;
  font-family: "Open Sans", sans-serif;
}
</style>

<script>
export default {
  name: "map",
  components: {},
  props: {
    geojson: {
      type: Object
    },
    marker: {},
    mapId: String,
    center: Array
  },
  data: function() {
    return {
      map: null,
      token: "pk.eyJ1IjoiaGF2YXJkbCIsImEiOiJtSTFleXg4In0.bCnuP121PLOPrqhdwUwYDA"
    };
  },
  mounted() {
    window.mapboxgl = require("mapbox-gl");
    this.renderMap();
  },
  methods: {
    renderMap() {
      const mapOptions = {
        container: this.mapId,
        style: "mapbox://styles/mapbox/light-v10",
        center: this.center,
        // [12.525594, 55.707385],
        zoom: 12,
        accessToken: this.token,
        attributionControl: false
      };
      const map = (this.map = new window.mapboxgl.Map(mapOptions));
      map.on("load", () => {
        this.removeInteractive();
        //this.addMarkers();
      });
      //map.scrollZoom.disable();
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
      // add markers to map
      this.marker.features.forEach(function(marker) {
        //console.log(marker);
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker";

        // make a marker for each feature and add it to the map
        new window.mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new window.mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.properties.title +
                  "</h3><p>" +
                  marker.properties.description +
                  "</p>"
              )
          )
          .addTo(self.map);
      });
    }
  }
};
</script>
