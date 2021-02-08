<template>
  <div class="container">
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16" style="text-align: left">
        <h2>常见问题</h2>
      </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="2" v-for="i in 8" :key="i">
        <CommonCard :imgh="75" :imgw="75"></CommonCard>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommonCard from "@/components/serviceClient/ServiceCommonQuestion/CommonCard/CommonCard.vue";

export default defineComponent({
  components: {
    CommonCard,
  },
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
</style>