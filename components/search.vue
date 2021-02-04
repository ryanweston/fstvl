<template>
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
                    max="600"
                    v-model="range"
                    class="radius-search"
                    />
            </div>
            <button type="submit">
                <span class="iconify" data-inline="false" data-icon="bx:bx-search" style="font-size: 36px;"></span>
            </button>
            </div>
            </form>
            <div class="results" v-if="eventsTruth">
            <h3>Results</h3>
            <div v-for="item in events" :key="item.eventname">{{ item.eventname }}</div>
        </div>
        <div class="credits">
            <h3>A PROJECT BY <a>@RYNWSTN</a></h3>
        </div>
    </div>
</template>

<script lang="ts">

import Vue from 'vue'
import axios from 'axios';

export default Vue.extend({
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
  mounted() {
    this.submit()
  },
  methods: {
    submit: function() {
        this.$store.dispatch('search', 'cool')
    },
    convertPostcode: async function() {
       if (this.query) {
        try {
          let response = await axios.get('https://api.postcodes.io/postcodes/' + this.query)
          let lat = response.data.result.latitude;
          let lng = response.data.result.longitude;
          this.getEvents(lat, lng);
        } catch(error) {
          console.log('Error fetching geolocation');
        }
      }
    },
    getEvents: async function(lat: number, lng: number) {
      try {
        const range = this.range > 600 ? this.range = 600 : this.range
        let body = { lat: lat, lng: lng, range: range };
        let response = await axios.post('/api/events', body);
        this.events = response.data.events.results;
        console.log(this.events)
        this.eventsTruth = true;
      } catch(error) {
          console.log('Error fetching data from Skiddle API');
          console.log(error);
      }
    }, 
    handleDropdown: function() {
      this.dropdown = !this.dropdown;
    }
    // IMPLEMENT SECOND LAYOUT FOR RESULTS AND FESTIVALS

    //IF SEARCH STATE IS EQUAL TO SEARCH PARAM
    //DONT DISPATCH GET POSTCODE AND SEARCH WITH SAME
  }
})
</script>