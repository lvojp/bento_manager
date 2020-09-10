<template>
  <div>
    <span>{{ menuCount.menu }}</span>
    <button class="btn btn-primary" @click="countDown">-</button>
    <input type="text" :value="menuCount.requiredNumber" class="mx-1 w-25">
    <button class="btn btn-primary" @click="countUp">+</button>
  </div>
</template>

<script>
export default {
  name: "PlusMinus",
  props: ["menu"],

  data: function(){
    return {
      menuCount: {
        name : this.menu,
        requiredNumber : 0
      }
    }
  },

  methods: {
    countUp() {
      this.menuCount.requiredNumber++;
      // alert(this.count);
    },

    countDown() {
      if(this.menuCount.requiredNumber > 0){
        this.menuCount.requiredNumber--;
      }
      // alert(this.count);
    },
    emitter() {
      this.$emit('changeCount')

    }
  }
}
</script>

<style scoped>

</style>