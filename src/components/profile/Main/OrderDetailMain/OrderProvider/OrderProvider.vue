<template>
  <div class="container">
    <div class="container_bg">
      <el-row style="border-bottom: 1px solid #ccc; background: white">
        <el-col :span="10">
          <el-image
            style="width: 100px; height: 100px"
            :src="providerObj.imgUrl"
            fit="fill"
          ></el-image>
        </el-col>
        <el-col :span="14">
          <el-row>
            <p class="provider_title">{{ airlineInfoAllBO.airlineName }}</p>
          </el-row>
          <el-row>
            <div class="score_panel">
              <span class="score">{{ providerObj.score }}</span
              >/5
            </div>
            <div class="provider_address">
              {{ providerObj.address }}
            </div>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="background: white">
        <div class="m_priceDetail_content">
          <ul class="supplementDesc">
            <li>{{ orderMsg }}</li>
          </ul>
          <el-row class="priceList">
            <el-col :span="12">
              <span class="priceLabel">应付总额</span>
            </el-col>
            <el-col :span="12">
              <span class="priceCell">
                <div class="u-price">
                  <span class="u-price_currency">￥</span>
                  <span class="u-price_num">{{ ticket.price }}</span>
                </div>
              </span>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { OrderProviderImpl } from "@/components/profile/Main/OrderDetailMain/OrderProvider/OrderProvider";
import { AirlineTicketAllBO } from "@/model/TicketEntity";
import { AirlineInfoServiceApi } from "@/utils/api";
import { AirlineInfoImpl } from "@/model/AirlineEntity";
import { sourceCopy2Target } from "@/utils/object/ObjectUtil";
import { ElMessage } from "element-plus";

export default defineComponent({
  props: {
    providerObj: {
      type: OrderProviderImpl,
      default: {
        title: "开元曼居·绍兴兰亭店 (New Century Manju Hotel Shaoxing Lanting)",
        score: "4.5",
        address: "中国，绍兴，越城区，鉴湖街道芳泉路1号",
        imgUrl:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    },
  },
  setup() {
    const _: any = inject("_");
    return _.merge({}, toRefs(useCommons()));
  },
});

const useCommons = () => {
  const airlineInfoAllBO = reactive(new AirlineInfoImpl());
  const ticket = inject("ticket") as AirlineTicketAllBO;
  const orderMsg = computed(() => {
    const status = ticket.status;
    if (status == 2) {
      return "您的预定已取消";
    } else {
      return "您的订单正在处理";
    }
  });
  const findAirlineInfoById = async () => {
    let airlineRes = await AirlineInfoServiceApi.findAirlineInfoByQuerySet({
      departureCityId: undefined,
      destinationCityId: undefined,
      supTicketIds: undefined,
      airlineDate: undefined,
      airlineId: ticket.airlineId,
    });
    if (airlineRes.code == 0) {
      const airlineResD1 = airlineRes.data[0];
      const keys = Object.keys(airlineResD1);
      for (const key of keys) {
        if (airlineResD1[key] != undefined) {
          airlineInfoAllBO[key] = airlineResD1[key];
        }
      }
    } else {
      ElMessage.error("查询出错");
    }
  };
  onMounted(() => {
    findAirlineInfoById();
  });
  return { findAirlineInfoById, ticket, airlineInfoAllBO, orderMsg };
};
</script>

<style scoped>
.container {
  width: 100%;
  margin-top: 20px;
}
.container_bg {
  background: #f4f9ff;
  padding: 10px;
}
.provider_title {
  font-family: BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial,
    sans-serif;
  font-weight: bold;
  font-size: 16px;
}
.score_panel {
  color: #fff;
  background-color: #2681ff;
  display: inline-block;
  line-height: 1;
  border-radius: 50px;
  padding: 3px 6px 2px;
  box-sizing: border-box;
}
.score_panel {
  font-weight: 400;
  font: 12px/1.5 Helvetica Neue, Helvetica, Arial, sans-serif;
}
.score {
  /* font-weight: 400; */
  font: 16px/1.5 Helvetica Neue, Helvetica, Arial, sans-serif;
}
.provider_address {
  color: #999;
  padding-top: 10px;
  line-height: 18px;
  font-family: BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 12px;
}

li {
  list-style: none;
}
.m_priceDetail_content {
  width: 100%;
  text-align: left;
  color: #333;
  font-size: 12px;
  padding-bottom: 15px;
  margin-bottom: 18px;
  border-bottom: 1px dotted #e4e4e4;
}
.supplementDesc {
  font-weight: 400;
  font: 12px/1.5 Helvetica Neue, Helvetica, Arial, sans-serif;
}
.priceList {
  text-align: center;
}
.priceItem {
  width: 100%;
}
.priceLabel {
  margin-right: 15px;
  word-break: break-word;
  font-weight: 700;
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  font-family: BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial,
    sans-serif;
}
.u-price_currency,
.u-price_num {
  font-family: BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #287dfa;
}
</style>