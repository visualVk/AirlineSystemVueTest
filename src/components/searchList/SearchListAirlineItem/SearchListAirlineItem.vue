<template>
  <div>
    <el-row style="height: 80px">
      <!-- 图标区 -->
      <el-col :span="4" style="text-align: right; line-height: 80px">
        <el-image
          style="width: 75px; height: 75px"
          :src="airlineInfoObj.companyImg"
          fit="fill"
        >
        </el-image>
      </el-col>
      <!-- 公司 -->
      <el-col :span="6" style="line-height: 40px; text-align: center">
        <div>
          <span class="company">{{ airlineInfoObj.companyName }}</span>
        </div>
        <div>
          <span class="airlineTitle">{{ airlineInfoObj.airlineName }}</span>
        </div>
      </el-col>
      <!-- 地点和时间 -->
      <el-col :span="6" style="line-height: 40px">
        <el-row>
          <el-col :span="8" style="text-align: center">
            <div>
              <span>{{ airlineInfoObj.departureCity.cityName }}</span>
            </div>
            <div>{{ airlineInfoObj.startTime }}</div>
          </el-col>
          <el-col :span="8" style="line-height: 80px; text-align: center">
            <i class="el-icon-right"></i>
          </el-col>
          <el-col :span="8" style="text-align: center">
            <div>{{ airlineInfoObj.destinationCity.cityName }}</div>
            <div>{{ airlineInfoObj.endTime }}</div>
          </el-col>
        </el-row>
      </el-col>
      <!-- 按钮以及标签区 -->
      <el-col :span="8" style="text-align: right; line-height: 80px">
        <el-space size="10px">
          <el-tag type="success" v-for="i in 4" :key="i">标签三</el-tag>
        </el-space>
        <el-button
          style="margin-right: 10px"
          @click="isShow = !isShow"
          :class="isShow ? 'close-btn' : 'show-btn'"
        >
          {{ closeAndShowBtnText }}
        </el-button>
      </el-col>
    </el-row>
    <el-row v-show="isShow" style="background: #f8fafb">
      <TicketBrieftItem
        v-for="seatBO in airlineInfoObj.seatBOList"
        :key="seatBO.seatTypeId"
        :seatBO="seatBO"
        :airlineInfo="airlineInfoObj"
        style="border-bottom: 1px solid #e4e7ed"
      ></TicketBrieftItem>
    </el-row>
    <el-row style="background: #e9eef3; height: 5px"></el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import TicketBrieftItem from "@/components/searchList/TicketBriefItem/TicketBriefItem.vue";
import { dateFormat } from "@/utils/date/DateFormatUtil";
export default defineComponent({
  components: {
    TicketBrieftItem,
  },
  props: {
    imgUrl: String,
    airlineInfoObj: {
      default: {
        airlineDate: dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
        airlineId: "A1",
        airlineName: "长-105",
        airlineSeatId: "AS1",
        hours: 2.5,
        endTime: "9:00:00",
        startTime: "10:00:00",
        companyId: "AC1",
        companyName: "长虹",
        companyImg: "",
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
      },
    },
  },
  setup() {
    const { isShow, closeAndShowBtnText } = useCommons();
    return { isShow, closeAndShowBtnText };
  },
});
const useCommons = () => {
  const isShow = ref(false);
  const closeAndShowBtnText = computed(() => {
    return isShow.value ? "收起" : "展开";
  });
  return { isShow, closeAndShowBtnText };
};
</script>

<style scoped>
.el-row {
  width: 100%;
}
.show-btn {
  background-image: linear-gradient(90deg, #ffa50a, #f70);
  color: white;
}
.show-btn:hover,
.show-btn:visited,
.show-btn:active,
.show-btn:link {
  color: white;
  background-image: linear-gradient(90deg, #ffa50a, #f70);
}
.close-btn {
  color: #ff9913;
  background: white;
}
.close-btn:hover,
.close-btn:visited,
.close-btn:active,
.close-btn:link {
  color: #ff9913;
  background: white;
}
</style>