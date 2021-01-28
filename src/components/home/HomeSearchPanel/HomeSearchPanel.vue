<template>
  <notice-bar
    ><div style="text-align: right">
      <el-button type="text">详情</el-button>
    </div></notice-bar
  >
  <el-row style="width: 95%; margin-top: 30px">
    <el-col :span="12" style="text-align: left">
      <el-space direction="vertical" alignment="start" :size="30">
        <el-radio-group v-model="orderType">
          <el-radio :label="1">单程</el-radio>
          <el-radio :label="2">往返</el-radio>
          <el-radio :label="3">多程</el-radio>
        </el-radio-group>
      </el-space>
    </el-col>
    <el-col :span="12" style="text-align: right">
      <el-button class="text-item" @click="openDrawer">
        <strong
          >{{ airlineName }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 乘客类型:儿童{{
            customSettingUnion.childrenNum
          }}人&nbsp;成人{{ customSettingUnion.adultNum }}人&nbsp;婴儿{{
            customSettingUnion.infant
          }}人</strong
        >
      </el-button>
    </el-col>
  </el-row>
  <el-row>
    <home-airline-order
      style="width: 100%"
      v-for="(item, index) in alreadyOrderList"
      :key="index"
      :orderSearchObj="item"
      @remove="deleteAirOrder(index)"
      @swapAddress="swapAddress(index)"
    ></home-airline-order>
  </el-row>
  <el-row v-if="orderType == 3"
    ><el-button type="primary" @click="addOrderItem">添加</el-button></el-row
  >
  <el-row style="margin-top: 20px; margin-bottom: 20px">
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <el-button
        icon="el-icon-search"
        type="primary"
        @click="queryAirline"
        round
        >搜索</el-button
      >
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>

  <el-drawer
    title="机票查询设定"
    v-model="drawer"
    :direction="direction"
    :before-close="handleClose"
    destroy-on-close
  >
    <el-row>
      <el-col :span="6">
        航班类型：
        <el-select
          v-model="customSettingUnion.airlineType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        儿童：
        <el-input-number
          v-model="customSettingUnion.childrenNum"
          @change="handleChange"
          :min="0"
          :max="10"
          label="描述文字"
        ></el-input-number>
      </el-col>
      <el-col :span="6">
        成人：
        <el-input-number
          v-model="customSettingUnion.adultNum"
          @change="handleChange"
          :min="1"
          :max="10"
          label="描述文字"
        ></el-input-number>
      </el-col>
      <el-col :span="6">
        婴儿：
        <el-input-number
          v-model="customSettingUnion.infant"
          @change="handleChange"
          :min="0"
          :max="10"
          label="描述文字"
        ></el-input-number>
      </el-col>
    </el-row>
  </el-drawer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  provide,
  reactive,
  readonly,
  Ref,
  ref,
  SetupContext,
  watch,
} from "vue";
import NoticeBar from "@/components/commons/NoticeBar.vue";
import HomeAirlineOrder from "@/components/home/HomeAirlineOrder.vue";
import {
  AlreadyOrderItemInterface,
  CustomInterface,
  queryAirlineConditionInterface,
} from "@/components/home/HomeSearchPanel/HomeSearchPanelObj.ts";

