<template>
    <div>
        <div class="search-contain">
            <Search />
        </div>
        <div class="results">
            <h2 class="item" v-for="item in results" @click="handleRoute(item)" v-bind:key="item.id">
                    {{ item.eventname }}
            </h2>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import Search from '../components/search.vue'

@Component({
    name: 'Results',
    layout: 'page',
    components: {
        Search
    }
})
export default class Results extends Vue {
   @State('results') results!: any
   @Mutation('currentFest') currentFest!: any

   mounted() {
       if (!this.results.length) {
           console.log('no results')
           this.$router.push({ path: '/'})
           console.log(this.$route)
       }
   }

   async handleRoute(festival: any) {
       try {
       await this.currentFest(festival)
       this.$router.push({ path: `/${festival.id}`})
       } catch(err) {

       }
   }
 }
</script>

<style>
.results {
  margin-top:130px;
  padding-right:5%;
  padding-left:5%;
}
.results h2{
  font-size:6em;
  text-transform: uppercase;
  margin-bottom:0px;
  font-weight:900;
  line-height:90%;
  padding-bottom:30px;
  color: black;
}
.results:hover .item {
    opacity:0.5;
}
.results .item:hover {
    cursor:pointer;
    opacity:1;
}
/* .results .item:hover > .results .item{
    color:black;
    opacity: 0.5;
} */
.search-contain {
    position:fixed;
    top:3%;
    left:3%;
    width:800px;
    z-index:4;
}
</style>