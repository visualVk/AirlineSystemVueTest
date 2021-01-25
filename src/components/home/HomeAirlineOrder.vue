<template>
  <el-row style="width: 100%">
    <el-col :span="7"
      ><el-cascader
        style="width: 100%"
        v-model="value"
        :options="options"
        :props="props"
        @change="handleChange"
      ></el-cascader
    ></el-col>
    <el-col :span="3"
      ><el-button @click="swapAddress" icon="el-icon-refresh" circle></el-button
    ></el-col>
    <el-col :span="7"
      ><el-cascader
        style="width: 100%"
        v-model="value"
        :options="options"
        :props="props"
        @change="handleChange"
      ></el-cascader
    ></el-col>
    <el-col :span="1"></el-col>
    <el-col :span="5">
      <el-date-picker
        style="width: 100%"
        v-model="value2"
        align="right"
        type="date"
        placeholder="选择日期"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
      >
      </el-date-picker
    ></el-col>
    <el-col :span="1">
      <el-button
        icon="el-icon-delete"
        circle
        v-if="flag"
        @click="$emit('remove')"
      ></el-button>
    </el-col>
  </el-row>
  <!-- <div class="block">
    <el-cascader
      v-model="value"
      :options="options"
      :props="props"
      @change="handleChange"
    ></el-cascader>
    <span class="demonstration"
      >&#160;<el-button
        @click="swapAddress"
        icon="el-icon-refresh"
        circle
      ></el-button
      >&#160;</span
    >
    <el-cascader
      v-model="value"
      :options="options"
      :props="props"
      @change="handleChange"
    ></el-cascader>
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";

export default defineComponent({
  props: {
    ordertype: Number,
  },
  emits: ["remove"],
  setup(props, ctx) {
    const flag: boolean = inject("isShowDelete", false);
    return { flag };
  },
});
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>