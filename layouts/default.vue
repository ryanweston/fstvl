<template>
<div>
  <div class="container">
    <Nuxt />
  </div>
  <div class="circles">
      <div class="circle-1"></div>
      <div class="circle-2"></div>
      <div class="credits">
    </div>
  </div>
</div>
</template>

<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  width:100vw;
  height:100vh;
  padding:10% 5%;
  box-sizing: border-box;
}
.circles {
  width:100vw;
  height:100vh;
  position:absolute;
  top:0px;
  left:0px;
  box-sizing: border-box;
  overflow:hidden;
  z-index:-1;
}
.circle-1 {
  top:0px;
  right:0px;
  filter: blur(20px);
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
  filter: blur(20px);
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
</style>
