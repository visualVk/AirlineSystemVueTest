<template>
  <el-row>
    <el-col :span="12"></el-col>
    <el-col :span="12">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="selectHandler"
        router
      >
        <el-menu-item index="/me">
          <template #title>
            <i class="el-icon-location"></i>
            <span>个人主页首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/profileOrder">
          <i class="el-icon-menu"></i>
          <template #title>订单</template>
        </el-menu-item>
        <el-menu-item index="/msg">
          <i class="el-icon-document"></i>
          <template #title>我的消息</template>
        </el-menu-item>
        <el-menu-item index="/coupon">
          <i class="el-icon-document"></i>
          <template #title>优惠券</template>
        </el-menu-item>
        <!-- <el-submenu index="4">
          <template #title>
            <i class="el-icon-wallet"></i>
            <span>钱包</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-2">安全设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
        <el-menu-item index="/question">
          <i class="el-icon-question"></i>
          <template #title>我的提问</template>
        </el-menu-item>
        <el-menu-item index="/">
          <template #title>
            <i class="el-icon-location"></i>
            <span>返回首页</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, toRef } from "vue";

export default defineComponent({
  props: {},
  setup(props, ctx) {
    const selectHandler = (key: any, keyPath: any) => {
      ctx.emit("select", key, keyPath);
    };

    return { selectHandler };
  },
});
</script>

<style scoped>
.el-row {
  width: 100%;
}
</style>