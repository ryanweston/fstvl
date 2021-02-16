import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex)

export const state = () => ({
    results: [],
    location: '',
    postcode: '',
    search: {
        postcode: '',
        range: 20
    },
    currentFestival: null
  })
  
export const mutations = {
    currentFest(state, festival) {
        console.log(festival)
        state.currentFestival = festival
    },
    setSearchRange(state, range) {
        state.search.range = range
    },
    setSearchPostcode(state, query) {
        state.search.postcode = query
    },
    setLocation(state, location) {
        state.location = location
    },
    setResults(state, results) {
        state.results = results
    },
}

export const actions = {
    async getLocation({ commit, state }) {
        if (state.search.range && state.search.postcode) {
            try {
              let response = await axios.get('https://api.postcodes.io/postcodes/' + state.search.postcode)
              const lat = response.data.result.latitude;
              const lng = response.data.result.longitude;
              await commit('setLocation', { lat: lat, lng: lng })
            } catch(error) {
                console.log(error)
              console.log('Error fetching geolocation');
            }
        }
    },
    async getResults({ commit, state }) {
        try {
            const range = state.search.range > 600 ? 600 : state.search.range
            let body = { lat: state.location.lat, lng: state.location.lng, range: range};
            let response = await axios.post('/api/events', body);
            console.log(range)
            await commit('setResults', response.data.events.results)
          } catch(error) {
              console.log('Error fetching data from Skiddle API');
              console.log(error);
          }
    },
    async getEvent({ commit }, id) {
        try {
            const body = { id: id }
            let response = await axios.post('/api/festival', body);
            await commit('currentFest', response.data.events.results)
          } catch(error) {
              console.log('Error fetching data from Skiddle API');
              console.log(error);
          }
    }
}