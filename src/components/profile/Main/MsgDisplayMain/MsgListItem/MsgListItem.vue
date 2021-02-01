<template>
  <el-row class="container">
    <el-col :span="2">
      <el-checkbox :label="msgObj.title"
        ><span class="msg_title_font"></span
      ></el-checkbox>
    </el-col>
    <el-col :span="14" class="msg_title_font" style="text-align: left">{{
      msgObj.title
    }}</el-col>
    <el-col :span="4" class="msg_title_font">{{ msgObj.date }}</el-col>
    <el-col :span="4" class="msg_title_font">
      <el-link type="primary">{{ msgObj.operator }}</el-link>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";
import { MsgListItem } from "@/components/profile/Main/MsgDisplayMain/MsgListItem/MsgListItem.ts";
export default defineComponent({
  props: {
    msgObj: {
      type: MsgListItem,
      default: {
        title: "上海",
        date: dayjs(new Date()).format("YYYY-MM-DD"),
        operator: "操作",
      },
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.el-row {
  width: 100%;
}
.container {
  padding: 10px;
  border-bottom: 1px dashed #666666;
}
.msg_title_font {
  font-size: 14px;
  color: #666666;
}
</style>