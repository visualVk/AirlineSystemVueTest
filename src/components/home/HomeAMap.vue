<template>
  <div style="margin-top: 20px">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="4">
        <el-row>
          <el-col :span="23">
            <el-input
              placeholder="请输入内容"
              v-model="placeObj.departure"
              style="width: 100%"
              id="depart_input"
            >
              <template #prepend>出发地:</template>
            </el-input>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-input
              placeholder="请输入内容"
              v-model="placeObj.destination"
              style="width: 100%"
              id="destination_input"
            >
              <template #prepend>目的地:</template>
            </el-input>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-button
              style="width: 100%"
              type="primary"
              icon="el-icon-search"
              @click="findWay"
              >搜索</el-button
            >
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-card :body-style="{ padding: '0px' }">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
              <div style="padding: 14px">
                <span>推荐榜首</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">更多详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row style="height: 100%; overflow: hidden">
          <div id="container"></div>
          <div id="panel"></div>
        </el-row>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script>
import { inject, onMounted, reactive } from "vue";
import { AlreadyOrderItem } from "../HomeClass";
import { HomeServiceApi } from "@/utils/api/HomeServiceApi";
import { stores } from "@/utils/store/store";
import { createMap, findWay } from "@/components/home/AMaSp.js";
export default {
  setup() {
    const placeObj = reactive({
      departure: "",
      destination: "",
    });
    onMounted(createMap);
    return { placeObj, findWay };
  },
  data() {
    return {
      isShowEmpty: true,
      currentDate: (() => {
        return new Date().toString().substring(0, 10);
      })(),
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  methods: {
    loadCity: async function () {
      let res = await HomeServiceApi.fingAllCity();
      if (res.statusCode == 200) {
        this.options = res.data.flatMap((cityList) => {
          return cityList.cityList.map((city) => {
            return { value: city.cityId, label: city.cityName };
          });
        });
      }
    },
    submitSearch: function () {},
  },
  mounted() {
    this.loadCity();
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 70%;
  height: 500px;
}
.el-row {
  margin-top: 10px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

#panel {
  // position: ab;
  background-color: white;
  height: 100%;
  overflow-y: auto;
  // top: 10px;
  // right: 10px;
  width: 30%;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style>