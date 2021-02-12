<template>
  <router-view></router-view>
</template>

<script>
import { provide, ref } from "vue";
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
