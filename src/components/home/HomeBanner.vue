<!--
 * @Author: your name
 * @Date: 2021-01-22 20:06:24
 * @LastEditTime: 2021-03-20 10:18:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\home\HomeBanner.vue
-->
<template>
  <div class="carousel">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in banner" :key="item">
        <!-- <h3>{{ item }}</h3> -->
        <el-image fit="cover" :src="item" style="height: 100%; width: 100%" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  data() {
    return {
      banner: [
        "https://img95.699pic.com/photo/50047/8862.jpg_wh300.jpg",
        "https://image.shutterstock.com/image-photo/agave-cactus-abstract-natural-pattern-600w-1056037874.jpg",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.carousel {
  height: 100%;
}
</style>