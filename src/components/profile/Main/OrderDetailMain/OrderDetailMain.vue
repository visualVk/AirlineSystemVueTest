<!--
 * @Author: your name
 * @Date: 2021-02-02 15:24:22
 * @LastEditTime: 2021-04-09 11:48:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\OrderDetailMain\OrderDetailMain.vue
-->
<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="3"></el-col>
      <el-col :span="12">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'ProfileMe' }"
            >个人首页</el-breadcrumb-item
          >
          <el-breadcrumb-item :to="{ name: 'ProfileOrder' }"
            >订单</el-breadcrumb-item
          >
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="9"></el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="3"></el-col>
      <el-col :span="11">
        <!-- TODO: 以后要用axios获取添加属性 -->
        <OrderTicketDetailHead></OrderTicketDetailHead>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6">
        <OrderProvider></OrderProvider>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, reactive } from "vue";
import OrderProvider from "@/components/profile/Main/OrderDetailMain/OrderProvider/OrderProvider.vue";
import OrderTicketDetailHead from "@/components/profile/Main/OrderDetailMain/OrderTicketDetail/OrderTicketDetailHead.vue";
import { AirlineInfoServiceApi } from "@/utils/api";
import { stores } from "@/utils/store/store";
import { ElMessage } from "element-plus";
import { AirlineTicketAllBOImpl } from "@/model/TicketEntity";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    OrderProvider,
    OrderTicketDetailHead,
  },
  setup() {
    const ticket = reactive(new AirlineTicketAllBOImpl());
    provide("ticket", ticket);
    const route = useRouter().currentRoute;
    const findTicketById = async () => {
      let ticketRes = await AirlineInfoServiceApi.findTIcketById(
        route.value.query.ticketId as string
      );
      if (ticketRes.code == 0) {
        stores.isDebug
          ? console.log(
              "[Order Detail Main]",
              "{ticket result}",
              ticketRes.data
            )
          : "";
        const ticketResD1 = ticketRes.data[0];
        const keys = Object.keys(ticketResD1);
        for (const key of keys) {
          if (ticketResD1[key] != undefined) {
            ticket[key] = ticketResD1[key];
          }
        }
        stores.isDebug
          ? console.log("[Order Ticket Detail]=", "{ticket}", ticket)
          : "";
      } else {
        ElMessage.error("查询出错");
      }
    };
    onMounted(() => {
      findTicketById();
    });
    return {};
  },
});
</script>

<style scoped>
</style>