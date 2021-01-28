<template>
  <div class="card">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-tabs type="border-card">
          <el-tab-pane label="航班预定">
            <HomeSearchPanel></HomeSearchPanel>
          </el-tab-pane>
          <el-tab-pane label="航班动态"
            ><airline-information></airline-information
          ></el-tab-pane>
          <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane> -->
          <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
        </el-tabs>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {
  computed,
  getCurrentInstance,
  provide,
  reactive,
  readonly,
  ref,
  toRef,
  watch,
} from "vue";
import NoticeBar from "../commons/NoticeBar.vue";
import HomeAirlineOrder from "@/components/home/HomeAirlineOrder.vue";
import AirlineInformation from "@/components/home/AirlineInformation.vue";
import HomeSearchPanel from "@/components/home/HomeSearchPanel/HomeSearchPanel.vue";
export default {
  components: {
    NoticeBar,
    HomeAirlineOrder,
    AirlineInformation,
    HomeSearchPanel,
  },
  data() {
    return {};
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.el-tabs {
  border-radius: 15px;
}
.card {
  margin-top: 30px;
  height: 100%;
}
.text-item {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>