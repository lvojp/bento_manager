<template>
  <div class="row">
    <div class="col-md-12 mb-5">

      <form class="form-inline">
        <div class="form-group">
          <label class="pr-1">
            材料名
          </label>
          <input
              type="text"
              id="input-name"
              v-model="item.name"
              class="form-control"
          >
        </div>

        <div class="form-group">
          <label class="px-1">
            量
          </label>
          <input
              type="number"
              id="input-amount"
              v-model="item.amount"
              @change="checkNumInput(item.amount)"
              class="form-control"
              pattern="\d*"
              oncopy="return false"
              onpaste="return false"
              style="ime-mode:disabled"
          >
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
    </div>
  </div>
</template>

<script>
// import InputSet from '@/components/Register/InputSet'
import utilsMixin from '@/mixins/utils.js'

export default {
  mixins: [utilsMixin],
  components: {
    // InputSet
  },

  name: "IngredientRegister",

  props: ['propItem'],

  data() {
    return {
      count: Number,
      units: ["個", "グラム"],
      item: {
        name: '',
        amount: '',
        unit: '個'
      }
    }
  },

  beforeMount() {
    this.importItem(this.propItem);
  },

  methods: {
    importItem(o) {
      this.item = o;
    },

    register() {
      if (this.inputClear()) {
        this.$emit('registerItem', this.item);
      }else{
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
    checkNumInput(s){
      if (!this.checkNum(s)) {
        this.item.amount = 1;
      }
    }
  },
}

</script>

<style scoped>

</style>