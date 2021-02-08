<template>
  <div class="container">
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16" style="text-align: left">
        <h2>热门问题</h2>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row class="hot_question">
      <el-col :span="4"></el-col>
      <el-col :span="8" style="text-align: left">
        <ol>
          <li v-for="i in 4" :key="i"><a href="javascript:void(0)">123</a></li>
        </ol>
      </el-col>
      <el-col :span="8" style="text-align: left">
        <ol>
          <li v-for="i in 4" :key="i"><a href="javascript:void(0)">123</a></li>
        </ol>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.container {
  width: inherit;
  margin: 10px;
  padding: 10px;
  background: white;
}
.hot_question li a {
  padding: 3px 0 3px 25px;
  height: 22px;
  line-height: 1.8;
  color: #666;
  /* overflow: hidden; */
  white-space: nowrap;
  text-overflow: ellipsis;
  font: 12px/1.5 "PingFangSC-Regular", "Microsoft yahei", Arial, Simsun,
    sans-serif;
}
li {
  list-style: disc;
}
.hot_question li a:hover {
  color: #06c;
}
</style>