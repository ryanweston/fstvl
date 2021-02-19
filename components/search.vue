<template>
    <div>
        <form :class="['search', { 'color': this.$route.path !== '/'}]" @submit.prevent="submit"> 
            <input 
                type="text" 
                placeholder="enter your postcode"
                v-model="postcode"
                class="text-search"
                />
            <div class="overlay-search">
            <div class="radius-search">
                <h3><span>Within</span><br>
                {{ range }} miles
                </h3>
                <button v-on:click="handleDropdown" type="button">
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
    </div>
</template>

<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
          dropdown: false,
    }
  },
  computed: {
    range:  {
      set(range) {
        this.$store.commit('setSearchRange', range)
      }, 
      get() {
        return this.$store.state.search.range
      }
    }, 
    postcode: {
      set(postcode) {
        this.$store.commit('setSearchPostcode', postcode)
      }, 
      get() {
        return this.$store.state.search.postcode
      }
    }
  },
  methods: {
    submit: async function() {
      console.log('SUBMIT CALLED')
       await this.$store.dispatch('getLocation')
       await this.$store.dispatch('getResults')
       if (this.$store.state.results) {
        this.$router.push('results')
       }
    },
    handleDropdown: function() {
      this.dropdown = !this.dropdown;
    }
  }
})
</script>

<style>
.search {
  width:65%;
  height:auto;
  position: relative;
  box-sizing: border-box;
}
.color .text-search {
  background-color:white!important;
}
.text-search {
  width:100%;
  border:4px solid #000000;
  outline:none;
  padding:20px;
  border-radius:40px;
  font-size:1.3em;
  text-transform: uppercase;
  background-color:transparent;
  -webkit-appearance:none;
}
.overlay-search {
  display:flex;
  justify-content: center;
  height:100%;
  position:absolute;
  top:0px;
  right:20px;
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
</style>