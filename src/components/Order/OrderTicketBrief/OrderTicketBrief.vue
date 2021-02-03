<template>
  <div class="flight_info">
    <el-row class="flight_city">
      <el-col :span="8">
        <span class="basic_tag">第一程</span>
      </el-col>
      <el-col :span="8" style="text-align: left">
        date
        <span class="week">周三</span>
      </el-col>
      <el-col :span="8" style="text-align: left">
        温州{{}} &nbsp;
        <i class="el-icon-d-arrow-right"></i>
        &nbsp; 上海{{}}
      </el-col>
    </el-row>
    <el-row class="flight_tit">
      <el-col :span="10" style="text-align: right">
        <span>
          <el-image
            style="width: 12px; height: 12px"
            :src="imgUrl"
            fit="fill"
          ></el-image>
          公司+航班编号{{}}
        </span>
      </el-col>
      <el-col :span="6">
        <span> 舱位编号{{}} </span>
      </el-col>
      <el-col :span="8">
        <span> 舱位类型{{}} </span>
      </el-col>
    </el-row>
    <el-row class="flight_detail">
      <el-col :span="6">
        <div class="flight_depart">
          <span class="time">14:30{{}}</span>
          <span class="airport">龙湾国际机场T2{{}}</span>
        </div>
      </el-col>
      <el-col :span="12" class="flight_arrow">
        <div class="cost_time"><i class="el-icon-timer"></i>2h50m{{}}</div>
        <div class="timeline">
          <el-row>
            <el-col :span="8">
              <i class="dot"></i>
            </el-col>
            <el-col :span="8">
              <i class="el-icon-d-arrow-right icon_airport"></i>
            </el-col>
            <el-col :span="8">
              <i class="dot dot_end"></i>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="flight_arrive">
          <span class="time">14:30{{}}</span>
          <span class="airport">龙湾国际机场T2{{}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const { imgUrl } = useFlight();
    return { imgUrl };
  },
});
const useFlight = () => {
  const imgUrl = ref(
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  );
  return { imgUrl };
};
</script>

<style scoped>
.container {
  width: 100%;
}
.el-row {
  width: 100%;
}
.flight_info {
  padding: 26px 0 30px;
  text-align: center;
  border-bottom: 1px solid #e0e5e7;
  width: 100%;
  background: white;
}
.flight_city {
  padding-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
}
.basic_tag {
  margin-right: 4px;
  padding: 0 4px 0 5px !important;
  font-family: PingFang SC, Hiragino Sans GB, Lantinghei SC, Simsun;
  vertical-align: middle;
  font-weight: 300;
  display: inline-block;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  padding: 0 2px;
  color: #fff;
  background: #234;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  cursor: default;
  *display: inline;
  *zoom: 1;
  overflow: hidden;
  white-space: nowrap;
}
.flight_tit {
  padding-bottom: 10px;
  color: #849bab;
  height: 20px;
  line-height: 20px;
  font-size: 12px !important;
  font-family: BlinkMacSystemFont, Helvetica, Arial, Tahoma, PingFang SC,
    Hiragino Sans GB, Lantinghei SC, Microsoft YaHei, sans-serif !important;
}
.flight_detail {
  padding-top: 10px;
  color: #234 !important;
  font-size: 12px !important;
  font-family: BlinkMacSystemFont, Helvetica, Arial, Tahoma, PingFang SC,
    Hiragino Sans GB, Lantinghei SC, Microsoft YaHei, sans-serif !important;
}
.flight_depart {
  text-align: right;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
}
.time {
  display: block;
  font-size: 24px;
  font-weight: 500;
  height: 27px;
}
.airport {
  display: block;
  width: 105px;
  padding-top: 6px;
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.flight_arrow {
  width: 148px;
  padding: 0 16px;
  text-align: center;
}
.cost_time {
  margin-bottom: 21px;
  color: #849bab;
}
.flight_arrive {
  text-align: left;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  display: inline;
  zoom: 1;
  color: #234 !important;
  font-size: 12px !important;
  font-family: BlinkMacSystemFont, Helvetica, Arial, Tahoma, PingFang SC,
    Hiragino Sans GB, Lantinghei SC, Microsoft YaHei, sans-serif !important;
}
.timeline {
  margin: 8px auto 0;
  width: 100%;
  height: 1px;
  background: #dbe2ea;
}
.dot {
  position: absolute;
  left: 0;
  top: -2px;
  display: block;
  width: 6px;
  height: 6px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: #dbe2ea;
}
.dot_end {
  left: auto;
  right: 0;
}
.icon_airport {
  position: absolute;
  top: -5px;
  width: 30px !important;
  height: 30px !important;
}
</style>