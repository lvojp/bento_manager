<template>
  <label>
    {{ title }}:
    <input
        :type="type"
        :id="id"
        :value="value"
        @input="$emit('input', $event.target.value)"
        class="w-25"
    >
  </label>
</template>

<script>
export default {
  props: ["value", "title"],

  data() {
    return {
      type : 'number',
      ref :'',
    }
  },
  created () {
    this.value = '';
    if (this.title === '量') {
      this.type = 'number';
      this.id = 'input-value'
    }else if(this.title === '材料名'){
      this.type = 'text';
      this.id = 'input-ingredient';
    }else if(this.title === '単位'){
      this.type = 'text';
      this.id = 'input-unit';
    }
  }
}
</script>
