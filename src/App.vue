<template>
  <el-container id="home-container" style="margin: 0%">
    <el-header
      class="airline-bg-grey airline-text-color-black"
      style="height: 145px; margin: 0%; padding: 0%"
    >
      <home-nav></home-nav>
      <HomeImageNav></HomeImageNav>
    </el-header>
    <el-main style="padding: 0%; margin: 0%">
      <div style="overflow-y: auto; height: 100%">
        <home-banner></home-banner><home-search-bar></home-search-bar>
        <home-a-map></home-a-map>
        <!-- <div style="height: 900px; background: red"></div>
        <div style="height: 300px; background: blue"></div> -->
        <div style="height: 40px"></div>
      </div>
    </el-main>
    <el-footer style="height: 240px">
      <FooterNotice></FooterNotice>
      <div style="height: 80px">
        <el-divider content-position="right"></el-divider>
        <div style="text-align: center; font-size: 20px; color: #909399">
          <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
        </div>
        <el-divider content-position="right">阿里云</el-divider>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import HomeNav from "@/components/home/HomeNav";
import HomeImageNav from "@/components/home/HomeImageNav";
import HomeBanner from "@/components/home/HomeBanner";
import HomeSearchBar from "@/components/home/HomeSearchBar";
import HomeAMap from "@/components/home/HomeAMap";
import FooterNotice from "@/components/home/footer/FooterNotice";
import { provide, ref } from "vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    HomeNav,
    HomeImageNav,
    HomeBanner,
    HomeSearchBar,
    HomeAMap,
    FooterNotice,
  },
  setup(props) {
    const notice = ref("warning!");
    provide("notice", notice);
  },
};
</script>

<style>
body,
body > #home-container {
  margin: 0%;
}
.el-header,
.el-footer {
  /* line-height: 45px; */
  font-size: 12px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  margin: 0%;
  padding: 0px;
  /* line-height: 500px; */
}
</style>
