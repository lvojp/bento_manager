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

    <IngredientRegister :propItem="currentItem" @registerItem="appendIngredient"></IngredientRegister>

    <div class="row mb-5">
      <table class="table table-striped col-md-12">
        <th>No.</th>
        <th>素材名</th>
        <th>量</th>
        <th>単位</th>
        <th>Edit</th>

        <tbody>
        <tr v-for="(item, index) in myMenu.ingredients" v-bind:key="item.name">
          <td>{{ index }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.unit }}</td>
          <td>
            <button type="button" class="btn btn-success mr-1" @click="editItem(index)"><img src="@/assets/pen.png"
                                                                                             alt="edit"/></button>
            <button type="button" class="btn btn-success" @click="deleteItem(index)"><img src="@/assets/trashbox.png"
                                                                                          alt="remove"/></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <div class="col-md-12 text-left" v-show="myMenu.ingredients.length > 0">
        <template v-if="isUpdate === true">
          <button type="button" @click="toHome" class="btn btn-success col-md-5">更新</button>
        </template>
        <template v-if="isUpdate === false">
          <button type="button" @click="toHome" class="btn btn-success col-md-5">新規登録</button>
        </template>
      </div>
    </div>

    <Footer></Footer>
    <!--    <p>{{isUpdate}}</p>-->

  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import IngredientRegister from "@/components/IngredientRegister";
import utilsMixin from '@/mixins/utils.js'

export default {
  mixins: [utilsMixin],
  name: "Edit",
  components: {
    Header,
    Footer,
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
        amount: 0,
        ingredients: []
      },
      currentItem: {
        name: '',
        amount: '',
        unit: ''
      }
    }
  },
  beforeMount() {
    this.loadMenu()
  },
  watch: {
    'myMenu.title': function () {
      this.isUpdate = this.checkDuplicateInOrgMenuByTitle(this.editMenus, this.myMenu.title);
    }

  },
  methods: {
    //アイテムの追加
    appendIngredient(obj) {
      if (this.myMenu.title === '') {
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
    deleteItem(index) {
      this.myMenu.ingredients.splice(index, 1);
      this.saveToLocalStorage(this.myMenu.title)
    },
    // アイテムの編集
    editItem(index) {
      let name = this.myMenu.ingredients[index].name;
      let amount = this.myMenu.ingredients[index].amount;
      let unit = this.myMenu.ingredients[index].unit;

      this.currentItem.name = name;
      this.currentItem.amount = amount;
      this.currentItem.unit = unit;
      // this.items[index].material = this.item
    },
    loadMenu() {
      if (this.editMenus.length > 0) {
        // メニュー表をコピー
        this.myMenus = this.objectCopy(this.editMenus);
        // メニューの編集作業時にはメニューのロード
        if (this.index > -1) {
          this.myMenu = this.myMenus[this.index];
        }
      }
    },
    // ホームに戻る
    toHome() {
      if (this.isUpdate) {
        // this.updateMenus(this.editMenus, this.myMenu);
        this.updateOrgMenu(this.editMenus, this.myMenu);
        console.log(this.editMenus);
      } else {
        this.appendMenus(this.myMenu);
      }

      this.$router.push({
        name: 'home',
        params: {homeMenus: this.editMenus}
      })
    },
    toHomeWithoutSave() {
      this.$router.push({
        name: 'home',
        params: {homeMenus: this.myMenus}
      })
    }

  }
}

</script>

<style scoped>

</style>