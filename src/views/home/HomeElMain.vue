<template>
  <div style="overflow-y: auto; height: 100%; width: 100%">
    <home-banner></home-banner><home-search-bar></home-search-bar>
    <home-a-map></home-a-map>
    <!-- <div style="height: 900px; background: red"></div>
        <div style="height: 300px; background: blue"></div> -->
    <div style="height: 40px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeBanner from "@/components/home/HomeBanner.vue";
import HomeSearchBar from "@/components/home/HomeSearchBar.vue";
import HomeAMap from "@/components/home/HomeAMap.vue";

export default defineComponent({
  components: {
    HomeBanner,
    HomeSearchBar,
    HomeAMap,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>