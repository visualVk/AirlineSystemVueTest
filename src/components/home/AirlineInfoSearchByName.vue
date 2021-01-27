<template>
  <el-row style="width: 100%">
    <el-col :span="16">
      <el-input placeholder="请输入内容，如G105" v-model="airlineIdStr">
        <template #prepend>航班编号</template>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-date-picker v-model="date" type="date" placeholder="选择日期">
      </el-date-picker>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, inject } from "vue";
import { AlreadyOrderItem } from "../HomeClass";

export default defineComponent({
  setup() {
    const date = inject("searchDate", new Date());
    const airlineIdStr = inject("airlineIdStr", "G10");
    return { date, airlineIdStr };
  },
});
</script>

<style scoped>
</style>