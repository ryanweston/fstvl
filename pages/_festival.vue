<template>
    <div v-if="currentFest" class="festival">
        <button class="back" @click.prevent="handleRouteBack()">BACK TO RESULTS</button>
        <div class="page">
            
            <h1>{{ currentFest.eventname }}</h1>
            <div v-if="currentFest.genres" class="genres">
                <p class="genre" :key="genre.genreId" v-for="genre in currentFest.genres"> 
                    {{ genre.name }}
                </p>
                <!-- <button class="genre button">
                    BUY A TICKET
                </button> -->
            </div>
           
            <section>
                <div class="subtitle">
                    <h3>Artists</h3>
                    <div class="divider"></div>
                </div>
                <div @mouseleave="hoverArtist(false)" @click.stop="hoverArtist(false)" class="artists">
                    <div  v-if="currentFest.artists" class="row">
                        <img @click.stop="hoverArtist(true, person)" :key="person.artistid" v-for="person in currentFest.artists" :src="person.image">
                    </div>
                    <div v-if="hoverState" class="hover"> 
                        <h3>{{ artistName.name }}</h3>
                    </div>
                </div>
            </section>
             <section>
                <div class="subtitle">
                    <h3>Description</h3>
                    <div class="divider"></div>
                </div>
                <p class="desc">{{ currentFest.description }}</p>
                    <!-- <p class="date">Date: {{currentFest.date}}</p> -->
            </section>
            <section>
                <div class="subtitle">
                    <h3>Location</h3>
                    <div class="divider"></div>
                </div>
                <BaseMap :location="currentFest.venue"/>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import BaseMap from '@/components/map.vue'
@Component({
    name: 'Festival', 
    layout: 'page',
    components: {
        BaseMap
    }
})
export default class Results extends Vue {
    @State('currentFestival') currentFest!: any
    @Action('getEvent') getEvent!: any
    
    // search for state based from festival/{param}
    // if non exists, get event based from param where param === eventId
    // todo: cache so param could == event name

    artistName: object | undefined
    hoverState = false

    mounted () {
        if (this.currentFest) {
            console.log(this.currentFest)
            console.log(this.$route.params)
        } else {
            const id = this.$route.params.festival
            this.getEvent(id)
            console.log(id)
        }
    }

    hoverArtist(hover: boolean, name?: object, ) {
        console.log('HOVER' + name + hover)
        if (name) this.artistName = name
        this.hoverState = hover
    }

    handleRouteBack () {
        this.$router.push({ path: '/results'})
    }
}
</script>

<style scoped>
.genre { 
    margin-right:1em;
    padding:15px;
    border:3px solid black;
    border-radius:40px;
    text-transform: uppercase;
    font-weight:700;
    display:inline-block;
}
.button {
    background-color:black;
    color:white;
}
.page {
   max-width:90%;
}
section {
    margin-top:50px;
    padding: 20px 0px;
}
.subtitle {
    display:flex;
    align-items: center;
    justify-content: center;
    width:100%;
    margin-bottom:3em;
}

.subtitle > * {
    display:inline-block;
}

.subtitle .divider {
    margin-left:2em;
    display:flex;
    flex:1;
    height:4px;
    border-top:4px solid black;
}

.artists {
    position: relative;
   
}
.artists .row {
    white-space: nowrap;
    overflow: scroll;
}
.hover {
    border-radius: 40px;
    width:100%;
    height:100%;
    position:absolute;
    background-color:rgba(0, 0, 0, 0.75);
    display:flex;
    justify-content: center;
    align-items: center;
    top:0px;
    left:0px;
}
.artists > img, .genres > div {
    display: inline-block;
}
.artists h3 {
    color:white;
}
.genres {
    margin-bottom:4em;
}
.genres h3 {
    margin-bottom:0px;
    font-weight:900;
    font-size:1.5em;
}
.genres > div { 
    padding-right:30px;
}
.festival {
    padding-bottom:10%;
}
.festival .desc {
    /* margin-top:1em; */
    font-size: 1.6em;
}
section h3 {
    font-size: 2em;
    text-transform: uppercase;
}
.festival .back {
    margin-bottom:80px;
    z-index:4;
    border-radius:40px;
    font-weight:900;
}
.festival h1 {
    font-size:8em;
    text-transform: uppercase;
    /* margin-bottom:0.5em; */
}
.festival img { 
    margin-right:15px;
    border-radius:50%;
    width:200px;
    height:200px;
}

.festival img:hover {
    cursor: pointer;
    border:4px solid black;
}
</style>