<template>
  <div>
    <button type="button" class="btn btn-success" @click="countDown">-</button>
    <input type="text"
           v-model="value"
           @change="checkNumInput(value)"
           class="mx-1 w-25"
           pattern="\d*"
           oncopy="return false"
           onpaste="return false"
           style="ime-mode:disabled"
    >
    <button type="button" class="btn btn-success" @click="countUp">+</button>
    <!--    <p>{{ value }}</p>-->
  </div>
</template>

<script>
import utilsMixin from '@/mixins/utils.js'

export default {
  mixins: [utilsMixin],
  name: "PlusMinus",
  props: ['amount'],

  data: function () {
    return {
      value: 0
    }
  },

  beforeMount() {
    this.setValue(this.amount)
  },

  methods: {
    setValue(n) {
      this.value = n
    },
    // 数量をプラスボタンで変更時
    countUp() {
      this.value++;
      this.emitter(this.value);
    },
    // 数量をマイナスボタンで変更時
    countDown() {
      if (this.value > 0) {
        this.value--;
      }
      this.emitter();
    },
    // 親コンポネントに値を転送
    emitter() {
      this.$emit('changeCount', this.value)
    },
    checkNumInput(s) {
      if (this.checkNum(s)) {
        this.emitter();
      }else{
        this.value = 0;
        this.emitter();
      }
    }
  }
}
</script>

<style scoped>

</style>