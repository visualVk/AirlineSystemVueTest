<template>
  <div
    style="
      height: 100px;
      width: 100%;
      margin: 0%;
      padding: 0%;
      background: white;
    "
  >
    <el-row style="height: 80px">
      <el-col :span="3"> </el-col>
      <el-col :span="5">
        <el-image
          style="width: 250px; height: 80px"
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

    <el-row style="height: 20px; background: #2579d0"></el-row>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import airlinePic from "@/assets/airline-mark.jpg";
export default {
  setup() {
    const tel = reactive({
      serviceTel: "12821",
      hotLineTel: "1057-1231545645",
    });
    const url = ref(airlinePic);

    onMounted(() => {
      //todo:get tel
    });
    return { tel, url };
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