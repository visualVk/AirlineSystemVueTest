<template>
  <!-- TODO: 之后要利用axios获取数据后，用数组进行for循环生成 -->
  <div class="order_list">
    <el-space direction="vertical" size="5">
      <OrderListItem v-for="i in 4" :key="i"></OrderListItem>
    </el-space>
  </div>
  <el-row style="text-align: center">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage1"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="100"
      >
      </el-pagination>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from "vue";
import OrderListItem from "@/components/profile/Main/OrderDisplayMain/OrderListItem/OrderListItem.vue";

export default defineComponent({
  components: {
    OrderListItem,
  },
  props: {},
  setup(props) {
    return {};
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