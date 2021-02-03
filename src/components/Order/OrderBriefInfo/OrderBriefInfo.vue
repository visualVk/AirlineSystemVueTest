<template>
  <div class="flight_cost">
    <el-row class="cost_detail">
      <div class="cost_row">
        <el-row v-for="(o, index) in orderList" :key="index">
          <el-col :span="20">
            <span>第一程成人</span>
            <span class="abbr">退改<dfn>¥</dfn>{{ o.changeFee }}起</span>
            <span class="abbr">行李额</span>
          </el-col>
          <el-col :span="4">
            <span class="price"><dfn>¥</dfn>{{ o.price }}</span>
            <span class="num">x {{ o.num }}</span>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <el-row class="tot_price">
      <el-col>
        <span> <dfn>¥</dfn>{{ totPrice }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from "vue";
import { OrderBriefInfoImpl } from "@/components/Order/OrderBriefInfo/OrderBriefIinfo.ts";
export default defineComponent({
  props: {
    orderList: {
      type: Array,
      default: [
        {
          price: "315",
          num: "1",
          changeFee: "290",
        },
      ],
    },
  },
  setup(props) {
    const { totPrice } = useCommons(props);
    return { totPrice };
  },
});

const useCommons = (props: any) => {
  const orderList: Ref<Array<OrderBriefInfoImpl>> = toRef(props, "orderList");
  const totPrice = computed(() => {
    let tot = 0.0;
    orderList.value.forEach((o) => {
      tot += parseFloat(o.price);
    });
    return tot;
  });
  return { totPrice };
};
</script>

<style scoped>
.el-row {
  width: 100%;
}
.flight_cost {
  padding: 10px 30px;
  text-align: center;
  border-bottom: 1px solid #e0e5e7;
  width: 100%;
  background: white;
  color: #234 !important;
  font-size: 12px !important;
  font-family: BlinkMacSystemFont, Helvetica, Arial, Tahoma, PingFang SC,
    Hiragino Sans GB, Lantinghei SC, Microsoft YaHei, sans-serif !important;
}
.cost_detail {
  padding: 12px 0;
  border-bottom: 1px solid #e0e5e7;
}
.cost_row {
  line-height: 27px;
  /* padding-right: 80px; */
  width: 100%;
}
.abbr {
  margin-left: 15px;
  padding-bottom: 1px;
  color: #849bab;
  border-bottom: 1px dotted #849bab;
  cursor: help;
}
.corner {
  right: 0;
  top: 0;
  text-align: right;
}
.num {
  padding-left: 4px;
  color: #849bab;
}
.tot_price {
  margin: 0 -30px;
  padding-top: 20px;
  color: #ff7d13;
  font-size: 35px;
  font-weight: 700;
  border-top: 1px solid #e0e5e7;
  margin-top: -1px;
  text-align: right;
}
.tot_price dfn {
  font-style: normal;
  font-family: Arial, Tahoma, sans-serif;
  font-size: 18px;
}
</style>