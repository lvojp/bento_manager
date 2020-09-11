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

    <div class="row mb-5">
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
      <div class="col-md-12 text-left" v-show="myMenu.ingredients.length > 0">
        <template v-if="isUpdate === true">
          <div @click="toHome" class="btn btn-primary col-md-5">更新</div>
        </template>
        <template v-if="isUpdate === false">
          <div @click="toHome" class="btn btn-primary col-md-5">新規登録</div>
        </template>
      </div>
    </div>
<!--    <p>{{isUpdate}}</p>-->

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
      isUpdate: false,
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
  watch: {
    'myMenu.title': function() {
      this.isUpdate = this.checkDuplicateInOrgMenuByTitle(this.editMenus, this.myMenu.title);
    }

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
        // メニュー表をコピー
        this.myMenus = this.objectCopy(this.editMenus);
        // メニューの編集作業時にはメニューのロード
        if (this.index > -1){
          this.myMenu = this.myMenus[this.index];
        }
      }
    },
    // ホームに戻る
    toHome() {
      if(this.isUpdate){
        // this.updateMenus(this.editMenus, this.myMenu);
        this.updateOrgMenu(this.editMenus, this.myMenu);
        console.log(this.editMenus);
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