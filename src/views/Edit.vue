<template>
  <div class="container">
    <div class="row">
      <Header title="MenuEditor"></Header>
      <form class="col-md-12 form-inline text-center mb-5">
        <div class="form-group">
          <label class="pr-1">
            メニュー
          </label>
          <input type="text" v-model="menu.title" class="form-control">
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
    </div>

  </div>
</template>

<script>
import Header from '@/components/Header'
import IngredientRegister from "@/components/IngredientRegister";

export default {
  name: "Edit",
  components: {
    Header,
    IngredientRegister
  },
  props: {
    argMenu: Object
  },
  data() {
    return {
      menu: {
        title: '',
        ingredients: []
      }
    }
  },
  mounted() {
    if (localStorage.getItem(this.menu.title)){
      try{
        this.menu = JSON.parse(localStorage.getItem(this.menu.title));
      } catch(e) {
        localStorage.removeItem(this.menu.title);
      }
    }
    this.menu.title = this.menuName
  },
  methods: {
    objectCopy(value) {
      let obj = JSON.stringify(value);
      obj = JSON.parse(obj);
      return obj
    },
    //アイテムの追加
    appendIngredient(value) {
      // console.log(value);
      let obj = this.objectCopy(value);
      this.menu.ingredients.push(obj);
      this.saveMenu()
    },
    // アイテムの削除
    deleteItem(index){
      this.menu.ingredients.splice(index, 1);
      this.saveMenu()
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
    toHome() {
      this.$router.push({
        name: 'home',
        params: { menuData: this.menu }
      })
      this.$emit('registerMenu', this.menu)
    },
    saveMenu() {
      const parsed = JSON.stringify(this.menu);
      localStorage.setItem(this.menu.title, parsed);
    }
  }
}

</script>

<style scoped>

</style>