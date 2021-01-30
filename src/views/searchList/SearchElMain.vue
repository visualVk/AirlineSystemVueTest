<template>
  <div style="overflow-y: auto; height: 100%; width: 100%">
    <el-row style="width: 100%; background: white">
      <el-col :span="2"></el-col>
      <el-col :span="20"><home-search-panel></home-search-panel></el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row style="width: 100%">
      <SearchListMain></SearchListMain>
    </el-row>
    <el-row style="height: 40px"></el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeSearchPanel from "@/components/home/HomeSearchPanel/HomeSearchPanel.vue";
import SearchListMain from "@/components/searchList/SearchListMain.vue";
export default defineComponent({
  components: {
    HomeSearchPanel,
    SearchListMain,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>