<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="hogehoge maturi"/>
<!--    <div class="row">-->
<!--      <PlusMinus menu="testdon" count=""></PlusMinus>-->
<!--      <PlusMinus menu="testdon"></PlusMinus>-->
<!--      <PlusMinus menu="testdon"></PlusMinus>-->
<!--      <PlusMinus menu="testdon"></PlusMinus>-->
<!--      <PlusMinus menu="testdon"></PlusMinus>-->
<!--    </div>-->
    <MaterialManager></MaterialManager>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
// import PlusMinus from './components/PlusMinus.vue'
import MaterialManager from './components/MaterialManager'


export default {
  name: 'App',
  components: {
    HelloWorld,
    // PlusMinus,
    MaterialManager
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
