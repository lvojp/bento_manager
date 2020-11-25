<script>
import Footer from "@/components/Footer";

export default {
  components: {Footer}
}
</script>
<template>
  <div class="container">
    <div class="row">
      <Header title="Home"></Header>
    </div>


    <div class="row">
      <button type="button" class="col-md-3 btn btn-warning mb-2" @click="resetCounts()">必要個数をすべて0に戻す</button>
      <button type="button" id="edit-button" class="offset-6 col-md-3 btn btn-danger mb-2" @click="switchEditUI()">編集ボタンの表示</button>

      <table class="table col-md-12 table-striped" id="menus">
        <thead>
          <tr>
            <th>No.</th>
            <th>メニュー</th>
            <th>必要個数</th>
            <th v-if="isShowEdit">Edit</th>
          </tr>
        </thead>
<!--        delay=150 以下の場合、input:textにカーソルが上手く行かない-->
        <draggable
            v-model="myMenus"
            tag="tbody"
            draggable="tr"
            animation="300"
            delay="150"
            @end="drag=dragEnd()"
        >
          <tr v-for="(item, index) in myMenus" :key="item.title" class="grabbable" >
            <td>{{ index + 1 }}</td>
            <td>{{ item.title }}</td>
            <td>
              <Counter :amount="item.amount" @changeCount="calculation($event, index)"></Counter>
            </td>
            <td v-if="isShowEdit">
              <button v-if="isShowEdit" type="button" class="btn btn-success mr-1" @click="toEdit(index)">
                <img src="@/assets/pen.png" alt="edit"/>
              </button>
              <button v-if="isShowEdit" type="button" class="btn btn-success" @click="deleteItem(index)">
                <img src="@/assets/trashbox.png" alt="remove"/>
              </button>
            </td>
          </tr>
        </draggable>
      </table>
    </div>

    <div class="row mb-5 d-block">
      <div class="text-right">
        <button type="button" @click="toEdit(-1)" class="btn btn-success col-md-5 col-md-offset-7 ">新しいメニューの追加</button>
      </div>
    </div>

    <div class="row mb-4">
      <h3>注文されているメニュー</h3>
      <table class="table col-md-12 table-striped">
<!--        <th>No.</th>-->
        <th>メニュー名</th>
        <th>個数</th>
        <tbody>
<!--        <tr v-for="(item, index) in myMenus " :key="item.name">-->
        <tr v-for="(item) in myMenus " :key="item.name">
          <!--        <tr v-for="(item) in result" :key="item.name">-->
<!--          <td v-if="item.amount > 0">{{ index + 1 }}</td>-->
          <td v-if="item.amount > 0">{{ item.title }}</td>
          <td v-if="item.amount > 0">{{ item.amount }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <h3>必要な材料リスト</h3>
      <table class="table col-md-12 table-striped">
        <th>No.</th>
        <th>材料名</th>
        <th>必要個数</th>
        <th>単位</th>
        <tbody>
        <tr v-for="(item, index) in result" :key="item.name">
          <!--        <tr v-for="(item) in result" :key="item.name">-->
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.unit }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row mt-5 d-block">
      <div class="text-center">
        <button type="button" @click="toIo" class="btn btn-warning col-md-6">メニューの保存と呼び出し</button>
      </div>
    </div>

    <Footer></Footer>

    <!--    <p>{{needAmount}}</p>-->

  </div>
</template>


<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Counter from '@/components/Counter'
import utilsMixin from '@/mixins/utils.js'
import draggable from 'vuedraggable'
import $ from 'jquery'