export default defineComponent({
  components: {
    NoticeBar,
    HomeAirlineOrder,
  },
  data() {
    return {
      options: [
        { value: 0, label: "经济舱/超经济舱" },
        { value: 1, label: "公务/头等舱" },
        { value: 2, label: "公务舱" },
        { value: 3, label: "头等舱" },
      ],
    };
  },
  setup(props, ctx) {
    const { customSettingUnion, airlineName } = useCustomerUnion();
    const { drawer, direction, openDrawer } = useDrawer();
    const {
      orderType,
      flag,
      alreadyOrderList,
      swapAddress,
      addOrderItem,
      deleteAirOrder,
      queryAirline,
    } = useOrderList(ctx, customSettingUnion);
    return {
      customSettingUnion,
      airlineName,
      drawer,
      direction,
      openDrawer,
      orderType,
      flag,
      alreadyOrderList,
      swapAddress,
      addOrderItem,
      deleteAirOrder,
      queryAirline,
    };
  },
});
const useOrderList = (
  ctx: SetupContext,
  customSettingUnion: CustomInterface
) => {
  const app = getCurrentInstance()?.appContext.config.globalProperties;
  const orderType = ref(1);
  const flag = ref(false);
  provide("isShowDelete", readonly(flag));
  const alreadyOrderList: Ref<Array<AlreadyOrderItemInterface>> = ref([
    { departure: "", destination: "", date: new Date() },
  ]);
  //method
  const swapAddress = (index: number) => {
    // event.target.blur();
    let tmp = alreadyOrderList.value[index].departure;
    alreadyOrderList.value[index].departure =
      alreadyOrderList.value[index].destination;
    alreadyOrderList.value[index].destination = tmp;
    console.log(tmp);
  };
  const addOrderItem = () => {
    let list: AlreadyOrderItemInterface[] = alreadyOrderList.value;
    if (list.length >= 5) {
      app?.$alert("最多同时订购5张", "前排提示", {
        confirmButtonText: "确定",
        callback: (action: any) => {
          app?.$message({
            type: "info",
            message: "取消添加",
          });
        },
      });
    } else list.push({ departure: "", destination: "", date: new Date() });
  };
  const deleteAirOrder = (index: number) => {
    let list = alreadyOrderList.value;
    if (list.length <= 2) {
      app?.$alert("至少订购2张", "前排提示", {
        confirmButtonText: "确定",
        callback: (action: any) => {
          app?.$message({
            type: "info",
            message: "取消删除",
          });
        },
      });
      return;
    }
    list.splice(index, 1);
  };
  const queryAirline = () => {
    const query: Array<queryAirlineConditionInterface> = alreadyOrderList.value.map(
      (od: AlreadyOrderItemInterface) => {
        let q: queryAirlineConditionInterface = {
          departure: od.departure,
          destination: od.destination,
          date: od.date,
          airlineType: customSettingUnion.airlineType,
          hasAdult: true,
          hasChild: customSettingUnion.childrenNum > 0,
          hasinfant: customSettingUnion.infant > 0,
        };
        return q;
      }
    );
    ctx.emit("queryAirline", query);
  };
  watch(orderType, (nn, oo) => {
    //change value of isShowDelete accordding to ordetype(e.g. 1=>single,2=>double,3=>mulitply)
    let list = alreadyOrderList.value;
    let length = list.length;
    if (orderType.value == 1 || orderType.value == 2) flag.value = false;
    else flag.value = true;
    if (length > nn) {
      list.splice(nn);
    } else {
      length = nn - length;
      while (length > 0) {
        length--;
        list.push({ departure: "", destination: "", date: new Date() });
      }
    }
  });
  return {
    orderType,
    flag,
    alreadyOrderList,
    swapAddress,
    addOrderItem,
    deleteAirOrder,
    queryAirline,
  };
};
const useDrawer = () => {
  const drawer = ref(false);
  const direction = ref("btt");
  const openDrawer = (event: { target: { blur: () => void } }) => {
    drawer.value = true;
    event.target.blur();
  };
  return {
    drawer,
    direction,
    openDrawer,
  };
};

const useCustomerUnion = () => {
  const customSettingUnion: CustomInterface = reactive({
    childrenNum: 0,
    adultNum: 0,
    infant: 0,
    airlineType: 0,
  }); // variety of settings related to amount of customers
  const airlineName = computed(() => {
    return ["经济舱/超经济舱", "公务/头等舱", "公务舱", "头等舱"][
      customSettingUnion.airlineType
    ];
  });
  return {
    customSettingUnion,
    airlineName,
  };
};
</script>

<style scoped>
</style>