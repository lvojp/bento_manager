<template>
  <div class="container">
    <div class="row">
      <Header title="Home"></Header>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header'

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
