<template>
  <div class="row">

    <header class="my-5 col-md-12 text-primary">
      <h1 class="text-center d-inline"><a @click="backToTop" href="#">材料マネージャー</a></h1>
      <p class="d-inline ml-3">ver0.85</p>
      <!--      <h2 class="text-left">{{ title }}</h2>-->
    </header>
  </div>
</template>

<script>
import utilsMixin from '@/mixins/utils.js'

export default {
  mixins: [utilsMixin],
  name: "Header",
  props: ["title"],
  methods: {
    backToTop() {
      this.$router.push({
        name: 'home',
        // params: {homeMenus: this.editMenus}
      })
    }
  }
}

</script>
