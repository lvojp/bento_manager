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
                id="input-ingredient"
                v-model="item.ingredient"
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
              class="form-control"
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

        <button class="btn btn-primary ml-1" @click="register">追加</button>
      </form>
    </div>
  </div>
</template>

<script>
// import InputSet from '@/components/Register/InputSet'

export default {
  components: {
    // InputSet
  },

  name: "IngredientRegister",

  data() {
    return {
      count: Number,
      units: ["個", "グラム"],
      item: {
        ingredient: '',
        amount: '',
        unit: '個'
      }
    }
  },

  methods: {
    register() {
      this.$emit('registerItem', this.item);
      // this.clearItem();
    },
    clearItem() {
      this.item.ingredient = '';
      this.item.amount = '';
      this.item.unit = '';
    }
  },
}

</script>

<style scoped>

</style>