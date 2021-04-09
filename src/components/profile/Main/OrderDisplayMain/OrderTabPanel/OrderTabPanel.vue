<!--
 * @Author: your name
 * @Date: 2021-02-01 14:48:44
 * @LastEditTime: 2021-04-09 09:41:10
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
import { computed, defineComponent, Ref, ref, toRef, watch } from "vue";
import OrderListItem from "@/components/profile/Main/OrderDisplayMain/OrderListItem/OrderListItem.vue";
import OrderSearchBar from "@/components/profile/Main/OrderDisplayMain/OrderSearchBar/OrderSearchBar.vue";
import {
  AirlineTicketAllBO,
  AirlineTicketAllBOImpl,
} from "@/model/TicketEntity";
import { stores } from "@/utils/store/store";
import { AirlineInfoAllBO } from "@/utils/api/AirlineServiceApi";
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
    const ticketList = ref(props.ticketList);
    const showTicketList: Ref<typeof ticketList.value> = ref([]);
    showTicketList.value.length = 0;
    const page = ref({
      pagesize: 5,
      total: ticketList.value.length,
      curPage: 1,
    });
    // watch(ticketList.value, (oo, nn) => {
    //   stores.isDebug ? console.log("[Order Tab Panel]=", oo, nn) : "";
    //   page.value.pageSize = oo.length;
    // });
    //排序规则
    const popSort = (label: number) => {
      stores.isDebug ? console.log("[Order Tab Panel]=", "{label}", label) : "";
      page.value.curPage = 1;
      if (label == 1) {
        ticketList.value.sort((a, b) => {
          if (a.airlineDate == b.airlineDate) {
            return a.ticketId < b.ticketId ? -1 : 1;
          } else {
            return a.airlineDate < b.airlineDate ? -1 : 1;
          }
        });
      } else if (label == 2) {
        ticketList.value.sort((a, b) => {
          if (a.airlineDate == b.airlineDate) {
            return a.ticketId < b.ticketId ? -1 : 1;
          } else {
            return a.airlineDate > b.airlineDate ? -1 : 1;
          }
        });
      } else if (label == 3) {
        ticketList.value.sort((a, b) => {
          if (a.price == b.price) {
            return a.ticketId < b.ticketId ? -1 : 1;
          } else {
            return a.price < b.price ? -1 : 1;
          }
        });
      } else if (label == 4) {
        ticketList.value.sort((a, b) => {
          if (a.price == b.price) {
            return a.ticketId < b.ticketId ? -1 : 1;
          } else {
            return a.price > b.price ? -1 : 1;
          }
        });
      }
      showTicketList.value = ticketList.value.slice(0, 5);
      stores.isDebug
        ? console.log(
            "[Order Tab Panel]=",
            "{show ticket list}",
            showTicketList.value
          )
        : "";
    };
    const handleCurrentChange = (cur: number) => {
      page.value.curPage = cur;
    };
    ticketList.value.sort((a, b) => {
      if (a.airlineDate == b.airlineDate) {
        return a.ticketId < b.ticketId ? -1 : 1;
      } else {
        return a.airlineDate < b.airlineDate ? -1 : 1;
      }
    });
    watch(ticketList.value, (oo, nn) => {
      page.value.total = nn.length;
      showTicketList.value = ticketList.value.slice(0, 5);
    });
    watch(page.value, (oo, nn) => {
      // console.log(oo, nn);
      showTicketList.value = ticketList.value.slice(
        (nn.curPage - 1) * nn.pagesize,
        nn.curPage * nn.pagesize
      );
    });
    return { page, showTicketList, handleCurrentChange, popSort };
  },
});

const useCommons = (props: any) => {
  return {};
};
</script>

<style scoped>
.order_list ::v-deep(.el-space),
.order_list ::v-deep(.el-space__item) {
  width: 100%;
}
</style>