<template>
  <div class="container">
    <div class="row">
      <Header title="MenuEditor"></Header>
      <form class="col-md-12 form-inline text-center mb-5">
        <div class="form-group">
          <label class="pr-1">
            メニュー
          </label>
          <input
              type="text"
              v-model="menu.title"
              class="form-control"
          >
        </div>
      </form>
    </div>

    <IngredientRegister @registerItem="appendIngredient"></IngredientRegister>

    <div class="row">
      <table class="table col-md-12">
        <th>No.</th>
        <th>素材名</th>
        <th>量</th>
        <th>単位</th>
        <th>Edit</th>

        <tbody>
        <tr v-for="(item, index) in menu.ingredients" v-bind:key="item.ingredient">
          <td>{{ index }}</td>
          <td>{{ item.ingredient }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.unit }}</td>
          <td>
            <button class="btn btn-primary mr-1" @click="editItem(index)">□</button>
            <button class="btn btn-primary" @click="deleteItem(index)">x</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <button @click="toHome" class="btn btn-primary" v-show="menu.ingredients.length > 0">登録完了</button>
      <p>{{ menu }}</p>
      <p>{{ menus }}</p>
    </div>

    <div class="row">
      <button @click="toHome" class="btn btn-primary">戻る</button>
    </div>


  </div>
</template>

<script>
import Header from '@/components/Header'
import IngredientRegister from "@/components/IngredientRegister";
import utilsMixin from '@/mixins/utils.js'

export default {
  mixins: [utilsMixin],
  name: "Edit",
  components: {
    Header,
    IngredientRegister
  },
  props: {
    editMenus: Object,
    index: Number
  },
  data() {
    return {
      menus: [],
      menu: {
        title: '',
        ingredients: []
      }
    }
  },
  beforeMount() {
    // this.menus = this.objectCopy(this.editMenus);
    this.menus = this.editMenus;
    if(this.index !== -1){
      this.menu = this.menus[this.index];
    }
  },
  methods: {

    //アイテムの追加
    appendIngredient(obj) {
      this.menu.ingredients.push(this.objectCopy(obj));
    },
    appendMenus(obj) {
      this.menus.push(this.objectCopy(obj));
    },
    // アイテムの削除
    deleteItem(index){
      this.menu.ingredients.splice(index, 1);
      this.saveToLocalStorage(this.menu.title)
    },
    // アイテムの編集
    editItem(index){
      let m = this.menu.ingredients[index].ingredient;
      let v = this.menu.ingredients[index].amount;
      let u = this.menu.ingredients[index].unit;

      // 各inputのvalueに入力
      document.getElementById('input-ingredient').value = m;
      document.getElementById('input-amount').value = v;
      document.getElementById('input-unit').value = u;

      // this.items[index].material = this.item
    },
    // ホームに戻る
    toHome() {
      this.appendMenus(this.menu);
      this.$router.push({
        name: 'home',
        params: { homeMenus: this.menus}
      })
    }
  }
}

</script>

<style scoped>

</style>