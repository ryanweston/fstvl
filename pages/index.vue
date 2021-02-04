<template>
 <section class="container">
    <h1>FIND FESTIVALS NEAREST TO YOU</h1>

          <Search/>

      <div class="circle-1"></div>
      <div class="circle-2"></div>
     
  </section>
</template>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
  name: 'App',
})
</script>

<style>

body {
  font-family: work-sans;
  margin:0px;
  overflow:hidden;
}
.container {
  width:100vw;
  height:100vh;
  padding:10% 5%;
  box-sizing: border-box;
}
h1 {
  font-size:8.7em;
  line-height:81%;  
  margin-bottom:20px;
  font-weight:800;
}
.search {
  width:65%;
  height:auto;
  position: relative;
  box-sizing: border-box;
}
.text-search {
  width:100%;
  border:4px solid #000000;
  outline:none;
  padding:20px;
  font-size:1.3em;
  text-transform: uppercase;
  background-color:transparent!important;
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
button {
  outline:0;
  background-color:transparent;
  border:0px;
}
button:hover {
  cursor:pointer;
}
.results {
  margin-top:20px;
}
.results h3{
  margin-bottom:5px;
}
.circle-1, .circle-2{
  position:absolute;
  width: 718px;
  height: 718px;
  border-radius:50%;
}
.circle-1 {
  top:0px;
  right:0px;
  background: rgba(235, 255, 0, 0.65);
  z-index:-1;
  -webkit-transform: translate(-15%, -15%);
  -moz-transform: translate(-15%, -15%);
  -o-transform: translate(-15%, -15%); 
  transform: translate(-15%, -15%);
}
.circle-2 {
  bottom:0px;
  right:0px;
  z-index:-2;
  background: rgba(251, 156, 14, 0.65);
  -webkit-transform: translate(25%, 25%);
  -moz-transform: translate(25%, 25%);
  -o-transform: translate(25%, 25%); 
  transform: translate(25%, 25%);
}
.credits {
  font-size:0.8em;
  position: absolute;
  bottom:20px;
  right:20px;
}
footer {
  position:absolute;
  bottom:0px;
  left:0px;
  width:100%;
  border-top:4px solid #000000;
  height:100px;
}
footer ul {
  padding:0px;
  margin:0px;
}
footer ul li {
  margin-left:15px;
}
</style>
