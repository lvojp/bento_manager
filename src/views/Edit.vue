<template>
  <div class="container">
    <Header title="MenuEditor"></Header>
    <IngredientManager :menu-name="menuName"></IngredientManager>
  </div>
</template>

<script>
// import PlusMinus from 'i/components/PlusMinus.vue'
import Header from '@/components/Header'
import IngredientManager from '@/components/IngredientManager'

export default {
  name: 'App',
  props: {
    menuName: String
  },
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
