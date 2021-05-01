<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1Ijoicnlhbndlc3RvbiIsImEiOiJjazY3dng2bWgwbG4yM2RwNnF5cmZ5MnVhIn0.vBn5R-ZadXM5_GwaUIqHIQ',
    };
  },
  props: {
    location: Object
  },
  mounted() {
      console.log(this.location)
      mapboxgl.accessToken = this.accessToken;

  const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/ryanweston/cklbf68g007a617lcbul6ao70",
      center: [this.location.longitude, this.location.latitude],
      zoom: 10,
      // maxBounds: [
      //   [103.6, 1.1704753],
      //   [104.1, 1.4754753],
      // ],
    });

    // const nav = new mapboxgl.NavigationControl();
    // map.addControl(nav, "top-right");

  new mapboxgl.Marker()
  .setLngLat([this.location.longitude, this.location.latitude])
  .addTo(map);
  },
};
</script>

<style scoped>
.basemap {
  min-height: 400px;
  /* border:4px solid black; */
}
</style>