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
          <el-col :span="4"
            ><el-button type="text" size="small">xxxx</el-button></el-col
          >
          <el-col :span="4"
            ><el-button type="text" size="small">xxxx</el-button></el-col
          >
          <el-col :span="4"
            ><el-button type="text" size="small">xxxx</el-button></el-col
          >
          <el-col :span="4"
            ><el-button type="text" size="small">xxxx</el-button></el-col
          >
          <el-col :span="4"
            ><el-button type="text" size="small">xxxx</el-button></el-col
          >
          <el-col :span="4"
            ><el-button type="text" size="small">xxxx</el-button></el-col
          >
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