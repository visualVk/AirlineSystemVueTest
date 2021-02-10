<template>
  <el-row class="container">
    <el-col :span="2">
      <el-checkbox :label="msgObj.title"
        ><span class="msg_title_font"></span
      ></el-checkbox>
    </el-col>
    <el-col :span="14" class="msg_title_font" style="text-align: left">
      <el-link href="javascript:void(0);" type="primary" @click="titleBtn">
        {{ msgObj.title }}&nbsp;|&nbsp;{{ status ? "已读" : "未读" }}
      </el-link>
    </el-col>
    <el-col :span="4" class="msg_title_font">{{ msgObj.date }}</el-col>
    <el-col :span="4" class="msg_title_font">
      <el-link type="primary" href="javascript:void(0);" @click="operatorBtn">
        {{ msgObj.operator }}
      </el-link>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, inject, ref, SetupContext, toRef, toRefs } from "vue";
import dayjs from "dayjs";
import { MsgListItem } from "@/components/profile/Main/MsgDisplayMain/MsgListItem/MsgListItem.ts";
import { EmitsOptions } from "@vue/test-utils/dist/mount";
export default defineComponent({
  emits: ["operateBtn", "titleBtn"],
  props: {
    msgObj: {
      type: MsgListItem,
      default: {
        title: "上海",
        date: dayjs(new Date()).format("YYYY-MM-DD"),
        operator: "删除",
        msgDetail: "",
      },
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx: SetupContext<EmitsOptions>) {
    // const { isShowTitle, showTitleBtn } = useTitle(ctx);
    const _: any = inject("_");

    return _.merge({}, toRefs(useTitle(ctx)));
  },
});

const useTitle = (ctx: SetupContext<EmitsOptions>) => {
  const isShowTitle = ref(false);
  const showTitleBtn = () => {
    isShowTitle.value = !isShowTitle.value;
    return false;
  };
  const operatorBtn = () => {
    ctx.emit("operateBtn");
  };
  const titleBtn = () => {
    ctx.emit("titleBtn");
  };
  return { isShowTitle, showTitleBtn, operatorBtn, titleBtn };
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