<template>
  <div class="container">
    <el-row>
      <!-- TODO: 之后用for循环生成多种支付方式 -->
      <OrderPayCollapse v-for="i in 2" :key="i"></OrderPayCollapse>
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