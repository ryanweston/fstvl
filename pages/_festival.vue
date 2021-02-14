<template>
    <div v-if="currentFest" class="festival">
        <button @click.prevent="handleRouteBack()">BACK</button>
        <h1>{{ currentFest.eventname }}</h1>
        <p>{{ currentFest.description }}</p>
        <br>
        <h3>Artists</h3>
        <div :key="person.artistid" v-for="person in currentFest.artists">
            <img :src="person.image">
            {{ person.name }}
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'

@Component({
    name: 'Festival', 
    layout: 'page'
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

<style>
.festival button {
    margin-bottom:20px;
    z-index:4;
}
.festival h1 {
    text-transform: uppercase;
}
.festival img { 
    border-radius:50%;
    width:50px;
    height:auto;
}
</style>