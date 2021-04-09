<!--
 * @Author: your name
 * @Date: 2021-02-01 14:48:44
 * @LastEditTime: 2021-04-09 13:15:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\OrderDisplayMain\OrderTabPanel\OrderTabPanel.vue
-->
<template>
  <el-row>
    <OrderSearchBar @popSort="popSort"></OrderSearchBar>
  </el-row>
  <!-- TODO: 之后要利用axios获取数据后，用数组进行for循环生成 -->
  <div class="order_list">
    <el-space direction="vertical" size="5">
      <OrderListItem
        v-for="ticket in showTicketList"
        :key="ticket.ticketId"
        :ticket="ticket"
      ></OrderListItem>
    </el-space>
  </div>
  <el-row style="text-align: center">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.curPage"
        :page-size="page.pagesize"
        layout="total, prev, pager, next"
        :total="page.total"
      >
      </el-pagination>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, ref, toRef, watch } from "vue";
import OrderListItem from "@/components/profile/Main/OrderDisplayMain/OrderListItem/OrderListItem.vue";
import OrderSearchBar from "@/components/profile/Main/OrderDisplayMain/OrderSearchBar/OrderSearchBar.vue";
import {
  AirlineTicketAllBO,
  AirlineTicketAllBOImpl,
} from "@/model/TicketEntity";
import { stores } from "@/utils/store/store";
import { AirlineInfoAllBO } from "@/utils/api/AirlineServiceApi";
import { useCommons } from "@/components/profile/Main/OrderDisplayMain/OrderTabPanel/OrderTabPanel";
export default defineComponent({
  components: {
    OrderListItem,
    OrderSearchBar,
  },
  props: {
    ticketList: {
      default: [
        {
          airlineDate: "",
          airlineId: "",
          airlineSeatId: "",
          createDate: "",
          gender: false,
          millisecond: 0,
          payUid: 0,
          price: 0,
          seatDetailInfoIndex: "",
          seatTypeId: "",
          seatTypeName: "",
          status: 0,
          ticketId: "",
          ticketTypeId: "",
          ticketTypeName: "",
          userNickname: "",
          username: "",
        },
      ],
    },
  },
  setup(props) {
    const _: any = inject("_");
    return _.merge({}, useCommons(props));
  },
});
</script>

<style scoped>
.order_list ::v-deep(.el-space),
.order_list ::v-deep(.el-space__item) {
  width: 100%;
}
</style>