export default {
  mixins: [utilsMixin],
  name: 'App',
  props: {
    homeMenus: Array,
    uiStatus: Boolean
  },

  data() {
    return {
      isShowEdit: false,
      myMenus: [],
      needAmount: [],
      result: [],
    }
  },

  components: {
    Header,
    Footer,
    Counter,
    draggable
  },

  beforeMount() {
    this.setUiStatus();
    this.loadMenus();
    this.redrawMenus();
    // for (let i = 0; i < this.myMenus.length; i++) {
    //   this.needAmount.push({});
    // }
    // this.displayResult();
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

    toIo() {
      // New Item
      this.$router.push({
        name: 'io',
        params: {
          ioMenus: this.myMenus,
        }
      });
    },

    setUiStatus() {
      this.isShowEdit = this.uiStatus;
    },

    deleteItem(idx) {
      let c = confirm('メニューを削除してもよろしいですか？')
      if (c === true) {
        this.myMenus[idx].amount = 0;
        this.needAmount.splice(idx, 1);
        this.makeResult();
        this.myMenus.splice(idx, 1);
        this.saveToLocalStorage(this.myMenus, 'home')
      }
    },

    calculation(eventArgs, index) {
      this.objectAdder(this.myMenus, index, eventArgs);
      this.saveToLocalStorage(this.myMenus, 'home')
    },

    objectAdder(arr, idx, count) {
      arr[idx].amount = count;
      let result = this.serializeIngredients(arr[idx], count)
      //メニューの具材の個数をそれぞれカウントごとに倍加して単配列にする
      let test2 = this.needAmount;
      this.needAmount.splice(idx, 1, result);
      let test = this.needAmount;
      this.needAmount = this.removeZeroAmountIngredients(this.needAmount);
      this.makeResult();
    },

    objectDeleter(arr, idx) {
    },

    makeResult() {
      // 重複チェックの後に最終結果を格納
      let result = [];
      for (let i = 0; i < this.needAmount.length; i++) {
        for (let j = 0; j < this.needAmount[i].length; j++) {
          result.push(this.needAmount[i][j]);
        }
      }
      let buf = this.removeSameIngredient(result);
      let buf2 = this.removeZeroAmountIngredients(buf);
      this.result = this.menuSort(this.objectCopy(buf2));
    },

    loadMenus() {
      if (this.homeMenus !== undefined) {
        // メニューの登録が既に存在するとき
        this.myMenus = this.objectCopy(this.homeMenus);
        this.saveToLocalStorage(this.myMenus, 'home')
        console.log('Save status.')
      } else {
        // メニューの登録がひとつもないとき
        let obj = this.loadFromLocalStorage('home')
        if (obj !== -1) {
          this.myMenus = obj;
          console.log('Load status.')
        } else {
          console.log('No data.')
        }
      }
    },

    displayResult() {
      for (let i = 0; i < this.myMenus.length; i++) {
        this.objectAdder(this.myMenus, i, this.myMenus[i].amount);
      }
    },

    //メニューの具材の個数をそれぞれカウントごとに倍加してオブジェクトの単配列にする
    serializeIngredients(arr, count) {
      let result = [];
      let targetMenu = arr.ingredients;
      for (let i = 0; i < targetMenu.length; i++) {
        let buf = {};
        buf['name'] = targetMenu[i].name;
        buf['amount'] = this.roundFloat(parseFloat(targetMenu[i].amount) * parseInt(count),2);
        buf['unit'] = targetMenu[i].unit;
        result.push(buf);
      }
      return result
    },

    // 必要量が0になった材料を結果表示用リストから削除
    removeZeroAmountIngredients(arr) {
      let list = [];
      let result = this.objectCopy(arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].amount === 0) {
          list.push(i);
        }
      }
      // 降順ソート （配列の後ろの方から消していかないと順番が崩れるから
      list = this.descSortList(list)

      // リストをもとに配列を削除
      for (let i = 0; i < list.length; i++) {
        result.splice(list[i], 1);
      }

      return result;
      // return this.menuSort(result);
    },

    removeSameIngredient(arr) {
      let list = this.extractUniqueMenuNames(arr);
      let result = this.countIngredientsAmount(list, arr);
      return result;
    },

    countIngredientsAmount(list, arr) {
      let result = [];
      list.forEach(function (item) {
        let buf = {};
        let amount = 0;
        let unit = '';
        buf['name'] = item;
        arr.forEach(function (obj) {
          if (item === obj.name) {
            amount += obj.amount;
            unit = obj.unit;
          }
        });
        buf['amount'] = amount
        buf['unit'] = unit
        result.push(buf);
      });
      return result;
    },

    // リストから重複したものを削除
    extractUniqueMenuNames(arr) {
      let buf = [];
      for (let i = 0; i < arr.length; i++) {
        buf.push(arr[i].name);
      }
      let result = buf.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });
      return result;
    },

    resetCounts() {
      let c = confirm('必要個数をすべて0に戻します。よろしいですか？');
      if (c === true) {
        for (let i = 0; i < this.myMenus.length; i++) {
          this.calculation(0, i);
          location.reload();
        }
      }
    },

    switchEditUI(){
      if(this.isShowEdit === true){
        this.isShowEdit = false;
        let target = $('#edit-button');
        target.text('編集メニューを表示')
        target.addClass('btn-danger')
        target.removeClass('btn-success')

      }else{
        this.isShowEdit = true;
        let target = $('#edit-button');
        target.text('編集メニューを非表示')
        target.addClass('btn-success')
        target.removeClass('btn-danger')
      }
    },
    redrawMenus(){
      for (let i = 0; i < this.myMenus.length; i++) {
        this.needAmount.push({});
      }
      this.displayResult();
    },
    dragEnd(){
      this.redrawMenus();
      this.saveToLocalStorage(this.myMenus, 'home');
    }
  },

  computed: {
    requiredItems: function () {

    }
  }
}
</script>

<style scoped>

.grabbable:hover{
  cursor: grab;
}
.grabbable:active{
  cursor: grabbing;
}

</style>
