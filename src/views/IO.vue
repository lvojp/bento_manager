<template>
  <div class="container">
    <div class="row">
      <Header title="Save and Load"></Header>
    </div>

    <div class="row mb-1">
      <h3>セーブ用</h3>
      <textarea class="col-md-12" id="text-to-save" name="toSaveJson" v-model="jsonMenusToSave" cols="100" rows="10"></textarea>
<!--      <p>{{jsonMenusToSave}}</p>-->
    </div>

    <div class="row mb-5">
      <button @click="textCopy" :class="copyButton">{{message}}</button>
    </div>

    <div class="row mb-1">
      <h3>ロード用</h3>
      <textarea class="col-md-12" name="toLoadJson" v-model="jsonMenusToLoad" cols="100" rows="10"></textarea>
<!--      <p>{{jsonMenusToLoad}}</p>-->
    </div>

    <div class="row">
      <button type="button" @click="loadMenus" class="btn btn-success col-md-5">ロードしてホームに戻る</button>
    </div>

  </div>
</template>

<script>
import Header from '@/components/Header'
import utilsMixin from '@/mixins/utils.js'

export default {
  mixins: [utilsMixin],
  name: "IO",
  components: {
    Header
  },
  props: {
    ioMenus: Array
  },

  data() {
    return {
      myMenus: [],
      jsonMenusToSave: '',
      jsonMenusToLoad: '',
      message: 'コピーする',
      copyButton: 'btn btn-success col-md-5'
    }
  },

  beforeMount() {
    this.myMenus = this.objectCopy(this.ioMenus)
    this.jsonMenusToSave = JSON.stringify(this.myMenus);
  },

  methods: {
    toHome() {
      this.$router.push({
        name: 'home',
        params: {homeMenus: this.myMenus}
      })
    },

    loadMenus() {
      try{
        this.myMenus = JSON.parse(this.jsonMenusToLoad);
        this.toHome()

      }catch (e) {
        alert('ファイルが壊れています' + e);
      }
    },

    textCopy() {
      let text = document.getElementById("text-to-save");
      text.select();
      document.execCommand('copy');
      this.message = 'コピー完了';
      this.copyButton = 'btn btn-primary col-md-5'
      setTimeout(() => {
        this.message = 'コピーする';
        this.copyButton = 'btn btn-success col-md-5'
      }, 3000);
    },
  }
}
</script>

