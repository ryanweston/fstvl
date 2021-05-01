<template>
    <div>
        <div class="search-contain">
            <Search />
        </div>
        <div class="results">
            <div class="item" v-for="item in results" @click="handleRoute(item)" v-bind:key="item.id">
                <div class="details">
                    <!-- <div :key="genre.genreId" v-for="genre in item.genres">
                        <h3> {{ genre.name }}</h3>
                    </div> -->
                    <p class="genre" :key="genre.genreId" v-for="genre in item.genres">
                        {{ genre.name }}
                    </p>
                    <!-- <p> {{ item.date}} </p> -->
                </div>
                <h2> {{ item.eventname }} </h2>
            </div>
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
       console.log(this.results)
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

<style >
.details { 
    margin-bottom:1em;
}
.item .details > * { 
    display:inline-block;
}
.genre { 
    margin-right:1em;
    /* background-color:black; */
    padding:15px;
    border:3px solid black;
    border-radius:40px;
    text-transform: uppercase;
    /* color:white; */
    font-weight:700;
}
.results {
  margin-top:150px;
  padding-right:15%;
  padding-left:0%;
}
.results h2{
  font-size:7em;
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
.item {
    margin-top:30px;
}
</style>