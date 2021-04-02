<template>
  <el-row style="width: 100%; height: 70px; line-height: 70px">
    <el-col :span="2"></el-col>
    <el-col :span="20" style="text-align: left">
      <span
        >第&nbsp;<span style="font-size: 20px"><strong>1</strong></span
        >&nbsp;趟：&nbsp;</span
      >
      <span style="font-size: 20px">
        <strong>
          {{ depCity.cityName }}
          <i class="el-icon-right"> </i>
          {{ desCity.cityName }}
        </strong>
      </span>
      <span> &nbsp;{{ showDate }} </span>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <el-row style="width: 100%">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <!-- TODO: 未来需要通过数据for循环创建 -->
      <div style="background: white">
        <SearchSelectBar></SearchSelectBar>
        <SearchListAirlineItem
          v-for="airline in airlineInfoAllList"
          :key="airline.airlineSeatId"
          :airlineInfoObj="airline"
        >
        </SearchListAirlineItem>
      </div>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  provide,
  reactive,
  ref,
  Ref,
  toRef,
  watch,
} from "vue";
import { TitleObjInterface } from "@/components/searchList/SearchListTitle/SearchListTitle.ts";
import SearchListAirlineItem from "@/components/searchList/SearchListAirlineItem/SearchListAirlineItem.vue";
import SearchSelectBar from "@/components/searchList/SearchSelectBar/SearchSelectBar.vue";
import { dateFormat } from "@/utils/date/DateFormatUtil";
import { AirlineSortRule } from "@/utils/sortrule/AirlineInfoSortRule";
import {
  AirlineInfoAllBO,
  AirlineInfoServiceApi,
  City,
} from "@/utils/api/AirlineServiceApi";
import { stores } from "@/utils/store/store";
import { useRoute, useRouter } from "vue-router";
import { CityServiceApi } from "@/utils/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {
    SearchListAirlineItem,
    SearchSelectBar,
  },
  props: {
    titleObj: {
      default: {
        title: "ddd",
        departure: "wz",
        destination: "bj",
        date: new Date(),
      },
    },
  },
  setup(props, ctx) {
    const airlineSortRule = ref(AirlineSortRule.sortByCompanyName);
    provide("airlineSortRule", airlineSortRule);
    const { showDate } = useTitle(props);
    const {
      airlineInfoAllList,
      findAirlineInfoByQuerySet,
      findCity,
      querySet,
      desCity,
      depCity,
    } = useAirlineInfo();
    /** 监听排序规则的改变，同时对数组重新排序 */
    watch(airlineSortRule, (oo, nn) => {
      // stores.isDebug ? console.log(nn) : "";
      switch (nn) {
        case AirlineSortRule.sortByCompanyNameDesc: //公司名称降序
          airlineInfoAllList.value.sort((a, b) => {
            if (a.companyName < b.companyName) return -1;
            if (a.companyName == b.companyName) return 0;
            return 1;
          });
          break;
        case AirlineSortRule.sortByCompanyName: //公司名称升序
          airlineInfoAllList.value.sort((a, b) => {
            if (a.companyName < b.companyName) return 1;
            if (a.companyName == b.companyName) return 0;
            return -1;
          });
          break;
        case AirlineSortRule.sortByTime: //出发时间升序
          airlineInfoAllList.value.sort((a, b) => {
            if (a.airlineDate < b.airlineDate) return 1;
            if (a.airlineDate == b.airlineDate) return 0;
            return -1;
          });
          break;
        case AirlineSortRule.sortByTimeDesc: //出发时间降序
          airlineInfoAllList.value.sort((a, b) => {
            if (a.airlineDate < b.airlineDate) return -1;
            if (a.airlineDate == b.airlineDate) return 0;
            return 1;
          });
        default:
          break;
      }
    });
    /** mounted时，获取数据，并渲染 */
    onMounted(() => {
      findAirlineInfoByQuerySet();
    });
    onMounted(async () => {
      let res = await findCity([
        querySet.departureCityId,
        querySet.destinationCityId,
      ]);
      stores.isDebug ? console.log("res", res) : "";
      if (res == null || res.length == 0) ElMessage("无次航班");
      else {
        depCity.cityName = res[0].cityName;
        depCity.cityId = res[0].cityId;
        desCity.cityName = res[1].cityName;
        desCity.cityId = res[1].cityId;
      }
      stores.isDebug ? console.log("res", depCity, desCity) : "";
      // const [desCity, depCity] = res;
    });
    return { showDate, airlineInfoAllList, depCity, desCity, findCity };
  },
});

