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
        <th>Required Count</th>
        <th>Edit</th>
        <tbody>
          <tr v-for="(item, index) in myMenus" :key="item.title">
            <td>{{ index }}</td>
            <td>{{ item.title }}</td>
            <td><Counter @changeCount="caliculate($event, index)"></Counter></td>
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
        <th>Amount</th>
        <th>Unit</th>
        <tbody>
        <tr v-for="(item, index) in result" :key="item.ingredient">
          <td>{{ index }}</td>
          <td>{{ item.ingredient }}</td>
          <td>{{item.amount}}</td>
          <td>{{item.unit}}</td>
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
    homeMenus : Array
  },
  data() {
    return {
      myMenus : [],
      needAmount : [],
      result : []
    }
  },
  components: {
    Counter,
    Header,
  },
  beforeMount () {
    this.loadMenus();
    for(let i=0; i<100; i++){
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
    // アイテムの削除
    deleteItem(idx) {
      this.myMenus.splice(idx, 1);
      // this.homeMenus = this.objectCopy(this.myMenus);
      this.saveToLocalStorage(this.myMenus, 'home')
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
    caliculate(eventArgs, index){
      console.log(eventArgs, index);
      this.objectAdder(this.myMenus, index, eventArgs)
    },
    objectAdder(arr, idx, count){
      let obj = arr[idx]
      //メニューの具材の個数をそれぞれカウントごとに倍加する
      let result = [];
      let ingredients = this.objectCopy(obj.ingredients);
      for(let i=0; i<ingredients.length; i++){
        let ingredient = ingredients[i].ingredient;
        let amount = parseInt(ingredients[i].amount) * parseInt(count);
        let unit = ingredients[i].unit;
        let buf = {};
        buf['ingredient'] = ingredient;
        buf['amount'] = amount;
        buf['unit'] = unit;
        result.push(buf);
      }
      // this.needAmount.push(result);
      this.needAmount.splice(idx, 1, result);
      this.needAmount = this.removeZeroAmountIngrements(this.needAmount);
      this.makeResult();
    },
    makeResult(){
      // 重複チェックの後に最終結果を格納
      let result = [];
      for(let i=0; i<this.needAmount.length; i++){
        for(let j=0; j<this.needAmount[i].length; j++){
          result.push(this.needAmount[i][j]);
        }
      }
      let buf = this.removeSameIngredient(result);
      this.result = this.removeZeroAmountIngrements(buf);
    },
    removeSameIngredient(arr){
      let list = this.makeUniqueIngredientsList(arr);
      let result =  this.ingredientsCounter(list, arr);
      return result;
    },
    ingredientsCounter(list, arr){
      let result =[];
      list.forEach( function(item){
        let buf = {};
        let amount = 0;
        let unit = '';
        buf['ingredient'] = item;
        arr.forEach(function(obj){
          if(item === obj.ingredient){
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
    makeUniqueIngredientsList(arr){
      let buf = [];
      for(let i=0; i<arr.length; i++){
        buf.push(arr[i].ingredient);
      }

      let result = buf.filter(function (x, i, self){
        return self.indexOf(x) === i;
      });
      return result;
    },
    removeZeroAmountIngrements(arr){
      let list = [];
      let result = this.objectCopy(arr);
      for(let i=0; i<arr.length; i++){
        if(arr[i].amount === 0){
          list.push(i);
        }
      }

      list.sort(function(a,b){
        if(a>b) return -1;
        if(a<b) return 1;
        return 0;
      });

      for(let i=0;i<list.length;i++){
        result.splice(list[i],1);
      }

      return result;
    }
  },

  computed: {
    requiredItems: function() {

    }
  }
}
</script>
