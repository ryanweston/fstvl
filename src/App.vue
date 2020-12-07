<template>
  <div id="app">
    <div class="container">
      <h1>FIND FESTIVALS NEAREST TO YOU</h1>

      <div class="search">
        <input 
              type="text" 
              placeholder="Search..."
              v-model="query"
              @keypress="convertPostcode"
              class="text-search"
            />
        <input 
              type="range"
              min="0"
              max="100"
              v-model="range"
              class="radius-search"
              />
        <p>Range: {{ range }}</p>
        </div>
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <h3>Results</h3>
        <div v-for="item in events" :key="item.eventname">{{ item.eventname }}</div>
    </div>

    <footer>

    </footer>
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
    convertPostcode: async function(e) {
      if (e.key == "Enter" && this.query) {
        try {
          let response = await axios.get('https://api.postcodes.io/postcodes/' + this.query)
          this.geoloc.lat = response.data.result.latitude;
          this.geoloc.lng = response.data.result.longitude;
          this.getEvents(this.geoloc);
        } catch(error) {
          console.log('Error fetching geolocation data');
          this.error = error;
        }
      }
    },
    getEvents: async function(geoloc) {
      try {
        let response = await axios.get('https://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.VUE_APP_API_KEY + '&latitude=' + geoloc.lat +'&longitude=' + geoloc.lng + '&radius=' + this.range + '&eventcode=FEST&order=distance&description=1')
        this.events = response.data.results;
      } catch(error) {
        console.log('Error fetching data from Skiddle API');
        this.error = error;
      }
    }
  }
}
</script>

<style>
@font-face {
  font-family: Viga;
  src: url('./assets/fonts/Viga-Regular.ttf');
}
body {
  font-family: Viga;
  margin:0px;
  overflow:hidden;
}
.container {
  padding:5%;
  box-sizing: border-box;
}
h1 {
  font-size:8.5em;
  line-height:92%;  
  margin-bottom:0px;
}
.search {
  width:65%;
  height:auto;
  position: relative;
  box-sizing: border-box;
}
.text-search {
  width:100%;
  border:4px solid #000000;
  outline:none;
  padding:20px;
  background:transparent;
}
.radius-search {
  position:absolute;
  top:0px;
  right:0px;
}
.circle-1, .circle-2{
  position:absolute;
  width: 718px;
  height: 718px;
  border-radius:50%;
}
.circle-1 {
  top:0px;
  right:0px;
  background: rgba(235, 255, 0, 0.58);
  z-index:-1;
  transform: translate(-15%, -15%);
  -webkit-transform: translate(-15%, -15%);
  -moz-transform: translate(-15%, -15%);
  -o-transform: translate(-15%, -15%); 
}
.circle-2 {
  bottom:0px;
  right:0px;
  z-index:-2;
  background: rgba(251, 156, 14, 0.58);
  transform: translate(25%, 25%);
  -webkit-transform: translate(25%, 25%);
  -moz-transform: translate(25%, 25%);
  -o-transform: translate(25%, 25%); 
}
footer {
  position:absolute;
  bottom:0px;
  width:100%;
  border-top:4px solid #000000;
  height:100px;
}
</style>
