<template>
  <div class="row col-md-12">

    <header class="my-5 col-md-12 text-primary">
      <h1 class="text-center d-inline mr-1" style="font-size:1.5rem"><a @click="backToTop" href="#">お弁当マネージャー</a></h1>
      <p class="d-inline ml-3">ver0.89.3</p>
<!--            <h2 class="text-left">{{ title }}</h2>-->
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
