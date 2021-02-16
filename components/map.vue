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
  mounted() {
      console.log('MOUNTED')
      mapboxgl.accessToken = this.accessToken;

  const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [103.811279, 1.345399],
      zoom: 12,
      maxBounds: [
        [103.6, 1.1704753],
        [104.1, 1.4754753],
      ],
    });

    // const nav = new mapboxgl.NavigationControl();
    // map.addControl(nav, "top-right");

  new mapboxgl.Marker()
  .setLngLat([103.811279, 1.345399])
  .addTo(map);
  },
};
</script>

<style scoped>
.basemap {
  width: 90%;
  min-height: 400px;
}
</style>