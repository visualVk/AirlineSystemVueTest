<template>
  <el-container id="home-container" style="margin: 0%" class="home_container">
    <el-header
      class="airline-bg-grey airline-text-color-black"
      style="height: 145px; margin: 0%; padding: 0%"
    >
      <home-nav></home-nav>
      <HomeImageNav></HomeImageNav>
    </el-header>
    <el-main style="padding: 0%; margin: 0%" class="mainBox">
      <router-view></router-view>
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

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import HomeNav from "@/components/home/HomeNav.vue";
import HomeImageNav from "@/components/home/HomeImageNav.vue";
import FooterNotice from "@/components/home/footer/FooterNotice.vue";
import { provide, ref } from "vue";

export default defineComponent({
  components: {
    HelloWorld,
    HomeNav,
    HomeImageNav,
    FooterNotice,
  },
  setup() {
    const notice = ref("warning!");
    provide("notice", notice);
    return {};
  },
});
</script>

<style scoped>
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
  height: 100%;
  /* line-height: 500px; */
}
html,
body {
  height: 100%;
}
.content {
  height: 100%;
}
.backtop {
  overflow: scroll;
  height: 100%;
}
</style>