<template>
  <div>
    <button type="button" class="btn btn-success" @click="countDown">-</button>
    <input type="text" v-model="value" @change="handleInput(value)" class="mx-1 w-25">
    <button type="button" class="btn btn-success" @click="countUp">+</button>
<!--    <p>{{ value }}</p>-->
  </div>
</template>

<script>
import utilsMixin from '@/mixins/utils.js'
export default {
  mixins: [utilsMixin],
  name: "PlusMinus",

  data: function(){
    return {
      value: 0
    }
  },

  methods: {
    // 数量をプラスボタンで変更時
    countUp() {
      this.value++;
      this.emitter(this.value);
    },
    // 数量をマイナスボタンで変更時
    countDown() {
      if(this.value > 0){
        this.value--;
      }
      this.emitter();
    },
    // 数量を直接編集時
    handleInput(s) {
      let n = 0;
      if (!isNaN(s)) {
        // 数字の場合
        n = s;
        // 0以上チェック
        if (n > 0) {
          // OK
          // 整数チェック
          // let hoge = this.isInteger(n);
          // console.log(hoge);
          if (this.isInteger(n)){
            // OK
            this.emitter();
          } else {
            // NG
            alert('入力値は整数で入力してください。');
            this.value = 0;
            this.emitter();
          }
        } else {
          // NG
          alert('入力値は0以上を入力してください。');
          this.value = 0;
          this.emitter();
        }
      } else {
        alert('入力値は0以上の整数を半角英数で入力してください。');
        this.value = 0;
        this.emitter();
      }
   },
    // 親コンポネントに値を転送
    emitter() {
      this.$emit('changeCount', this.value)
    }
  }
}
</script>

<style scoped>

</style>