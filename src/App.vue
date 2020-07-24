<template>
  <div id="app">
    <!-- <img src="./assets/1.jpg">
    <img src="./assets/2.jpg"> -->

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
active:0
    }
  }
};
</script>

<style>
html{
  height: 100%;
}
body{
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
