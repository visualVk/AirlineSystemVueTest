<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="3"></el-col>
      <el-col :span="12">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>个人首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="9"></el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="3"></el-col>
      <el-col :span="11">
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
import { defineComponent } from "vue";
import OrderProvider from "@/components/profile/Main/OrderDetailMain/OrderProvider/OrderProvider.vue";
import OrderTicketDetailHead from "@/components/profile/Main/OrderDetailMain/OrderTicketDetail/OrderTicketDetailHead.vue";

export default defineComponent({
  components: {
    OrderProvider,
    OrderTicketDetailHead,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>