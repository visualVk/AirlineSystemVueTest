<!--
 * @Author: your name
 * @Date: 2021-01-22 14:50:45
 * @LastEditTime: 2021-04-10 16:30:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\App.vue
-->
<template>
  <router-view></router-view>
</template>

<script>
import { provide, ref } from "vue";
import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";
export default {
  name: "App",
  setup() {
    const _ = require("lodash");
    provide("_", _);
    return {};
  },
};
</script>

<style>
#app {
  height: 100%;
}
body {
  margin: 0%;
}
</style>
