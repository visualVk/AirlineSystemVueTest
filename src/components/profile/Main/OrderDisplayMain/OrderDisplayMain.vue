<!--
 * @Author: your name
 * @Date: 2021-02-01 12:15:55
 * @LastEditTime: 2021-04-09 10:22:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\OrderDisplayMain\OrderDisplayMain.vue
-->
<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="全部订单" name="first" style="min-height: 100px">
        <OrderTabPanel :ticketList="passTicketList"></OrderTabPanel>
      </el-tab-pane>
      <el-tab-pane label="未出行" name="second">
        <OrderTabPanel :ticketList="passTicketList"></OrderTabPanel>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="third">
        <OrderTabPanel :ticketList="passTicketList"></OrderTabPanel>
      </el-tab-pane>
      <el-tab-pane label="带点评" name="forth">
        <OrderTabPanel :ticketList="passTicketList"></OrderTabPanel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  reactive,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
import OrderTabPanel from "@/components/profile/Main/OrderDisplayMain/OrderTabPanel/OrderTabPanel.vue";
import {
  AirlineTicketAllBO,
  AirlineTicketAllBOImpl,
} from "@/model/TicketEntity";
import { AirlineInfoServiceApi } from "@/utils/api";
import { stores } from "@/utils/store/store";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  components: {
    OrderTabPanel,
  },
  setup() {
    const _: any = inject("_");
    return _.merge({}, toRefs(useOrder()));
  },
});

const useOrder = () => {
  const activeName = ref("first");
  const ticketList: Ref<Array<AirlineTicketAllBO>> = ref([]);
  const passTicketList: Ref<Array<AirlineTicketAllBO>> = ref([]);
  const findTicketListByUsername = async () => {
    let ticketListRes = await AirlineInfoServiceApi.findTicketByQuerySet(
      {
        username: undefined,
        payUid: stores.getUser().uid,
        airlineSeatId: undefined,
        status: undefined,
      },
      1,
      100000000
    );
    if (ticketListRes.code == 0) {
      ticketList.value.length = 0;
      passTicketList.value.length = 0;
      ticketListRes.data.forEach((ticket) => {
        ticketList.value.push(ticket);
        passTicketList.value.push(reactive(ticket));
      });
      // passTicketList.value.length = 0;
      // passTicketList.value = ticketList.value;
      stores.isDebug
        ? console.log(
            "[Order Dipslay Main]=",
            "{ticket list}",
            ticketList.value,
            "{pass ticket list}",
            passTicketList.value
          )
        : "";
    } else {
      ElMessage.error("查询出错");
    }
  };
  const handleClick = (name: string) => {
    console.log("name=", name);
  };
  watch(activeName, (nn, oo) => {
    passTicketList.value.length = 0;
    if (nn == "first") {
      //全部订单，不过滤
      ticketList.value.forEach((ticket) => {
        passTicketList.value.push(ticket);
      });
    } else if (nn == "second") {
      ticketList.value.forEach((ticket) => {
        if (ticket.status == 1) passTicketList.value.push(ticket);
      });
    } else if (nn == "third") {
      ticketList.value.forEach((ticket) => {
        if (ticket.status == 0 || ticket.status == 3)
          passTicketList.value.push(ticket);
      });
    } else if (nn == "forth") {
      ticketList.value.forEach((ticket) => {
        if (ticket.status == 5) passTicketList.value.push(ticket);
      });
    }
    stores.isDebug
      ? console.log(
          "[Order Display Main]=",
          "{nn}",
          nn,
          "{active name}",
          activeName.value,
          "{ticket list}",
          ticketList.value,
          "{pass ticket list}",
          passTicketList.value
        )
      : "";
  });
  onMounted(() => {
    findTicketListByUsername();
  });
  return {
    ticketList,
    findTicketListByUsername,
    passTicketList,
    activeName,
    handleClick,
  };
};
</script>

<style scoped>
.container {
  background: white;
  padding: 10px 10px 10px 10px;
}
.container >>> .el-tabs__item {
  font-size: 20px !important;
}
.container >>> .el-tabs__item:focus.is-active.is-focus:not(:active) {
  -webkit-box-shadow: blue !important;
  box-shadow: blue !important;
}
</style>