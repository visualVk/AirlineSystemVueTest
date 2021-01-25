<template>
  <div>
    <el-tag type="warning" class="notice">
      <el-row>
        <el-col :span="1" style="text-align: right"
          ><i
            class="el-icon-warning"
            style="background: color-warning; margin-right: 10px"
          ></i
        ></el-col>
        <el-col :span="21"
          ><span class="title">重要通知：</span>{{ noticeMsg }}</el-col
        >
        <el-col :span="2"><slot></slot></el-col>
      </el-row>
    </el-tag>
  </div>
</template>

<script>
import { inject, provide } from "vue";
export default {
  setup() {
    const noticeMsg = inject("notice", "normal information");

    return { noticeMsg };
  },
};
</script>

<style lang="scss" scoped>
.notice {
  width: 100%;
  text-align: left;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.title {
  font-weight: 600;
}
</style>