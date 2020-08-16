<template>
  <div>
    <span>材料名:</span>
    <input v-model="material" type="text" class="w-25">
    <span>量:</span>
    <input v-model="value" type="text" class="w-25">
    <span>単位:</span>
    <input v-model="unit" type="text" class="w-25 unit">
    <button class="btn btn-primary" @click="append">追加</button>

    <table class="table table-striped">
      <thead>
          <tr>
              <th>Name</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
          <!-- 各要素を表示 -->
<!--          <tr v-for="(elem, index) in elements">-->
<!--              <td>{{ elem.name }}</td>-->
<!--              &lt;!&ndash; クリックして要素を削除 &ndash;&gt;-->
<!--              <td><span v-on:click="remove(index)" class="glyphicon glyphicon-remove"></span></td>-->
<!--          </tr>-->
          <!-- 新しい要素を追加するための行 -->
          <tr>
              <td>
                  <input id="new-name" type="text">
              </td>
              <!-- クリックして要素を追加 -->
              <td>
<!--                  <span v-on:click="append" class="glyphicon glyphicon-plus"></span>-->
              </td>
          </tr>
      </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: "MaterialManager",

  data: function(){
    return {
      item:{
        material: '',
        value: 0,
        unit: ''
      }
    }
  },

  methods: {
    append: function(){
      this.item.material = this.material;
      this.item.material = this.value;
      this.item.material = this.unit;
      alert(this.item.material + this.item.value + this.item.unit);
    }
  }

}
</script>

<style scoped>

</style>