<!--
 * @Author: your name
 * @Date: 2021-02-01 12:15:55
 * @LastEditTime: 2021-04-09 13:19:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\OrderDisplayMain\OrderDisplayMain.vue
-->
<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="全部订单" name="first" style="min-height: 100px">
        <OrderTabPanel :ticketList="passTicketList"></OrderTabPanel>
      </el-tab-pane>
      <el-tab-pane label="未出行" name="second">
        <OrderTabPanel :ticketList="passTicketList"></OrderTabPanel>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="third">
        <OrderTabPanel :ticketList="passTicketList"></OrderTabPanel>
      </el-tab-pane>
      <el-tab-pane label="带点评" name="forth">
        <OrderTabPanel :ticketList="passTicketList"></OrderTabPanel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  reactive,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
import OrderTabPanel from "@/components/profile/Main/OrderDisplayMain/OrderTabPanel/OrderTabPanel.vue";
import { useOrder } from "@/components/profile/Main/OrderDisplayMain/OrderDisplayMain";
export default defineComponent({
  components: {
    OrderTabPanel,
  },
  setup() {
    const _: any = inject("_");
    return _.merge({}, toRefs(useOrder()));
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