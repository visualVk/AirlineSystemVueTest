<template>
  <div class="container">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="10">
        <el-row></el-row>
        <el-row>
          <el-space direction="vertical" alignment="start" wrap>
            <div style="font-size: 18px; line-height: 1.5">注意事项</div>
            <div v-for="o in msgList" :key="o">
              <el-link type="info" style="font-size: 12px">{{ o }}</el-link>
            </div>
          </el-space>
        </el-row>
        <el-row></el-row>
      </el-col>
      <el-col :span="10">
        <el-row></el-row>
        <el-row>
          <el-col :span="12" style="text-align: right; padding-right: 10px">
            <el-image style="height: 100px; width: 100px"></el-image>
          </el-col>
          <el-col :span="12">
            <el-space direction="vertical" alignment="start" wrap>
              <div style="font-size: 18px; line-height: 1.5">注意事项</div>
              <div
                v-for="o in picInTroductionList"
                :key="o"
                style="font-size: 12px; color: #909399"
              >
                {{ o }}
              </div>
            </el-space>
          </el-col>
        </el-row>
        <el-row></el-row>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const msgList = ref([
      "机票预订服务提供方：上海华程西南国际旅行社有限公司",
      "关于禁止携带危险品乘机的通知",
      "关于欺诈短信电话的提醒",
    ]);
    const picInTroductionList = ref([
      "携程APP",
      "享手机订单优惠",
      "随时随地查订单",
    ]);
    return { msgList, picInTroductionList };
  },
});
</script>

<style scoped>
.el-row {
  height: 20px;
}
.container {
  height: 120px;
}
/* .el-row {
  height: 50px;
} */
.demonstration {
  height: 50px;
  width: 50px;
}
</style>