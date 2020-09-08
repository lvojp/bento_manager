<template>
  <div class="container">
    <div class="row">
      <Header title="Home"></Header>
    </div>

    <div class="row">
      <button @click="toEdit(-1)" class="btn btn-primary">Create new menu</button>
    </div>

    <div class="row">
      <table class="table col-md-12">
        <th>No.</th>
        <th>Menu</th>
        <th>Count</th>
        <th>Edit</th>
        <tbody>
          <tr v-for="(item, index) in menus" :key="item.title">
            <td>{{ index }}</td>
            <td>{{ item.title }}</td>
            <td><PlusMinus></PlusMinus></td>
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
import PlusMinus from '@/components/PlusMinus'
import utilsMixin from '@/mixins/utils.js'

export default {
  mixins: [utilsMixin],
  name: 'App',
  props: {
    homeMenus : Object
  },
  data() {
    return {
      menus : []
    }
  },
  components: {
    PlusMinus,
    Header,
  },
  beforeMount () {
    console.log(this.homeMenus)
    let obj = this.objectCopy(this.homeMenus);
    this.menus =  obj;

  },
  methods: {
    toEdit(idx) {
      // New Item
      this.$router.push({
        name: 'edit',
        params: {
          editMenus: this.menus,
          index: idx
        }
      });
    },
    appendMenu(menu) {
      let obj = this.objectCopy(menu)
      this.menus.push(obj);
      this.saveToLocalStorage('home', this.menus)
    },
    // アイテムの削除
    deleteItem(idx){
      this.menus.splice(idx, 1);
    },
  }
}
</script>