const useTitle = (props: any) => {
  const titleObj: Ref<TitleObjInterface> = toRef(props, "titleObj");
  const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const showDate = computed(() => {
    return (
      titleObj.value.date.getFullYear() +
      "年" +
      (titleObj.value.date.getMonth() + 1) +
      "月" +
      titleObj.value.date.getDate() +
      "日" +
      week[titleObj.value.date.getDay()]
    );
  });
  return { showDate };
};

const useAirlineInfo = () => {
  const airlineInfoAllList = ref([
    reactive({
      airlineDate: dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
      airlineId: "A11",
      airlineName: "长-1051",
      airlineSeatId: "AS1",
      hours: 2.5,
      companyId: "AC1",
      companyName: "长虹",
      companyImg: "",
      startTime: "9:00:00",
      endTime: "10:00:00",
      departureCity: {
        cityFirstAlp: "W",
        cityId: "C1",
        cityName: "温州",
      },
      destinationCity: {
        cityFirstAlp: "W",
        cityId: "C1",
        cityName: "温州",
      },
      seatBOList: [
        {
          price: 90,
          remain: 5,
          seatTypeId: "ST1",
          seatTypeName: "经济舱",
          tot: 0,
        },
      ],
      supEntityBOList: [
        {
          ticketTypeId: "TT1",
          ticketTypeName: "成人",
        },
      ],
    }),
  ]);
  //从route中获取城市
  const route = useRoute();
  stores.isDebug ? console.log("route param:", route.params) : "";
  /** 寻找城市 */
  const findCity = async (ids: Array<string>) => {
    // console.log("ids", ids);
    let res = await CityServiceApi.findCityByIds(ids);
    return res.data;
  };
  const desId: string = route.params.destinationId as string;
  const depId: string = route.params.departureId as string;
  const desCity = reactive({ cityFirstAlp: "", cityId: "", cityName: "" });
  const depCity = reactive({ cityFirstAlp: "", cityId: "", cityName: "" });
  stores.isDebug ? console.log("[desId,depId]", desId, depId) : "";
  const querySet = reactive({
    departureCityId: depId,
    destinationCityId: desId,
    supTicketIds: [],
    airlineDate: dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
    airlineId: "",
  });
  const findAirlineInfoByQuerySet = async () => {
    stores.isDebug
      ? console.log(
          "[airline query queryset]=",
          querySet,
          "[route=]",
          route.params
        )
      : "";
    let res = await AirlineInfoServiceApi.findAirlineInfoByQuerySet(querySet);
    // console.log(res);
    if (res.code == 0) {
      // while (airlineInfoAllList.value.length) {
      //   airlineInfoAllList.value.pop();
      // }
      if (res.data == null || res.data.length == 0) {
        ElMessage({
          showClose: true,
          message: "无此航班",
          type: "error",
        });
      }
      airlineInfoAllList.value.splice(0, airlineInfoAllList.value.length);
      res.data.forEach((airlineInfoAllBO) => {
        airlineInfoAllList.value.push(reactive(airlineInfoAllBO));
      });
      stores.isDebug ? console.log(airlineInfoAllList) : "";
    }
  };
  return {
    airlineInfoAllList,
    findAirlineInfoByQuerySet,
    desCity,
    depCity,
    findCity,
    querySet,
  };
};
</script>

<style scoped>
.el-row {
  width: 100%;
}
</style>