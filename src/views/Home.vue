<script src="../mixins/utils.js"></script>
<template>
  <div class="container">
    <div class="row">
      <Header title="Home"></Header>
    </div>

    <div class="row">
      <button type="button" @click="toEdit(-1)" class="btn btn-success">新しいメニューの作成</button>
    </div>

    <div class="row mb-5">
      <table class="table col-md-12 table-striped">
        <th>No.</th>
        <th>メニュー</th>
        <th>必要個数</th>
        <th>Edit</th>
        <tbody>
        <tr v-for="(item, index) in myMenus" :key="item.title">
          <td>{{ index }}</td>
          <td>{{ item.title }}</td>
          <td>
            <Counter @changeCount="caliculate($event, index)"></Counter>
          </td>
          <td>
            <button type="button" class="btn btn-success mr-1" @click="toEdit(index)">□</button>
            <button type="button" class="btn btn-success" @click="deleteItem(index)">x</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <h3>Required Ingrement</h3>
      <table class="table col-md-12 table-striped">
        <th>No.</th>
        <th>材料名</th>
        <th>必要個数</th>
        <th>単位</th>
        <tbody>
        <tr v-for="(item, index) in result" :key="item.ingredient">
          <td>{{ index }}</td>
          <td>{{ item.ingredient }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.unit }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--    <p>{{needAmount}}</p>-->

  </div>
</template>


<script>
import Header from '@/components/Header'
import Counter from '@/components/Counter'
import utilsMixin from '@/mixins/utils.js'

export default {
  mixins: [utilsMixin],
  name: 'App',
  props: {
    homeMenus: Array
  },

  data() {
    return {
      myMenus: [],
      needAmount: [],
      result: []
    }
  },

  components: {
    Counter,
    Header,
  },

  beforeMount() {
    this.loadMenus();
    for (let i = 0; i < this.myMenus.length; i++) {
      this.needAmount.push({});
    }
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

    deleteItem(idx) {
      this.myMenus.splice(idx, 1);
      // this.homeMenus = this.objectCopy(this.myMenus);
      this.saveToLocalStorage(this.myMenus, 'home')
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

    caliculate(eventArgs, index) {
      this.objectAdder(this.myMenus, index, eventArgs)
    },

    objectAdder(arr, idx, count) {
      //メニューの具材の個数をそれぞれカウントごとに倍加して単配列にする
      let result = this.serializeIngredients(arr[idx], count)
      this.needAmount.splice(idx, 1, result);
      this.needAmount = this.removeZeroAmountIngredients(this.needAmount);
      this.makeResult();
    },

    //メニューの具材の個数をそれぞれカウントごとに倍加してオブジェクトの単配列にする
    serializeIngredients(arr, count){
      let result = [];
      let targetMenu = arr.ingredients;
      for (let i = 0; i < targetMenu.length; i++) {
        let buf = {};
        buf['ingredient'] = targetMenu[i].ingredient;
        buf['amount'] = parseInt(targetMenu[i].amount) * parseInt(count);
        buf['unit'] = targetMenu[i].unit;
        result.push(buf);
      }
      return result
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
      this.result = this.removeZeroAmountIngredients(buf);
    },
    removeSameIngredient(arr) {
      let list = this.makeUniqueIngredientsList(arr);
      let result = this.ingredientsCounter(list, arr);
      return result;
    },
    ingredientsCounter(list, arr) {
      let result = [];
      list.forEach(function (item) {
        let buf = {};
        let amount = 0;
        let unit = '';
        buf['ingredient'] = item;
        arr.forEach(function (obj) {
          if (item === obj.ingredient) {
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
    makeUniqueIngredientsList(arr) {
      let buf = [];
      for (let i = 0; i < arr.length; i++) {
        buf.push(arr[i].ingredient);
      }

      let result = buf.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });
      return result;
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
      list = this.ascSortList(list)

      for (let i = 0; i < list.length; i++) {
        result.splice(list[i], 1);
      }
      return result;
    }
  },

  computed: {
    requiredItems: function () {

    }
  }
}
</script>
