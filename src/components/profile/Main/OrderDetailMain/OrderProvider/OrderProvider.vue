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
            <p class="provider_title">{{ providerObj.title }}</p>
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
            <li>您的预订已取消。</li>
          </ul>
          <el-row class="priceList">
            <el-col :span="12">
              <span class="priceLabel">应付总额</span>
            </el-col>
            <el-col :span="12">
              <span class="priceCell">
                <div class="u-price">
                  <span class="u-price_currency">￥</span>
                  <span class="u-price_num">636.00</span>
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
import { defineComponent } from "vue";
import { OrderProviderImpl } from "@/components/profile/Main/OrderDetailMain/OrderProvider/OrderProvider.ts";

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
    return {};
  },
});
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