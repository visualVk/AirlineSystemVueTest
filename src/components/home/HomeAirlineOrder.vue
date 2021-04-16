<template>
  <el-row style="width: 100%">
    <el-col :span="1" style="color: red" v-show="isWarning">*</el-col>
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
    <el-col :span="4">
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
  getCurrentInstance,
  inject,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import {
  AlreadyOrderItem,
  CityListModel,
  CityModel,
  ResponseModel,
} from "../HomeClass";
import { HomeServiceApi, OptionInterface } from "@/utils/api/HomeServiceApi";
export default defineComponent({
  props: {
    ordertype: Number,
    orderSearchObj: {
      type: AlreadyOrderItem,
      default: {
        departure: { cityFirstAlp: "", cityId: "", cityName: "" },
        destination: { cityFirstAlp: "", cityId: "", cityName: "" },
        date: new Date(),
      },
    },
  },
  data() {
    return {
      props: {
        emitPath: false,
      },
    };
  },
  emits: ["remove"],
  setup(props, ctx) {
    const flag = inject("isShowDelete", false);
    let { options } = cascaderUse();
    const orderObj = props.orderSearchObj;
    const isWarning = ref(false);
    const app = getCurrentInstance()?.appContext.config.globalProperties;
    const disabledDate = (time) => {
      return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
    };
    watch(orderObj, (oo, nn) => {
      if (nn.destination == nn.departure) {
        isWarning.value = true;
        app?.$alert("same", "警告", {
          confirmButtonText: "确定",
        });
      } else {
        isWarning.value = false;
      }
    });
    return { flag, options, isWarning, disabledDate };
  },
});

//cascader part
const cascaderUse = () => {
  const values = reactive({
    cityList: [{ cityFirstAlp: "A", cityList: [{ cityName: "", cityId: "" }] }],
    visitedCityList: [{ cityId: "", cityName: "" }],
  });
  const options = computed(() => {
    let cityMap: OptionInterface[] = values.cityList.map((cityList) => {
      return {
        label: cityList.cityFirstAlp,
        value: cityList.cityFirstAlp,
        children: cityList.cityList.map((city) => {
          return {
            label: city.cityName,
            value: city.cityId,
          };
        }),
      };
    });
    //TODO: 需要修改城市列表
    return cityMap;
  });
  const valuesRefs = toRefs(values);
  onMounted(async () => {
    let [allCityResult] = await Promise.all([HomeServiceApi.fingAllCity()]);
    if (allCityResult.code == 0) {
      values.cityList = allCityResult.data;
      // values.visitedCityList = allVistedCityResult.data;
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
.warning-border {
  border: 1px;
  border-color: red;
}
</style>