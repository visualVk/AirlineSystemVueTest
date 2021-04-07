<!--
 * @Author: your name
 * @Date: 2021-02-05 10:45:33
 * @LastEditTime: 2021-04-06 17:54:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\Order\OrderConfirm\OrderPayCol\OrderPayCol.vue
-->
<template>
  <div class="container">
    <el-row>
      <!-- TODO: 之后用for循环生成多种支付方式 -->
      <OrderPayCollapse v-for="i in 1" :key="i"></OrderPayCollapse>
    </el-row>
    <el-row>
      <OrderBriefInfo></OrderBriefInfo>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderBriefInfo from "@/components/Order/OrderBriefInfo/OrderBriefInfo.vue";
import OrderPayCollapse from "@/components/Order/OrderConfirm/OrderPayCol/OrderPayCollapse/OrderPayCollapse.vue";

export default defineComponent({
  components: {
    OrderBriefInfo,
    OrderPayCollapse,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  padding: 10px;
}
.el-row {
  width: 100%;
}
</style>