<template>
  <el-row style="width: 100%">
    <el-col :span="7"
      ><el-cascader
        style="width: 100%"
        filterable
        v-model="value"
        :options="options"
        :props="props"
        @change="handleChange"
      ></el-cascader
    ></el-col>
    <el-col :span="3"
      ><el-button @click="swapAddress" icon="el-icon-refresh" circle></el-button
    ></el-col>
    <el-col :span="7"
      ><el-cascader
        style="width: 100%"
        v-model="value"
        :options="options"
        :props="props"
        @change="handleChange"
      ></el-cascader
    ></el-col>
    <el-col :span="1"></el-col>
    <el-col :span="5">
      <el-date-picker
        style="width: 100%"
        v-model="value2"
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
  <!-- <div class="block">
    <el-cascader
      v-model="value"
      :options="options"
      :props="props"
      @change="handleChange"
    ></el-cascader>
    <span class="demonstration"
      >&#160;<el-button
        @click="swapAddress"
        icon="el-icon-refresh"
        circle
      ></el-button
      >&#160;</span
    >
    <el-cascader
      v-model="value"
      :options="options"
      :props="props"
      @change="handleChange"
    ></el-cascader>
  </div> -->
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
import { CityListModel, CityModel, ResponseModel } from "../HomeClass";
import axios from "axios";
export default defineComponent({
  props: {
    ordertype: Number,
  },
  emits: ["remove"],
  setup(props, ctx) {
    const flag = inject("isShowDelete", false);
    let { options } = cascaderUse();
    return { flag, options };
  },
});

interface OptionInterface {
  label: string;
  value: string;
  children: {
    label: string;
    value: string;
  }[];
}

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
    console.log(cityMap);

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
    let [res, res2] = await Promise.all([
      axios.get<ResponseModel<CityListModel>>("/api/getAllCity"),
      axios.get<ResponseModel<CityModel>>("/api/getAllVisitedCity"),
    ]);
    let [data, data2] = [res.data, res2.data];
    // console.log(data);
    if (data.statusCode == 200 && data2.statusCode == 200) {
      values.cityList = data.data;
      values.visitedCityList = data2.data;
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