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
              v-model="myMenu.title"
              placeholder="New Menu"
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
        <tr v-for="(item, index) in myMenu.ingredients" v-bind:key="item.ingredient">
          <td>{{ index }}</td>
          <td>{{ item.ingredient }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.unit }}</td>
          <td>
            <div class="btn btn-primary mr-1" @click="editItem(index)">□</div>
            <div class="btn btn-primary" @click="deleteItem(index)">x</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <button @click="toHome" class="btn btn-primary" v-show="myMenu.ingredients.length > 0">登録完了</button>
      <p>{{ myMenu }}</p>
      <p>{{ myMenus }}</p>
    </div>

    <div class="row">
      <button @click="toHomeWithoutSave" class="btn btn-primary">戻る</button>
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
    editMenus: Array,
    index: Number
  },
  data() {
    return {
      myMenus: [],
      myMenu: {
        title: '',
        ingredients: []
      }
    }
  },
  beforeMount() {
    this.loadMenu()
  },
  methods: {
    //アイテムの追加
    appendIngredient(obj) {
      if(this.myMenu.title === ''){
        alert('メニューの名前を入力してください');
        return 0;
      }
      this.myMenu.ingredients.push(this.objectCopy(obj));
      this.saveToLocalStorage(this.myMenu, this.myMenu.title)
    },
    appendMenus(obj) {
      this.editMenus.push(this.objectCopy(obj));
    },
    // アイテムの削除
    deleteItem(index){
      this.myMenu.ingredients.splice(index, 1);
      this.saveToLocalStorage(this.myMenu.title)
    },
    // アイテムの編集
    editItem(index){
      let m = this.myMenu.ingredients[index].ingredient;
      let v = this.myMenu.ingredients[index].amount;
      let u = this.myMenu.ingredients[index].unit;

      // 各inputのvalueに入力
      document.getElementById('input-ingredient').value = m;
      document.getElementById('input-amount').value = v;
      document.getElementById('input-unit').value = u;

      // this.items[index].material = this.item
    },
    loadMenu() {
      if(this.editMenus.length > 0){
        this.myMenus = this.objectCopy(this.editMenus);
        if (this.index > -1){
          this.myMenu = this.myMenus[this.index];
        }
      }
    },
    // ホームに戻る
    toHome() {
      if(this.checkDuplicateByTitle(this.editMenus, this.myMenu.title)){
        // alert('このメニューは既に存在しています。メニュー名を変更してください');
        // return 0;
      }else{
        this.appendMenus(this.myMenu);
      }

      this.$router.push({
        name: 'home',
        params: { homeMenus: this.editMenus}
      })
    },
    toHomeWithoutSave() {
      this.$router.push({
        name: 'home',
        params: { homeMenus: this.myMenus}
      })
    }

  }
}

</script>

<style scoped>

</style>