<template>
  <b-container fluid class="fullsize">
    <b-row class="h-100">
      <b-col class="h-100">
        <MapBox :center="center" />
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss" scoped>
.fullsize {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
</style>

<script>
// @ is an alias to /src
import MapBox from "@/components/MapBox.vue";

export default {
  name: "home",
  components: {
    MapBox
  },
  data() {
    return {
      center: [10.39506,63.43049]
    };
  }
};
</script>
