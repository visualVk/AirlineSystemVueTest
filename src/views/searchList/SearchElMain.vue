<!--
 * @Author: your name
 * @Date: 2021-01-28 17:11:42
 * @LastEditTime: 2021-04-04 15:51:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\views\searchList\SearchElMain.vue
-->
<template>
  <div style="overflow-y: auto; height: 100%; width: 100%">
    <el-row style="width: 100%; background: white">
      <el-col :span="2"></el-col>
      <el-col :span="20"
        ><home-search-panel @queryAirline="queryAirline"></home-search-panel
      ></el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row style="width: 100%">
      <SearchListMain @pop-query="popQuery"></SearchListMain>
    </el-row>
    <el-row style="height: 40px"></el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from "vue";
import HomeSearchPanel from "@/components/home/HomeSearchPanel/HomeSearchPanel.vue";
import SearchListMain from "@/components/searchList/SearchListMain.vue";
import { queryAirlineConditionInterface } from "@/components/home/HomeSearchPanel/HomeSearchPanelObj";
import { AirlineInfoServiceApi } from "@/utils/api";
import { ElMessage } from "element-plus";
import { stores } from "@/utils/store/store";
import { dateFormat } from "@/utils/date/DateFormatUtil";
import { AirlineInfoQuerySet } from "@/utils/api/AirlineServiceApi";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    HomeSearchPanel,
    SearchListMain,
  },
  setup() {
    //表单验证
    const queryAirline = async (
      query: Array<queryAirlineConditionInterface>
    ) => {
      if (query[0].departure == "" || query[0].destination == "") {
        //验证是否输入城市
        ElMessage.error("请选择城市");
      } else {
        querySet.departureCityId = query[0].departure;
        querySet.destinationCityId = query[0].destination;
        querySet.airlineDate = dateFormat("YYYY-mm-dd HH:MM:SS", query[0].date);
        // stores.isDebug ? console.log("obj:", query[0]) : "";
      }
    };
    const { querySet } = useAirline();
    return { queryAirline, querySet };
  },
});

const useAirline = () => {
  //从route中获取城市
  const route = useRoute();
  stores.isDebug ? console.log("route param:", route.params) : "";
  const desId: string = route.params.destinationId as string;
  const depId: string = route.params.departureId as string;
  const airlineDate: string = route.params.airlineDate as string;
  stores.isDebug
    ? console.log("[desId,depId,date]", desId, depId, airlineDate)
    : "";
  //子空间所需要的querySet
  const querySet = reactive({
    departureCityId: depId,
    destinationCityId: desId,
    supTicketIds: [],
    airlineDate: dateFormat("YYYY-mm-dd HH:MM:SS", new Date(airlineDate)),
    airlineId: "",
  });
  provide("querySet", querySet);
  return { querySet };
};
</script>

<style scoped>
</style>