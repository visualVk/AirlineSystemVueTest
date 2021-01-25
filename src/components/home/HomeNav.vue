<template>
  <el-container style="height: 45px">
    <el-row style="width: 100%">
      <el-col :span="8" style="text-align: right; padding-right: 5%"
        >让你的旅行更幸福</el-col
      >
      <el-col :span="8"
        ><el-button type="text" icon="el-icon-bangzhu" size="small"
          >更换语言</el-button
        ></el-col
      >
      <el-col :span="8">
        <el-row>
          <el-space alignment="start" size="20" spacer="|" id="buttog-group">
            <el-button type="text">登录/注册</el-button>
            <el-button
              type="text"
              icon="el-icon-message-solid"
              style="color: #909399"
            >
              <el-badge is-dot>消息</el-badge>
            </el-button>
            <el-button
              type="text"
              icon="el-icon-s-ticket"
              style="color: #909399"
              >优惠券</el-button
            >
            <el-button
              type="text"
              icon="el-icon-s-management"
              style="color: #909399"
              >我的订单</el-button
            >
            <el-button
              type="text"
              icon="el-icon-s-custom"
              style="color: #909399"
              >客服中心</el-button
            >
          </el-space>
        </el-row>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  line-height: 45px;
}
</style>