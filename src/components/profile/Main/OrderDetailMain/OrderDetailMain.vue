<!--
 * @Author: your name
 * @Date: 2021-02-02 15:24:22
 * @LastEditTime: 2021-04-09 13:12:20
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
import {
  defineComponent,
  inject,
  onMounted,
  provide,
  reactive,
  toRefs,
} from "vue";
import OrderProvider from "@/components/profile/Main/OrderDetailMain/OrderProvider/OrderProvider.vue";
import OrderTicketDetailHead from "@/components/profile/Main/OrderDetailMain/OrderTicketDetail/OrderTicketDetailHead.vue";
import { useCommons } from "@/components/profile/Main/OrderDetailMain/OrderDetailMain";

export default defineComponent({
  components: {
    OrderProvider,
    OrderTicketDetailHead,
  },
  setup() {
    const _: any = inject("_");
    return _.merge({}, toRefs(useCommons()));
  },
});
</script>

<style scoped>
</style>