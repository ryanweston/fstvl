<template>
 <section class="container">
    <h1>FIND 🎉 FESTIVALS NEAREST TO YOU</h1>
      <div>
        <form class="search" @submit.prevent="convertPostcode"> 
        <input 
              type="text" 
              placeholder="enter your postcode"
              v-model="query"
              class="text-search"
            />
        <div class="overlay-search">
          <div class="radius-search">
            <h3><span>Within</span><br>
              {{ range }} miles
            </h3>
            <button v-on:click="handleDropdown">
              <span class="iconify" data-inline="false" data-icon="dashicons:arrow-down-alt2" style="font-size: 25px;" ></span>
            </button>
          <input 
                v-if="dropdown"
                type="range"
                min="0"
                max="100"
                v-model="range"
                class="radius-search"
                />
          </div>
          <button type="submit">
            <span class="iconify" data-inline="false" data-icon="bx:bx-search" style="font-size: 36px;"></span>
          </button>
        </div>
        </form>
      </div>
      <div class="circle-1"></div>
      <div class="circle-2"></div>
      <div class="results" v-if="eventsTruth">
        <h3>Results</h3>
        <div v-for="item in events" :key="item.eventname">{{ item.eventname }}</div>
      </div>
  </section>
</template>

<script lang="ts">

import Vue from 'vue';
import axios from 'axios'

export default Vue.extend({
  name: 'App',
  data() {
    return {
          events: {},
          error: '',
          query: '',
          range: 5,
          dropdown: false,
          eventsTruth: false
    }
  },
  methods: {
    convertPostcode: async function() {
       if (this.query) {
        try {
          let response = await this.$axios.get('https://api.postcodes.io/postcodes/' + this.query)
          let lat = response.data.result.latitude;
          let lng = response.data.result.longitude;
          this.getEvents(lat, lng);
        } catch(error) {
          console.log('Error fetching geolocation data');
          this.error = error;
        }
      }
    },
    getEvents: async function(lat:number, lng:number) {
      try {
        let body = { lat: lat, lng: lng, range: this.range };
        let response = await axios.post('/api/events', body);
        this.events = response.data.events.results;
        this.eventsTruth = true;
      } catch(error) {
          console.log('Error fetching data from Skiddle API');
          this.error = error;
      }
    }, 
    handleDropdown: function() {
      this.dropdown = !this.dropdown;
    }
  }
})
</script>

<style>

body {
  font-family: work-sans;
  margin:0px;
  overflow:hidden;
}
.container {
  padding:5%;
  box-sizing: border-box;
}
h1 {
  font-size:8em;
  line-height:81%;  
  margin-bottom:20px;
  font-weight:800;
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
  font-size:1.3em;
  text-transform: uppercase;
  background-color:transparent!important;
  -webkit-appearance:none;
}
.overlay-search {
  display:flex;
  justify-content: center;
  height:100%;
  position:absolute;
  top:0px;
  right:0px;
}
.radius-search {
  display:flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  height:100%;
  margin-right:20px;
}
.radius-search h3, .radius-search p {
  /* margin-bottom:0px; */
  line-height:100%;
}
.radius-search span {
  font-size:0.9em;
}
button {
  outline:0;
  background-color:transparent;
  border:0px;
}
button:hover {
  cursor:pointer;
}
.results h3{
  margin-bottom:5px;
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
  background: rgba(235, 255, 0, 0.28);
  z-index:-1;
  -webkit-transform: translate(-15%, -15%);
  -moz-transform: translate(-15%, -15%);
  -o-transform: translate(-15%, -15%); 
  transform: translate(-15%, -15%);
}
.circle-2 {
  bottom:0px;
  right:0px;
  z-index:-2;
  background: rgba(251, 156, 14, 0.28);
  -webkit-transform: translate(25%, 25%);
  -moz-transform: translate(25%, 25%);
  -o-transform: translate(25%, 25%); 
  transform: translate(25%, 25%);
}
footer {
  position:absolute;
  bottom:0px;
  width:100%;
  border-top:4px solid #000000;
  height:100px;
}
</style>
