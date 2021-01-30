<template>
  <el-row
    style="height: 75px; line-height: 75px; border-bottom: 1px solid #e4e7ed"
  >
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <!-- 航班公司选择 -->
      <el-row>
        <el-col :span="8">
          <el-select
            v-model="value2"
            multiple
            collapse-tags
            style="margin-left: 20px"
            placeholder="选择航班"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <!-- 排序选项 -->
        <el-col :span="16" style="text-align: right">
          <el-space size="10px">
            <el-radio-group v-model="radio">
              <el-radio :label="3">按价格排序</el-radio>
              <el-radio :label="6">按公司名排序</el-radio>
              <el-radio :label="9">按时间排序</el-radio>
            </el-radio-group>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-space>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.el-row {
  width: 100%;
}
</style>