<template>
  <el-row style="width: 100%">
    <el-col :span="7"
      ><el-cascader
        style="width: 100%"
        filterable
        v-model="orderSearchObj.departure"
        :options="options"
        :props="props"
        @change="handleChange"
      ></el-cascader
    ></el-col>
    <el-col :span="3"
      ><el-button
        @click="$emit('swapAddress')"
        icon="el-icon-refresh"
        circle
      ></el-button
    ></el-col>
    <el-col :span="7"
      ><el-cascader
        style="width: 100%"
        v-model="orderSearchObj.destination"
        :options="options"
        :props="props"
        @change="handleChange"
      ></el-cascader
    ></el-col>
    <el-col :span="1"></el-col>
    <el-col :span="5">
      <el-date-picker
        style="width: 100%"
        v-model="orderSearchObj.date"
        align="right"
        type="date"
        placeholder="选择日期"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
      >
      </el-date-picker
    ></el-col>
    <el-col :span="1">
      <el-button
        icon="el-icon-delete"
        circle
        v-if="flag"
        @click="$emit('remove')"
      ></el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import {
  AlreadyOrderItem,
  CityListModel,
  CityModel,
  ResponseModel,
} from "../HomeClass";
import axios from "axios";
import { HomeServiceApi, OptionInterface } from "@/utils/api/HomeServiceApi";
export default defineComponent({
  props: {
    ordertype: Number,
    orderSearchObj: {
      type: AlreadyOrderItem,
      default: {
        departure: "",
        destination: "",
        date: new Date(),
      },
    },
  },
  emits: ["remove"],
  setup(props, ctx) {
    const flag = inject("isShowDelete", false);
    let { options } = cascaderUse();
    return { flag, options };
  },
});

//cascader part
const cascaderUse = () => {
  const values = reactive({
    cityList: [{ code: "a", cityList: [{ cityId: "", cityName: "" }] }],
    visitedCityList: [{ cityId: "", cityName: "" }],
  });
  const options = computed(() => {
    let cityMap: OptionInterface[] = values.cityList.map((cityList) => {
      return {
        label: cityList.code,
        value: cityList.code,
        children: cityList.cityList.map((city) => {
          return {
            label: city.cityName,
            value: city.cityId,
          };
        }),
      };
    });

    let visitedMap: OptionInterface[] = [
      {
        label: "曾去地",
        value: "曾去地",
        children: values.visitedCityList.map((city) => {
          return {
            label: city.cityName,
            value: city.cityId,
          };
        }),
      },
    ];

    return visitedMap.concat(cityMap);
  });
  const valuesRefs = toRefs(values);
  onMounted(async () => {
    let [allCityResult, allVistedCityResult] = await Promise.all([
      HomeServiceApi.fingAllCity(),
      HomeServiceApi.findAllVisitedCity(),
    ]);
    if (
      allCityResult.statusCode == 200 &&
      allVistedCityResult.statusCode == 200
    ) {
      values.cityList = allCityResult.data;
      values.visitedCityList = allVistedCityResult.data;
    }
  });
  return {
    valuesRefs,
    options,
  };
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>