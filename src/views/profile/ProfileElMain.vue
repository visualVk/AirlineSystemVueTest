<template>
  <!-- <el-row>
      <el-col :span="6" style="padding: 20px">
        <AsideMenuNav @select="selectHandler"></AsideMenuNav>
      </el-col>
      <el-col :span="18" style="padding: 20px">
        <router-view></router-view>
      </el-col>
    </el-row> -->

  <div style="overflow-y: auto; height: 100%; width: 100%">
    <el-container>
      <el-aside width="25%" style="padding: 20px">
        <AsideMenuNav @select="selectHandler"></AsideMenuNav>
      </el-aside>
      <el-main width="75%" style="padding: 20px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AsideMenuNav from "@/components/profile/AsideMenuNav/AsideMenuNav.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    AsideMenuNav,
  },
  setup() {
    const { selectHandler } = useAsideMenuNav();
    return { selectHandler };
  },
});

const useAsideMenuNav = () => {
  const router = useRouter();
  const selectHandler = (key: any, keyPath: any) => {
    console.log(key, keyPath);
    router.push("/me");
  };
  return { selectHandler };
};
</script>

<style scoped>
.profile_container {
  width: 100%;
  height: 100%;
}
.el-row {
  width: 100%;
  height: 100%;
}
</style>