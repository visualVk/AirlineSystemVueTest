<template>
  <div class="container">
    <div class="container_bg">
      <el-row class="padding_20">
        <i class="el-icon-success success_icon">
          <span style="padding-left: 20px" class="succes_font">{{
            hintMsg
          }}</span>
        </i>
      </el-row>
      <el-row class="padding_20 text_left">
        <el-col :span="3" class="ticket_font">订单编号</el-col>
        <el-col :span="3" class="ticket_normal_font">111{{}}</el-col>
      </el-row>
      <el-row class="padding_20 text_left">
        <el-col :span="3" class="ticket_font">机票确认号</el-col>
        <el-col :span="3" class="ticket_normal_font">111{{}}</el-col>
      </el-row>
      <el-row style="height: 35px"></el-row>
      <el-row style="text-align: right">
        <el-col>
          <el-button type="primary" plain style="width: 100px">{{
            btnMsg
          }}</el-button>
          <el-button
            type="primary"
            plain
            style="width: 100px"
            v-if="orderDetailObj.ticketStatus != 2"
          >
            改签
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div style="height: 20px; width: 100%"></div>
    <div class="container_bg">
      <el-row class="padding_5 text_left padding_top_bottom_10 border">
        <el-col style="font-weight: bold; font-size: 20px">title{{}}</el-col>
      </el-row>
      <el-row class="padding_5 text_left padding_top_bottom_10 border">
        <el-col :span="5" class="ticket_font">出发时间</el-col>
        <el-col :span="19" style="font-weight: bold">
          {{ orderDetailObj.airlineDate }}
        </el-col>
      </el-row>
      <el-row class="padding_5 text_left padding_top_bottom_10 border">
        <el-col :span="5" class="ticket_font">乘客姓名</el-col>
        <el-col :span="19" style="font-weight: bold">{{
          orderDetailObj.username
        }}</el-col>
      </el-row>
      <el-row class="padding_5 text_left padding_top_bottom_10 border">
        <el-col :span="5" class="ticket_font">座位信息</el-col>
        <el-col :span="19" style="font-weight: bold">{{
          orderDetailObj.ticketStatus
        }}</el-col>
      </el-row>
      <el-row class="padding_5 text_left padding_top_bottom_10 border">
        <el-col :span="5" class="ticket_font">手机号</el-col>
        <el-col :span="19" style="font-weight: bold">{{}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from "vue";
import { OrderDetailImpl } from "@/components/profile/Main/OrderDetailMain/OrderTicketDetail/OrderTicketDetailHead.ts";
import dayjs from "dayjs";
export default defineComponent({
  props: {
    orderDetailObj: {
      type: OrderDetailImpl,
      default: {
        airlineTicketId: "s1",
        userId: "323232",
        username: "haha",
        airlineId: "A01",
        ticketType: "t01",
        ticketStatus: 1,
        airlineDate: dayjs(new Date()).format("YYYY-MM-DD"),
      },
    },
  },
  setup(props) {
    const { btnMsg, hintMsg } = useCommons(props);
    return { btnMsg, hintMsg };
  },
});

const useCommons = (props: any) => {
  const obj: Ref<OrderDetailImpl> = toRef(props, "orderDetailObj");
  const hintMsg = computed(() => {
    if (obj.value.ticketStatus == 0) {
      return "未支付";
    } else if (obj.value.ticketStatus == 1) {
      return "已支付";
    } else if (obj.value.ticketStatus == 2) {
      return "取消订单";
    } else return "";
  });
  const btnMsg = computed(() => {
    if (obj.value.ticketStatus == 1) {
      return "取消订单";
    } else if (obj.value.ticketStatus == 0) {
      return "支付";
    } else if (obj.value.ticketStatus == 2) {
      return "";
    }
  });
  return { btnMsg, hintMsg };
};
</script>

<style scoped>
.el-row {
  width: inherit;
}
.padding_20 {
  padding: 20px;
}
.padding_5 {
  padding: 5px;
}
.border {
  border-bottom: 1px solid #ccc;
}
.padding_top_bottom_10 {
  padding-top: 20px;
  padding-bottom: 20px;
}
.text_left {
  text-align: left;
}
.ticket_font {
  color: #999;
  font-size: 14px;
}
.ticket_normal_font {
  color: #333;
  font-size: 14px;
}
.container {
  width: inherit;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background: #f4f9ff;
}
.container_bg {
  width: inherit;
  padding: 10px;
  background: white;
}
.success_icon,
.succes_font {
  color: #00c853;
  font-size: 32px;
}
.succes_font {
  font-weight: 700;
  font-family: BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial,
    sans-serif;
}
.failure_icon,
.failure_font {
  color: #ccc;
  font-size: 32px;
}
.failure_font {
  font-weight: 700;
  font-family: BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial;
}
</style>