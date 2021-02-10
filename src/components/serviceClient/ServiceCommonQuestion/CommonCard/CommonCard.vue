<template>
  <div class="container">
    <el-image
      :style="{ width: imgw + 'px', height: imgh + 'px' }"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="fill"
      class="round_img"
    ></el-image>
    <div>
      <span
        ><a href="javascript:void(0)">{{ cardName }}</a></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imgw: {
      type: Number,
      default: 100,
    },
    imgh: {
      type: Number,
      default: 100,
    },
    cardName: {
      type: String,
      default: "xxx",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.container {
  text-align: center;
  cursor: pointer;
}
a {
  text-decoration: none;
  line-height: 1.8;
  color: #666;
  /* overflow: hidden; */
  white-space: nowrap;
  text-overflow: ellipsis;
  font: 18px/1.5 "PingFangSC-Regular", "Microsoft yahei", Arial, Simsun,
    sans-serif;
}
.round_img {
  border-radius: 50%;
}
</style>