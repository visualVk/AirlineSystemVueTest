<!--
 * @Author: your name
 * @Date: 2021-02-03 11:52:14
 * @LastEditTime: 2021-04-04 17:36:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\Order\OrderMain.vue
-->
<template>
  <div class="order_main_container">
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="12">
        <div class="passenge">
          <OrderCustomer @updateNum="updateNum"></OrderCustomer>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6" style="padding-bottom: 20px">
        <el-affix target=".order_main_container" :offset="145">
          <el-row
            style="
              -moz-box-shadow: 2px 2px 5px #ccc;
              -webkit-box-shadow: 2px 2px 5px #ccc;
              box-shadow: 2px 2px 5px #ccc;
            "
          >
            <OrderTicketBrief
              :airlineInfo="airlineObj"
              :seatBO="seatBO"
            ></OrderTicketBrief>
            <OrderBriefInfo :orderList="orderObj"></OrderBriefInfo>
          </el-row>
        </el-affix>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref } from "vue";
import OrderTicketBrief from "@/components/Order/OrderTicketBrief/OrderTicketBrief.vue";
import OrderCustomer from "@/components/Order/OrderCustomer/OrderCustomer.vue";
import OrderBriefInfo from "@/components/Order/OrderBriefInfo/OrderBriefInfo.vue";
import { useRoute, useRouter } from "vue-router";
import { stores } from "@/utils/store/store";
import { AirlineInfo } from "@/model/AirlineEntity";
import { SeatBO } from "@/utils/api/AirlineServiceApi";

export default defineComponent({
  components: {
    OrderTicketBrief,
    OrderCustomer,
    OrderBriefInfo,
  },
  setup() {
    //TODO: 需要添加订购的机票信息
    const { orderObj, updateNum, airlineObj, seatBO } = useCustom();
    const {} = useTicket();
    return { orderObj, updateNum, airlineObj, seatBO };
  },
});

const useCustom = () => {
  const orderObj = reactive([
    {
      price: "123",
      num: "0",
      changeFee: "12",
    },
  ]);

  const curRoute = useRouter().currentRoute.value;
  //用于子控件机票信息显示
  const airlineObj = reactive(JSON.parse(curRoute.params.airlineObj as string));
  const seatBO = reactive(
    JSON.parse(curRoute.params.seatBO as string) as SeatBO
  );
  stores.isDebug
    ? console.log(
        "[airline obj]=",
        "{airlineObj}",
        airlineObj,
        "{seatBO}",
        seatBO
      )
    : "";
  const updateNum = (num: Number) => {
    orderObj[0].num = num.toString();
  };
  return { orderObj, updateNum, airlineObj, seatBO };
};
const useTicket = () => {
  //TODO: 获取路由中的参数，同时渲染
  stores.isDebug
    ? console.log(
        "[order main]={route param}",
        useRouter().currentRoute.value.params
      )
    : "";
  return {};
};
</script>

<style scoped>
.order_main_container {
  width: 100%;
  min-height: 500px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #eaf0f3;
}
.passenger {
  width: 100%;
  text-align: left;
  color: #234 !important;
  background: white;
  font-size: 12px !important;
  font-family: BlinkMacSystemFont, Helvetica, Arial, Tahoma, PingFang SC,
    Hiragino Sans GB, Lantinghei SC, Microsoft YaHei, sans-serif !important;
}
</style>