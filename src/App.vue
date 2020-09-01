<template>
  <div id="app" class="container">
    <Header></Header>
<!--    <div class="row">-->
<!--      <PlusMinus menu="testdon" count=""></PlusMinus>-->
<!--      <PlusMinus menu="testdon"></PlusMinus>-->
<!--      <PlusMinus menu="testdon"></PlusMinus>-->
<!--      <PlusMinus menu="testdon"></PlusMinus>-->
<!--      <PlusMinus menu="testdon"></PlusMinus>-->
<!--    </div>-->
    <IngredientManager @registerMenu="appendMenu" :title="select" v-show="true"></IngredientManager>
  </div>
</template>
<script>
// import PlusMinus from 'i/components/PlusMinus.vue'
import IngredientManager from '@/components/IngredientManager'
import Header from '@/components/header'


export default {
  name: 'App',
  data() {
    return {
      select: 'new',
      menus : []
    }
  },
  components: {
    // PlusMinus,
    Header,
    IngredientManager
  },
  methods: {
    appendMenu(menu) {
      console.log(menu.title + menu.ingredients);
    }
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
