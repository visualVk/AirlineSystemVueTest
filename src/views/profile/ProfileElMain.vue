<template>
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
import { defineComponent, onMounted } from "vue";
import AsideMenuNav from "@/components/profile/AsideMenuNav/AsideMenuNav.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    AsideMenuNav,
  },
  setup() {
    const { selectHandler } = useAsideMenuNav();
    const {} = useCommons();
    return { selectHandler };
  },
});

const useCommons = () => {
  const route = useRoute();
  return {};
};

const useAsideMenuNav = () => {
  const router = useRouter();
  const selectHandler = (key: any, keyPath: any) => {};
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