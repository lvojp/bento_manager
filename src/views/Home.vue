<template>
  <div class="container">
    <Header title="Home"></Header>

    <div class="row">
      <button @click="toEditNew()" class="btn btn-primary">Create new menu</button>
    </div>

    <div class="row">
      <table class="table col-md-12">
        <th>No.</th>
        <th>Menu</th>
        <th>Edit</th>
        <tbody>
          <tr v-for="(menu, index) in menus" :key="menu.title">
            <td>{{ index }}</td>
            <td>{{ menu }}</td>
            <td>
              <button class="btn btn-primary mr-1" @click="toEdit(index)">□</button>
              <button class="btn btn-primary" @click="deleteItem(index)">x</button>
            </td>
          </tr>
        </tbody>
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
      menus : []
    }
  },
  components: {
    // PlusMinus,
    Header,
  },
  methods: {
    toEdit(idx) {
      this.$router.push({
        name: 'edit',
        params: { argMenu: this.menus[idx] }
      });
    },
    toEditNew() {
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
