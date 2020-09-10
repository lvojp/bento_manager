<template>
  <div>
    <button class="btn btn-primary" @click="countDown">-</button>
    <input type="text" :value="value" class="mx-1 w-25">
    <button class="btn btn-primary" @click="countUp">+</button>
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "PlusMinus",

  data: function(){
    return {
      value: 0
    }
  },

  methods: {
    countUp() {
      this.value++;
      this.emitter(this.value);
    },

    countDown() {
      if(this.value > 0){
        this.value--;
      }
      this.emitter();
    },
    emitter() {
      this.$emit('changeCount', this.value)

    }
  }
}
</script>

<style scoped>

</style>