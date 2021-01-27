<template>
  <el-row>
    <el-space direction="vertical" alignment="start" :size="30">
      <el-radio-group v-model="switchOn">
        <el-radio :label="false">按航班号查询</el-radio>
        <el-radio :label="true">按升降地查询</el-radio>
      </el-radio-group>
    </el-space>
  </el-row>
  <el-row>
    <home-airline-order
      v-if="switchOn"
      :orderSearchObj="airlineObj"
      @swapAddress="swapAddress"
    ></home-airline-order>
    <airline-info-search-by-name
      v-else
      :date="airlineObj.date"
      :airlineIdStr="airlineIdStr"
    ></airline-info-search-by-name>
  </el-row>
  <el-row style="margin-top: 20px; width: 100%">
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <el-button icon="el-icon-search" type="primary" @click="searchBtn" round
        >搜索</el-button
      >
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, ref } from "vue";
import HomeAirlineOrder from "@/components/home/HomeAirlineOrder.vue";
import AirlineInfoSearchByName from "@/components/home/AirlineInfoSearchByName.vue";

export default defineComponent({
  components: {
    HomeAirlineOrder,
    AirlineInfoSearchByName,
  },
  data() {
    return {
      switchOn: false,
    };
  },
  setup() {
    const { swapAddress, airlineObj } = SearchByDepAndDes();
    const { airlineIdStr } = SearchByAirlineId();
    provide("airlineIdStr", airlineIdStr);
    provide("searchDate", airlineObj.date);
    const queryItem = computed(() => {
      return {
        airlineId: airlineIdStr.value,
        destination: airlineObj.destination,
        departure: airlineObj.departure,
        date: airlineObj.date,
      };
    });
    const searchBtn = () => {
      console.log(queryItem);
    };
    return { queryItem, airlineObj, swapAddress, airlineIdStr, searchBtn };
  },
});

const SearchByDepAndDes = () => {
  const airlineObj = reactive({
    departure: "",
    destination: "",
    date: new Date(),
  });
  const swapAddress = () => {
    let tmp = airlineObj.departure;
    airlineObj.departure = airlineObj.destination;
    airlineObj.destination = tmp;
  };
  return {
    airlineObj,
    swapAddress,
  };
};

const SearchByAirlineId = () => {
  const airlineIdStr = ref("G105");
  return {
    airlineIdStr,
  };
};

interface QueryModel {
  airlineId: string;
  departure: string;
  destination: string;
  date: Date;
}
</script>

<style scoped>
</style>