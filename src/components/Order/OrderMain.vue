<template>
  <div class="order_main_container">
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="12">
        <div class="passenge">
          <OrderCustomer></OrderCustomer>
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
            <OrderTicketBrief></OrderTicketBrief>
            <OrderBriefInfo></OrderBriefInfo>
          </el-row>
        </el-affix>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderTicketBrief from "@/components/Order/OrderTicketBrief/OrderTicketBrief.vue";
import OrderCustomer from "@/components/Order/OrderCustomer/OrderCustomer.vue";
import OrderBriefInfo from "@/components/Order/OrderBriefInfo/OrderBriefInfo.vue";

export default defineComponent({
  components: {
    OrderTicketBrief,
    OrderCustomer,
    OrderBriefInfo,
  },
  setup() {
    //TODO: 需要添加订购的机票信息
    return {};
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