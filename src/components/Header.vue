<template>
  <div class="row">
    <header class="my-5 col-md-12 text-center text-primary">
      <h2>{{ title }}</h2>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["title"],
  // data() {
  //   return {
  //     title: ''
  //   }
  // },
}

</script>
