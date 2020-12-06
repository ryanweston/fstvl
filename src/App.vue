<template>
  <div id="app">
   <h1>Festivals Near You</h1>
    <input 
          type="text" 
          placeholder="Search..."
          v-model="query"
          @keypress="convertPostcode"
        />
    <input 
          type="range"
          min="0"
          max="100"
          v-model="range"
          />
    <p>Range: {{ range }}</p>
    <h3>Results</h3>
    <div v-for="item in events" :key="item.eventname">{{ item.eventname }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      apiKey: process.env.VUE_APP_API_KEY,
      events: {},
      geoloc: { lng: null, lat: null },
      error: '',
      query: '',
      range: 5,
    }
  },
  methods: {
    convertPostcode: function(e) {
      if (e.key == "Enter" && this.query) {
         axios
          .get('https://api.postcodes.io/postcodes/' + this.query)
          .then(response => {
            this.geoloc.lat = response.data.result.latitude;
            this.geoloc.lng = response.data.result.longitude;
            this.getEvents(this.geoloc);
          })
          .catch(error => {
            console.log('Error' + error)
            this.error = error;
          })
      }
    },
    getEvents: function(geoloc) {
    console.log(geoloc);
      axios
      .get('https://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.VUE_APP_API_KEY + '&latitude=' + geoloc.lat +'&longitude=' + geoloc.lng + '&radius=' + this.range + '&eventcode=FEST&order=distance&description=1')
      .then(response => {
        this.events = response.data.results;
      })
      .catch(error => {
        console.log('Error' + error)
        this.error = error;
      })
    }
  }
}


</script>

<style>

</style>
