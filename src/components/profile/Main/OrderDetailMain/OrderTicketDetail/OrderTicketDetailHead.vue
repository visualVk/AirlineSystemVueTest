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
        <el-col :span="3" class="ticket_normal_font">{{
          ticket.ticketId
        }}</el-col>
      </el-row>
      <el-row class="padding_20 text_left">
        <el-col :span="3" class="ticket_font">机票确认号</el-col>
        <el-col :span="3" class="ticket_normal_font">{{
          ticket.ticketId
        }}</el-col>
      </el-row>
      <el-row style="height: 35px"></el-row>
      <el-row style="text-align: right">
        <el-col>
          <el-button
            type="primary"
            plain
            style="width: 100px"
            v-if="ticket.status != 2 && ticket.status != 5"
            @click="btnClick"
            >{{ btnMsg }}</el-button
          >
          <!-- <el-button
            type="primary"
            plain
            style="width: 100px"
            v-if="orderDetailObj.ticketStatus != 2"
          >
            改签
          </el-button> -->
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
          {{ ticket.airlineDate }}
        </el-col>
      </el-row>
      <el-row class="padding_5 text_left padding_top_bottom_10 border">
        <el-col :span="5" class="ticket_font">乘客姓名</el-col>
        <el-col :span="19" style="font-weight: bold">{{
          ticket.userNickname
        }}</el-col>
      </el-row>
      <el-row class="padding_5 text_left padding_top_bottom_10 border">
        <el-col :span="5" class="ticket_font">座位信息</el-col>
        <el-col :span="19" style="font-weight: bold">{{
          ticket.seatDetailInfoIndex
        }}</el-col>
      </el-row>
      <el-row class="padding_5 text_left padding_top_bottom_10 border">
        <el-col :span="5" class="ticket_font">邮箱</el-col>
        <el-col :span="19" style="font-weight: bold">463806017@qq.com</el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  Ref,
  toRef,
  toRefs,
} from "vue";
import {
  OrderDetailImpl,
  useCommons,
} from "@/components/profile/Main/OrderDetailMain/OrderTicketDetail/OrderTicketDetailHead";
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
    const _: any = inject("_");
    return _.merge({}, toRefs(useCommons(props)));
  },
});
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