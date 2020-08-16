<template>
  <div>
    <span>{{ menu }}</span>
    <button class="btn btn-primary" @click="countDown">-</button>
    <input type="text" :value="count" class="w-25">
    <button class="btn btn-primary" @click="countUp">+</button>
  </div>
</template>

<script>
export default {
  name: "PlusMinus",
  props: ["menu"],

  data: function(){
    return {
      count: 0
    }
  },

  methods: {
    countUp: function(){
      this.count++;
      // alert(this.count);
    },

    countDown: function(){
      this.count--;
      // alert(this.count);
    }
  }
}
</script>

<style scoped>

</style>