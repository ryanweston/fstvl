<template>
    <div v-if="currentFest" class="festival">
        <button @click.prevent="handleRouteBack()">BACK</button>
        <h1>{{ currentFest.eventname }}</h1>
        <br/>
        <!-- <section> -->
            <!-- <h3>Information</h3> -->
            <!-- <p class="date">Date: {{currentFest.date}}</p>
            <br> -->

            <p class="desc">{{ currentFest.description }}</p>
        <!-- </section> -->
        <section>
            <div v-if="currentFest.genres" class="genres">
                <div :key="genre.genreId" v-for="genre in currentFest.genres">
                    <h3> {{ genre.name }}</h3>
                    <!-- <p>{{ person.name }}</p> -->
                </div>
            </div>
        </section>
        <section>
            <div v-if="currentFest.artists" class="artists">
                <h3>Artists</h3>
                <div :key="person.artistid" v-for="person in currentFest.artists">
                    <img :src="person.image">
                    <!-- <p>{{ person.name }}</p> -->
                </div>
            </div>
        </section>
        <section>
             <h3>Location</h3>
            <BaseMap :location="venue"/>
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
    margin-top:50px;
}

.artists > div, .genres > div {
    display: inline-block;
}
.genres {
    border-top:4px solid black;
    border-bottom:4px solid black;
    padding: 10px 0px;
    width:85%;
}
.genres h3 {
    margin-bottom:0px;
    font-weight:900;
}
.genres > div { 
    padding-right:20px;
}
.festival {
    max-width:80%;
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
    margin-bottom:60px;
    z-index:4;
}
.festival h1 {
    font-size:8em;
    text-transform: uppercase;
}
.festival img { 
    margin-right:10px;
    border-radius:50%;
    width:100px;
    height:100px;
}
</style>