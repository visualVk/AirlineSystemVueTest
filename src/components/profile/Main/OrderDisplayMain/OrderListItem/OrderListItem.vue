<template>
  <div style="width: 100%; border: 1px solid #d9d9d9">
    <el-row class="head_row">
      <el-col :span="4">
        订单号：<span style="color: blue">{{ ticket.ticketId }}</span>
      </el-col>
      <el-col :span="8"
        >预定日期：<span>{{ ticket.createDate }}</span></el-col
      >
      <el-col :span="4">
        <el-button
          type="text"
          style="font-size: 16px"
          v-if="isShowCancel && innertIsShowCancel"
          @click="cancelOrder"
        >
          取消订单
        </el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row class="content_row">
      <el-col :span="18" style="text-align: left; padding-left: 20px">
        <p style="font-size: 20px">
          <strong>{{ cityList[0] }}到{{ cityList[1] }}</strong>
        </p>
        <p style="font-size: 12px">出发时间：{{ ticket.airlineDate }}</p>
        <p style="font-size: 12px">乘客人：{{ ticket.userNickname }}</p>
        <p style="font-size: 12px">
          座位：<span>
            <strong>
              {{ ticket.seatTypeName }}
              -
              {{ ticket.seatDetailInfoIndex }}
            </strong>
          </span>
        </p>
      </el-col>
      <el-col
        :span="6"
        style="text-align: right; height: 40px; line-height: 40px"
      >
        <div style="margin-right: 5px">
          <span class="price">￥{{ ticket.price }}</span>
          <el-divider direction="vertical"></el-divider>
          <!-- TODO: 之后将订单转台跟class做绑定 -->
          <span :class="statusClass">{{ statusLB }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="btn_row">
      <el-col :span="18"></el-col>
      <el-col :span="6" style="text-align: right">
        <el-button
          style="margin-right: 5px"
          @click="orderDetailBtn"
          v-if="isShowDetail"
        >
          查看详情
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {
  AirlineTicketAllBO,
  AirlineTicketAllBOImpl,
} from "@/model/TicketEntity";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { useCommons } from "@/components/profile/Main/OrderDisplayMain/OrderListItem/OrderListItem";
export default defineComponent({
  props: {
    isShowDetail: {
      type: Boolean,
      default: true,
    },
    isShowCancel: {
      type: Boolean,
      default: true,
    },
    ticket: AirlineTicketAllBOImpl,
  },
  setup(props) {
    const _: any = inject("_");
    return _.merge({}, useCommons(props));
  },
});
</script>

<style scoped>
.el-row {
  width: 100%;
}
.head_row {
  height: 45px;
  line-height: 45px;
  background: #f6f6f6;
  padding: 0;
  margin: 0;
}
.content_row {
  height: 100px;
}
.btn_row {
  height: 50px;
}
.price {
  color: #e56700;
  font-size: 16px;
  line-height: 20px;
  vertical-align: middle;
  font-weight: 700;
}
.status_cancel,
.status_wait_pay,
.status_wait_travel {
  font-size: 16px;
  line-height: 20px;
  font-family: Microsoft YaHei, Tahoma, SimSun, Verdana, Arial, sans-serif;
}
.status_cancel {
  color: #666;
}
.status_wait_pay {
  color: coral;
}
.status_wait_travel {
  color: #67c23a;
}
</style>