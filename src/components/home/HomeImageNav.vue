<template>
  <el-container style="height: 100px; width: 100%; margin: 0%; padding: 0%">
    <el-row>
      <el-col :span="4"> </el-col>
      <el-col :span="4">
        <el-image
          style="width: 200px; height: 100px"
          :src="url"
          :fit="fit"
        ></el-image>
      </el-col>
      <el-col :span="4"> </el-col>
      <el-col
        :span="12"
        style="text-align: right; line-height: 25px; padding-right: 20px"
        ><p>客服电话:{{ tel.serviceTel }}</p>
        <p>举报电话:{{ tel.hotLineTel }}</p>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { onMounted, reactive } from "vue";
export default {
  setup() {
    const tel = reactive({
      serviceTel: "12821",
      hotLineTel: "1057-1231545645",
    });

    onMounted(() => {
      //todo:get tel
    });
    return { tel };
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0%;
}
.el-container .el-row {
  width: 100%;
}
.el-container {
  background: white;
}
</style>