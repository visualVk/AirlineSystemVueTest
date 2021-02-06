<template>
  <div class="container">
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="12" style="padding: 10px">
        <el-row
          style="margin-bottom: 10px; background: white"
          v-for="i in 4"
          :key="i"
        >
          <!-- TODO: for循环生成多个订单 -->
          <OrderListItem
            :isShowCancel="false"
            :isShowDetail="false"
          ></OrderListItem>
        </el-row>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6">
        <OrderPayCol></OrderPayCol>
        <div style="padding: 10px; text-align: center; width: 100%">
          <el-button
            style="width: inherit"
            type="primary"
            @click="payment.paymentCheckBtn"
            >如果支付完成，未跳转，轻点这</el-button
          >
        </div>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderPayCol from "@/components/Order/OrderConfirm/OrderPayCol/OrderPayCol.vue";
import OrderListItem from "@/components/profile/Main/OrderDisplayMain/OrderListItem/OrderListItem.vue";
import MessageBox from "element-plus/lib/el-message-box";

export default defineComponent({
  components: {
    OrderPayCol,
    OrderListItem,
  },
  setup() {
    const payment = usePayment();
    return { payment };
  },
});
const usePayment = () => {
  const paymentCheckBtn = () => {
    MessageBox.alert("支付成功");
  };
  return { paymentCheckBtn };
};
</script>

<style scoped>
.container {
  width: 100%;
}
</style>