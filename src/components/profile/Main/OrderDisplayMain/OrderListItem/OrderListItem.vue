<template>
  <div style="width: 100%; border: 1px solid #d9d9d9">
    <el-row class="head_row">
      <el-col :span="4"> 订单号：<span style="color: blue">{{}}</span> </el-col>
      <el-col :span="4">预定日期：<span>{{}}</span></el-col>
      <el-col :span="4">
        <el-button type="text" style="font-size: 16px" v-if="isShowCancel">
          取消订单
        </el-button>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <el-row class="content_row">
      <el-col :span="18" style="text-align: left; padding-left: 20px">
        <p style="font-size: 20px">
          <strong>{{}}到{{}}</strong>
        </p>
        <p style="font-size: 12px">出发时间：{{}}</p>
        <p style="font-size: 12px">乘客人：{{}}</p>
        <p style="font-size: 12px">
          座位：<span><strong>{{}}</strong></span>
        </p>
      </el-col>
      <el-col
        :span="6"
        style="text-align: right; height: 40px; line-height: 40px"
      >
        <div style="margin-right: 5px">
          <span class="price">￥{{}}</span>
          <el-divider direction="vertical"></el-divider>
          <!-- TODO: 之后将订单转台跟class做绑定 -->
          <span class="status_wait_travel">已取消</span>
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
import { defineComponent } from "vue";
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
  },
  setup() {
    const router = useRouter();
    const { orderDetailBtn } = useOrder(router);
    return { orderDetailBtn };
  },
});

const useOrder = (router: Router) => {
  const orderDetailBtn = () => {
    router.push({ path: "/orderDetail" });
  };
  return { orderDetailBtn };
};
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