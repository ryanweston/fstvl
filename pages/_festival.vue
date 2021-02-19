<template>
    <div v-if="currentFest" class="festival">
        <button @click.prevent="handleRouteBack()">BACK TO RESULTS</button>
        <h1>{{ currentFest.eventname }}</h1>
        <!-- <section> -->
            <!-- <h3>Information</h3> -->
            <!-- <p class="date">Date: {{currentFest.date}}</p>
            <br> -->

            <!-- <p class="desc">{{ currentFest.description }}</p> -->
        <!-- </section> -->
        <section>
            <div v-if="currentFest.genres" class="genres">
                <div :key="genre.genreId" v-for="genre in currentFest.genres">
                    <h3> {{ genre.name }}</h3>
                </div>
            </div>
        </section>
        <section>
            <div v-if="currentFest.artists" class="artists">
                <!-- <h3>Artists</h3> -->
                <div :key="person.artistid" v-for="person in currentFest.artists">
                    <img :src="person.image">
                    <!-- <p>{{ person.name }}</p> -->
                </div>
            </div>
        </section>
        <section>
             <!-- <h3>Location</h3> -->
            <BaseMap :location="currentFest.venue"/>
        </section>
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

    handleRouteBack () {
        this.$router.push({ path: '/results'})
    }
}
</script>

<style scoped>
section {
    margin-top:55px;
}
.artists {
    width:92%;
}
.artists > div, .genres > div {
    display: inline-block;
}
.genres {
    background-color:black;
    color:white;
    /* border-top:4px solid black;
    border-bottom:4px solid black; */
    padding: 20px 30px;
    width:90%;
}
.genres h3 {
    margin-bottom:0px;
    font-weight:900;
    font-size:2em;
}
.genres > div { 
    padding-right:30px;
}
.festival {
    max-width:90%;
    padding-bottom:10%;
}
.festival .desc {
    font-size: 1.6em;
    max-width:90%;
}

section h3 {
    font-size: 3em;
    margin-bottom: 35px;
    text-transform: uppercase;
}
.festival button {
    margin-bottom:80px;
    z-index:4;
    /* padding:20px; */
    border-radius:40px;
    /* border:4px solid black; */
    font-weight:900;
}
.festival h1 {
    font-size:9em;
    text-transform: uppercase;
}
.festival img { 
    margin-right:10px;
    border-radius:50%;
    width:100px;
    height:100px;
}
</style>