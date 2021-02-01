<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="first" style="min-height: 100px">
        <OrderTabPanel></OrderTabPanel>
      </el-tab-pane>
      <el-tab-pane label="未出行" name="second">
        <OrderTabPanel></OrderTabPanel>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="third">
        <OrderTabPanel></OrderTabPanel>
      </el-tab-pane>
      <el-tab-pane label="带点评" name="fourth">
        <OrderTabPanel></OrderTabPanel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderTabPanel from "@/components/profile/Main/OrderDisplayMain/OrderTabPanel/OrderTabPanel.vue";
export default defineComponent({
  components: {
    OrderTabPanel,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.container {
  background: white;
  padding: 10px 10px 10px 10px;
}
.container >>> .el-tabs__item {
  font-size: 20px !important;
}
.container >>> .el-tabs__item:focus.is-active.is-focus:not(:active) {
  -webkit-box-shadow: blue !important;
  box-shadow: blue !important;
}
</style>