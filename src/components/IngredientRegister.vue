<template>
  <div class="row">
    <div class="col-md-12 mb-5">

      <form class="form-inline">
        <div class="form-group">
          <label class="pr-1">
            材料名
          </label>

          <vue-simple-suggest
              id="input-name"
              v-model="item.name"
              :list="allIngredientsList"
              :styles="autoCompleteStyle"
              :destyled=true
              :min-length="0"
              :filter-by-query="true"
              :aria-expanded="true"
              :mode="input"
              :isOverList="true"
              autocomplete="off"
              style="z-index:2;"
          />
        </div>

        <div class="form-group">
          <label class="px-1">
            量
          </label>

          <vue-simple-suggest
              id="input-hoge"
              v-model="item.amount"
              :list="allAmountsList"
              :styles="autoCompleteStyle"
              :destyled=true
              :min-length="0"
              :filter-by-query="true"
              autocomplete="off"
              style="z-index: 1"
          />

        </div>

        <div class="form-group">
          <label class="px-1">
            単位
          </label>
          <select v-model="item.unit" id="input-unit" class="form-control">
            <option v-for="unit in units" :key="unit">{{ unit }}</option>
          </select>
        </div>

        <button type="button" class="btn btn-success ml-1" @click="register">追加</button>
      </form>
      <!--      <p>{{suggestSource}}</p>-->
      <!--      <p>{{allIngredients}}</p>-->

    </div>
  </div>
</template>

<script>
// import InputSet from '@/components/Register/InputSet'
import utilsMixin from '@/mixins/utils.js'
import VueSimpleSuggest from 'vue-simple-suggest'
import natsort from 'natsort'


export default {
  mixins: [utilsMixin],
  components: {
    // InputSet
    VueSimpleSuggest
  },

  name: "IngredientRegister",
  props: ['propItem', 'allMenus', 'ingredients'],

  data() {
    return {
      allIngredientsList: Array,
      allAmountsList: Array,
      count: Number,
      units: ["個", "グラム"],
      item: {
        name: '',
        amount: '',
        unit: '個'
      },
      autoCompleteStyle: {
        vueSimpleSuggest: "position-relative",
        inputWrapper: "",
        defaultInput: "form-control",
        suggestions: "position-absolute list-group z-1000",
        suggestItem: "list-group-item"
      }
    }
  },

  beforeMount() {
    let suggestSource = this.objectCopy(this.allMenus);
    // サジェスト用にリストを作成
    this.allIngredientsList = this.getAllIngredientList(suggestSource)
    this.allAmountsList = this.getAllAmountList(suggestSource)
    this.importItem(this.propItem);
  },

  methods: {
    importItem(o) {
      this.item = o;
    },

    getAllIngredientList(src) {
      let result = [];
      let buf = [];
      for (let i = 0; i < src.length; i++) {
        for (let j = 0; j < src[i].ingredients.length; j++) {
          let target = src[i].ingredients[j].name;
          // まだ入っていない種類のものだけを入れる
          if (buf.indexOf(target) === -1) {
            buf.push(target);
          }
        }
      }
      result = this.ascSortList(buf)
      return result;
    },

    getAllAmountList(src) {
      let result = [];
      let buf = [];
      for (let i = 0; i < src.length; i++) {
        for (let j = 0; j < src[i].ingredients.length; j++) {
          let target = src[i].ingredients[j].amount;
          // まだ入っていない種類のものだけを入れる
          if (buf.indexOf(target) === -1) {
            buf.push(String(target));
          }
        }
      }
      result = buf.sort(natsort());
      // result = this.ascSortList(buf)
      return result;
    },

    register() {
      if (this.inputClear()) {
        this.trimSpaceInput();
        if (this.checkDuplication(this.item.name)) {
          this.$emit('registerItem', this.item);
        } else {
          alert('この材料はすでに登録されています。')
        }
      } else {
        alert('材料名、量、単位の項目は入力必須です');
      }
      // this.clearItem();
    },
    clearItem() {
      this.item.name = '';
      this.item.amount = '';
      this.item.unit = '';
    },

    inputClear() {
      if (this.item.name === '') {
        return false;
      }
      if (this.item.amount === '') {
        return false;
      }
      if (this.item.unit === '') {
        return false;
      }
      return true;
    },

    trimSpaceInput() {
      this.item.name = this.item.name.trim();
      this.item.amount = this.item.amount.trim();
      this.item.unit = this.item.unit.trim();
    },

    checkDuplication(name) {
      // let plain = this.ingredients[0].name;
      // alert(plain);
      for (let i = 0; i < this.ingredients.length; i++) {
        if (name === this.ingredients[i].name) {
          return false;
        }
      }
      return true;
    },

    checkNumInput(s) {
      if (!this.checkNum(s)) {
        this.item.amount = 1;
      }
    }
  },
}

</script>

<style scoped>
.z-1000 {
  z-index: 1000;
}

.hover {
  background-color: #007bff;
  color: #fff;
}
</style>