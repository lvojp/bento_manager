<template>
  <div>
    <MaterialRegister @addItem="appendItem($event, item)"></MaterialRegister>
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
import MaterialRegister from "@/components/MaterialRegister";

export default {
  name: "MaterialManager",

  components: {
    MaterialRegister
  },

  data: function(){
    return {
      items:[]
    }
  },

  methods: {
    appendItem: function(item){
      alert(item.material);
      alert(item.value);
      alert(item.unit);
      this.items.append(item);
      alert(this.items);
    }
  }
}
</script>

<style scoped>

</style>