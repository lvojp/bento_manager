<template>
  <div>
    <span>材料名:</span>
    <label>
      <input v-model="material" type="text" class="w-25">
    </label>
    <span>量:</span>
    <label>
      <input v-model="value" type="text" class="w-25">
    </label>
    <span>単位:</span>
    <label>
      <input v-model="unit" type="text" class="w-25 unit">
    </label>
    <button class="btn btn-primary" @click="append">追加</button>
  </div>
</template>

<script>
export default {
  name: "MaterialRegister",

  data: function(){
    return {
      item:{
        material: '',
        value: 0,
        unit: ''
      }
    }
  },

  methods: {
    append: function(){
      this.item.material = this.material;
      this.item.value = this.value;
      this.item.unit = this.unit;
      // alert(this.item.material + this.item.value + this.item.unit);
      // this.$emit('addItem',this.item)
      this.$emit('addItem',this.item)
    }
  }
}

</script>

<style scoped>

</style>