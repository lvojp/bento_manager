<script src="../mixins/utils.js"></script>
<template>
  <div class="container">
    <div class="row">
      <Header title="Home"></Header>
    </div>

    <div class="row">
      <div @click="toEdit(-1)" class="btn btn-primary">Create new menu</div>
    </div>

    <div class="row mb-5">
      <table class="table col-md-12 table-striped">
        <th>No.</th>
        <th>Menu</th>
        <th>Count</th>
        <th>Edit</th>
        <tbody>
          <tr v-for="(item, index) in myMenus" :key="item.title">
            <td>{{ index + 1 }}</td>
            <td>{{ item.title }}</td>
            <td><PlusMinus @changeCount="caliculate"></PlusMinus></td>
            <td>
              <div class="btn btn-primary mr-1" @click="toEdit(index)">□</div>
              <div class="btn btn-primary" @click="deleteItem(index)">x</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <h3>Required Ingredient</h3>
      <table class="table col-md-12 table-striped">
        <th>No.</th>
        <th>Ingredient</th>
        <th>Count</th>
        <tbody>
        <tr v-for="(item, index) in myMenus" :key="item.title">
          <td>{{ index + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{item.count}}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>


<script>
import Header from '@/components/Header'
import PlusMinus from '@/components/Counter'
import utilsMixin from '@/mixins/utils.js'

export default {
  mixins: [utilsMixin],
  name: 'App',
  props: {
    homeMenus : Array
  },
  data() {
    return {
      myMenus : []
    }
  },
  components: {
    PlusMinus,
    Header,
  },
  beforeMount () {
    this.loadMenus();
  },
  methods: {
    toEdit(idx) {
      // New Item
      this.$router.push({
        name: 'edit',
        params: {
          editMenus: this.myMenus,
          index: idx
        }
      });
    },
    // アイテムの削除
    deleteItem(idx) {
      this.myMenus.splice(idx, 1);
      this.homeMenus = this.myMenus;
    },
    loadMenus() {
      if(this.homeMenus !== undefined){
        // メニューの登録が既に存在するとき
        this.myMenus = this.objectCopy(this.homeMenus);
        this.saveToLocalStorage(this.myMenus, 'home')
        console.log('Save status.')
      }else{
        // メニューの登録がひとつもないとき
        let obj = this.loadFromLocalStorage('home')
        if(obj !== -1){
          this.myMenus = obj;
          console.log('Load status.')
        }else{
          console.log('No data.')
        }
      }
    },
    caliculate(info){


    }
  }
}
</script>
