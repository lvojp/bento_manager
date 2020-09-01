<template>
  <div class="container">
    <div class="row">
      <Header title="Home"></Header>
      <table class="table">
        <tr>
          <td>hoge</td>
          <td @click="toEdit">□</td>
        </tr>

      </table>
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
    toEdit() {
      this.$router.push({
        name: 'edit',
        params: { menuName: 'hogehoge' }
      });
    },
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
