<!--
 * @Author: your name
 * @Date: 2021-01-23 11:10:29
 * @LastEditTime: 2021-04-07 09:29:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\home\HomeSearchBar.vue
-->
<template>
  <div class="card">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-tabs type="border-card">
          <el-tab-pane label="航班预定">
            <HomeSearchPanel @queryAirline="queryAirline"></HomeSearchPanel>
          </el-tab-pane>
          <el-tab-pane label="航班动态">
            <airline-information></airline-information>
          </el-tab-pane>
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
import {
  AlreadyOrderItemInterface,
  queryAirlineConditionInterface,
} from "./HomeSearchPanel/HomeSearchPanelObj";
import { Router, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { stores } from "@/utils/store/store";
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
    const router = useRouter();
    const { queryAirline } = useAirlineOrder(router);
    return { queryAirline };
  },
};

const useAirlineOrder = (router: Router) => {
  const queryAirline = (obj: Array<queryAirlineConditionInterface>) => {
    // stores.isDebug ? console.log(obj.departure == null) : "";
    if (obj[0].departure == "" || obj[0].destination == "") {
      //验证是否输入城市
      ElMessage.error("请选择城市");
    } else {
      stores.isDebug ? console.log("obj:", obj[0]) : "";
      router.push({
        name: "QueryAirline",
        query: {
          departureId: obj[0].departure,
          destinationId: obj[0].destination,
          airlineDate: obj[0].date.toString(),
        },
      });
    }
  };
  return { queryAirline };
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