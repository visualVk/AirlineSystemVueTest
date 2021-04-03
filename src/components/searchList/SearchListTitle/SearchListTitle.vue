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
        <SearchSelectBar
          @pop-company="filterAirlineByCompanyId"
          :companyList="companyList"
        ></SearchSelectBar>
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
  inject,
  onMounted,
  provide,
  reactive,
  ref,
  Ref,
  SetupContext,
  toRef,
  useContext,
  watch,
  withCtx,
} from "vue";
import { TitleObjInterface } from "@/components/searchList/SearchListTitle/SearchListTitle";
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
  /** setup构建 */
  setup(props, ctx) {
    const airlineSortRule = ref(AirlineSortRule.sortByCompanyName);
    provide("airlineSortRule", airlineSortRule);
    const { showDate } = useTitle(props, ctx);
    const {
      airlineInfoAllList,
      findAirlineInfoByQuerySet,
      filterAirlineByCompanyId,
      companyList,
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
      if (res == null || res.length == 0) ElMessage("无此航班");
      else {
        depCity.cityName = res[0].cityName;
        depCity.cityId = res[0].cityId;
        desCity.cityName = res[1].cityName;
        desCity.cityId = res[1].cityId;
      }
      stores.isDebug ? console.log("res", depCity, desCity) : "";
      // const [desCity, depCity] = res;
    });
    return {
      showDate,
      airlineInfoAllList,
      depCity,
      desCity,
      findCity,
      filterAirlineByCompanyId,
      companyList,
    };
  },
});

const useTitle = (props: any, ctx: SetupContext) => {
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
  /** 寻找城市 */
  const findCity = async (ids: Array<string>) => {
    // console.log("ids", ids);
    let res = await CityServiceApi.findCityByIds(ids);
    return res.data;
  };
  /** 原始航班列表，不用于展示，只适用于暂时存储，展示的航班通过这个原始列表过滤条件得到列表，在展示 */
  const originList = ref([
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
  const companyList = ref([
    reactive({ companyId: "null", companyName: "不指定航空公司" }),
  ]);
  /** 查询航班 */
  const desCity = reactive({ cityFirstAlp: "", cityId: "", cityName: "" });
  const depCity = reactive({ cityFirstAlp: "", cityId: "", cityName: "" });
  const querySet = inject("querySet", {
    departureCityId: "",
    destinationCityId: "",
    supTicketIds: [],
    airlineDate: dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
    airlineId: "",
  });
  watch(querySet, (oo, nn) => {
    findAirlineInfoByQuerySet();
  });
  const findAirlineInfoByQuerySet = async () => {
    // useContext().emit("pop-query", querySet);
    stores.isDebug ? console.log("[airline query queryset]=", querySet) : "";
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
      let companyIdSet = new Set(); //用于标记公司编号唯一
      originList.value.length = 0;
      airlineInfoAllList.value.splice(0, airlineInfoAllList.value.length);
      companyList.value.length = 0;
      companyList.value.push(
        reactive({ companyId: "null", companyName: "不指定航空公司" })
      );
      res.data.forEach((airlineInfoAllBO) => {
        airlineInfoAllList.value.push(reactive(airlineInfoAllBO));
        originList.value.push(reactive(airlineInfoAllBO));
        //公司编号是否唯一，唯一加入set同时加入companyList
        if (!companyIdSet.has(airlineInfoAllBO.companyId)) {
          companyList.value.push(
            reactive({
              companyId: airlineInfoAllBO.companyId,
              companyName: airlineInfoAllBO.companyName,
            })
          );
          companyIdSet.add(airlineInfoAllBO.companyId);
        }
      });

      stores.isDebug
        ? console.log("[airline info all list]=", airlineInfoAllList)
        : "";
      stores.isDebug ? console.log("[company list]=", companyList) : "";
    }
  };
  /** 根据公司编号，过滤原始列表 */
  const filterAirlineByCompanyId = (companyId: Ref<string>) => {
    airlineInfoAllList.value.length = 0;
    if (companyId.value == "null") {
      originList.value.forEach((airline) => {
        airlineInfoAllList.value.push(airline);
      });
    } else {
      stores.isDebug ? console.log("[filter companyId]=", companyId) : "";
      const resultList = originList.value.filter((item) => {
        return item.companyId == companyId.value;
      });
      stores.isDebug ? console.log("[filter result list]=", resultList) : "";
      resultList.forEach((airline) => {
        airlineInfoAllList.value.push(airline);
      });
    }
  };
  return {
    airlineInfoAllList,
    findAirlineInfoByQuerySet,
    filterAirlineByCompanyId,
    companyList,
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