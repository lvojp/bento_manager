<template>
  <div id="app" class="container">
    <Header></Header>
    <div class="row">
      <ul>
        <li v-for="menu in menus" :key="menu.title">{{ menu.title }}</li>
      </ul>
    </div>
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
    objectCopy(value) {
      let obj = JSON.stringify(value);
      obj = JSON.parse(obj);
      return obj;
    },
    appendMenu(menu) {
      let obj = this.objectCopy(menu)
      this.menus.push(obj);
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
