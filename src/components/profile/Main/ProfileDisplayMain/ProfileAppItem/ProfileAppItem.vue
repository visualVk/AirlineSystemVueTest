<template>
  <div>
    <el-image
      :style="{
        width: size + 'px',
        height: size + 'px',
      }"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      fit="fill"
    ></el-image>
    <div
      style="text-align: center"
      :style="{ height: textHeight + 'px', lineHeight: textHeight + 'px' }"
    >
      <span :style="{ fontSize: textSize + 'px' }">{{ itemName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    size: {
      type: Number,
      default: 100,
    },
    itemName: {
      type: String,
      default: "Item Name",
    },
    textHeight: {
      type: Number,
      default: 20,
    },
    textSize: {
      type: Number,
      default: 14,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>