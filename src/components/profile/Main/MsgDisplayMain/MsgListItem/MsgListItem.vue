<template>
  <el-row class="container">
    <el-col :span="2">
      <el-checkbox :label="msgObj.title"
        ><span class="msg_title_font"></span
      ></el-checkbox>
    </el-col>
    <el-col :span="14" class="msg_title_font" style="text-align: left">
      <el-link
        href="javascript:void(0);"
        type="primary"
        @click="showTitleBtn"
        >{{ msgObj.title }}</el-link
      >
    </el-col>
    <el-col :span="4" class="msg_title_font">{{ msgObj.date }}</el-col>
    <el-col :span="4" class="msg_title_font">
      <el-link type="primary">{{ msgObj.operator }}</el-link>
    </el-col>
  </el-row>
  <el-row style="min-height: 100px" v-show="isShowTitle">
    <div class="msg_detail_container">
      <p>{{ msgObj.msgDetail }}</p>
      <p>{{ msgObj.date }}</p>
    </div>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
import { MsgListItem } from "@/components/profile/Main/MsgDisplayMain/MsgListItem/MsgListItem.ts";
export default defineComponent({
  props: {
    msgObj: {
      type: MsgListItem,
      default: {
        title: "上海",
        date: dayjs(new Date()).format("YYYY-MM-DD"),
        operator: "删除",
        msgDetail:
          "尊敬的用户:您的现金余额收入96.00元(转账 转账)，点击此处查看",
      },
    },
  },
  setup() {
    const { isShowTitle, showTitleBtn } = useTitle();
    return { isShowTitle, showTitleBtn };
  },
});

const useTitle = () => {
  const isShowTitle = ref(false);
  const showTitleBtn = () => {
    isShowTitle.value = !isShowTitle.value;
    return false;
  };
  return { isShowTitle, showTitleBtn };
};
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
.msg_detail_container {
  width: 100%;
  margin: 5px;
  line-height: 1.5;
  background: #e8f4ff;
  border: 1px solid #666;
  padding: 5px;
  text-align: left;
}
.msg_detail_container p,
.msg_detail_container a {
  font-family: Arial;
  font-size: 12px;
}
.msg_detail_container p {
  color: #333;
}
</style>