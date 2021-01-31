<template>
  <el-row>
    <el-col :span="12"></el-col>
    <el-col :span="12">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="$emit('select', key, keyPath)"
      >
        <el-menu-item index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>个人主页首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>订单</template>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <template #title>我的消息</template>
        </el-menu-item>
        <el-submenu index="4">
          <template #title>
            <i class="el-icon-wallet"></i>
            <span>钱包</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">优惠券</el-menu-item>
            <el-menu-item index="1-2">安全设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
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
.el-row {
  width: 100%;
}
</style>