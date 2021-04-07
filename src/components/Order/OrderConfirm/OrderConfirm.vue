<!--
 * @Author: your name
 * @Date: 2021-02-05 10:45:18
 * @LastEditTime: 2021-04-07 16:25:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\Order\OrderConfirm\OrderConfirm.vue
-->
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
            @click="paymentCheckBtn"
            >如果支付完成，未跳转，轻点这</el-button
          >
        </div>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  Ref,
  toRefs,
} from "vue";
import OrderPayCol from "@/components/Order/OrderConfirm/OrderPayCol/OrderPayCol.vue";
import OrderListItem from "@/components/profile/Main/OrderDisplayMain/OrderListItem/OrderListItem.vue";
import MessageBox from "element-plus/lib/el-message-box";
import { stores } from "@/utils/store/store";
import { useRouter } from "vue-router";
import { AirlineInfoServiceApi } from "@/utils/api";
import { AirlineTicketAllBO } from "@/model/TicketEntity";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    OrderPayCol,
    OrderListItem,
  },
  setup() {
    const payment = usePayment();
    const usemain = useMain();
    const _: any = inject("_");
    return _.merge({}, toRefs(payment), toRefs(usemain));
  },
});

const useMain = () => {
  const ticketList: Ref<Array<AirlineTicketAllBO>> = ref([]);
  const findTicket = async () => {
    const route = useRouter().currentRoute;
    const payUid = stores.getUser().uid;
    const airlineSeatId = route.value.query.airlineSeatId as string;
    let ticketRes = await AirlineInfoServiceApi.findTicketByQuerySet(
      { airlineSeatId: airlineSeatId, payUid: payUid, status: 0 },
      1,
      10
    );
    ticketList.value.length = 0;
    if (ticketRes.code == 0) {
      ticketRes.data.forEach((ticket) => {
        ticketList.value.push(ticket);
      });
    } else {
      ElMessage.error(ticketRes.message);
    }
    stores.isDebug
      ? console.log("[Order Confirm]=", "{ticketList}", ticketList.value)
      : "";
  };
  onMounted(() => {
    findTicket();
  });
  return { ticketList, findTicket };
};
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