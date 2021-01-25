<template>
  <div style="margin-top: 20px">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="4">
        <el-row>
          <el-col :span="23">
            <el-input placeholder="请输入内容" v-model="placeObj.departure">
              <template #prepend>出发地</template>
            </el-input>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-input placeholder="请输入内容" v-model="placeObj.destination">
              <template #prepend>目的地</template>
            </el-input>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-button style="width: 100%" type="primary" icon="el-icon-search"
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
      <el-col :span="16"><div id="container"></div></el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script>
import { inject } from "vue";
import { AlreadyOrderItem } from "../HomeClass";
export default {
  setup() {
    const placeObj = inject("placeObj", {
      departure: "",
      destination: "",
    });
    return { placeObj };
  },
  data() {
    return {
      isShowEmpty: true,
      currentDate: (() => {
        return new Date().toString().substring(0, 10);
      })(),
    };
  },
  methods: {
    initMap: function () {
      this.map = new AMap.Map("container", {
        zoom: 18, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D", //使用3D视图
      });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
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
</style>