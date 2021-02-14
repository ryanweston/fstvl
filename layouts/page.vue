<template>
<div>
  <div class="contain">
    <Nuxt />
  </div>
  <div class="circles">
    <div class="circle-1"></div>
    <div class="circle-2"></div>
     <div class="credits">
      <h3>A PROJECT BY <a>@RYNWSTN</a></h3>
    </div>
  </div>
</div>
</template>

<style>
body {
  font-family: work-sans;
  margin:0px;
  overflow-x:hidden;
}

h1 {
  font-size:8.7em;
  line-height:81%;  
  margin-bottom:20px;
  font-weight:800;
}
button {
  outline:0;
  background-color:transparent;
  border:0px;
}
button:hover {
  cursor:pointer;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.contain {
  width:100vw;
  height:100vh;
  padding:3% 3%;
  box-sizing: border-box;
}
.circles {
  width:100vw;
  height:100vh;
  position:fixed;
  top:0px;
  left:0px;
  box-sizing: border-box;
  overflow:hidden;
  z-index:-1;
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

.circle-1, .circle-2{
  position:absolute;
  width: 718px;
  height: 718px;
  border-radius:50%;
}

.credits {
  font-size:0.8em;
  position: absolute;
  bottom:20px;
  right:20px;
}
</style>
