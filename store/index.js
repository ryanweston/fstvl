import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export const state = () => ({
    results: [],
    search: '',
    postcode: '',
    range: ''
  })
  
export const mutations = {
    setSearch(search) {
        state.search = search
    },
    setRange(range) {
        state.range = range
    },
    setPostcode(postcode) {
        state.postcode = postcode
    },
    setResults(results) {
        state.results = results
    },
}

export const actions = {
    getPostcode({ commit },cool) {
        console.log(cool)
    },
    getResults({ commit, state },cool) {
        //IF STATE SEARCH IS EQUAL TO SEARCH PARAM
        //DONT DISPATCH GET POSTCODE AND SEARCH WITH 
        if (state.postcode === state.search)
        console.log(cool)
    }
}