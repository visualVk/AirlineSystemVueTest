<!--
 * @Author: your name
 * @Date: 2021-02-03 11:52:14
 * @LastEditTime: 2021-04-07 09:46:59
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
          <OrderCustomer
            @updateNum="updateNum"
            @popCustomerList="popCustomerList"
          ></OrderCustomer>
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
import { defineComponent, inject, provide, reactive, ref, toRefs } from "vue";
import OrderTicketBrief from "@/components/Order/OrderTicketBrief/OrderTicketBrief.vue";
import OrderCustomer from "@/components/Order/OrderCustomer/OrderCustomer.vue";
import OrderBriefInfo from "@/components/Order/OrderBriefInfo/OrderBriefInfo.vue";
import { useCustom, useTicket } from "@/components/Order/OrderMain";

export default defineComponent({
  components: {
    OrderTicketBrief,
    OrderCustomer,
    OrderBriefInfo,
  },
  setup() {
    const _: any = inject("_");
    //TODO: 需要添加订购的机票信息
    const custom = useCustom();
    const {} = useTicket();
    return _.merge(toRefs(custom));
  },
});
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