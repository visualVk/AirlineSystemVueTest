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
import { AirlineInfoServiceApi } from "@/utils/api";
import { stores } from "@/utils/store/store";
import { ElMessage } from "element-plus";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { Router, useRouter } from "vue-router";

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
    const router = useRouter();
    const innertIsShowCancel = ref(true);
    const ticket = ref(props.ticket);
    const cityList = ref(["", ""]);
    const statusClass = reactive({
      status_cancel: (ticket.value?.status as number) == 2,
      status_wait_pay:
        (ticket.value?.status as number) == 0 ||
        (ticket.value?.status as number) == 3,
      status_wait_travel: (ticket.value?.status as number) == 1,
    });
    stores.isDebug
      ? console.log("[Order List Item]=", "{status}", ticket.value?.status)
      : "";
    stores.isDebug
      ? console.log("[Order List Item]=", "{status class}", statusClass)
      : "";
    const statusLB = computed(() => {
      const status = ticket.value?.status as number;
      innertIsShowCancel.value = Boolean(status != 2 && status != 5);
      stores.isDebug
        ? console.log(
            "[Order List Item]=",
            "{isSohowCancel}",
            innertIsShowCancel,
            "{status == 2?}",
            status != 2,
            "{status == 5?}",
            status != 5,
            false && true
          )
        : "";
      if (status == 0 || status == 3) return "未支付";
      else if (status == 2) return "已取消";
      else if (status == 4) return "等票中";
      else if (status == 1) return "待出行";
      else return "已使用";
    });
    stores.isDebug
      ? console.log("[Order List Item]=", "{status LB}", statusLB)
      : "";
    onMounted(async () => {
      let airlineInfoRes = await AirlineInfoServiceApi.findAirlineInfoByQuerySet(
        {
          airlineId: ticket.value?.airlineId,
          airlineDate: undefined,
          supTicketIds: undefined,
          departureCityId: undefined,
          destinationCityId: undefined,
        }
      );
      if (airlineInfoRes.code == 0) {
        cityList.value.length = 0;
        cityList.value.push(airlineInfoRes.data[0].departureCity.cityName);
        cityList.value.push(airlineInfoRes.data[0].destinationCity.cityName);
      } else {
        ElMessage.error(airlineInfoRes.message);
      }
    });
    const cancelOrder = async () => {
      let cancelRes = await AirlineInfoServiceApi.cancelTicketOrder(
        ticket.value?.ticketId!
      );
      if (cancelRes.code == 0) {
        ElMessage.success("取消成功");
      } else {
        ElMessage.error(cancelRes.message);
      }
    };
    const orderDetailBtn = () => {
      router.push({
        path: "/orderDetail",
        query: { ticketId: ticket.value?.ticketId },
      });
    };
    return { orderDetailBtn, cityList, cancelOrder, statusClass, statusLB };
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