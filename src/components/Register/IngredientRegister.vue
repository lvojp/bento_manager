<template>
  <div class="contains">
    <div class="row">
      <InputSet title="材料名" v-model="item.ingredient"></InputSet>
      <InputSet title="量" v-model="item.value"></InputSet>
      <InputSet title="単位" v-model="item.unit"></InputSet>
      <button class="btn btn-primary" @click="register">追加</button>
    </div>
  </div>
</template>

<script>
import InputSet from '@/components/Register/InputSet'

export default {
  components: {
    InputSet
  },

  name: "IngredientRegister",

  data() {
    return {
      item: {
        ingredient: '',
        value: '',
        unit: ''
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
      this.item.value = '';
      this.item.unit = '';
    },
  }
}

</script>

<style scoped>

</style>