<!--
 * @Author: your name
 * @Date: 2021-02-01 17:26:11
 * @LastEditTime: 2021-04-10 13:15:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\MsgDisplayMain\MsgListItem\MsgListItem.vue
-->
<template>
  <el-row class="container">
    <el-col :span="2">
      <el-checkbox :label="couponItem.couponId"
        ><span class="msg_title_font"></span
      ></el-checkbox>
    </el-col>
    <el-col :span="14" class="msg_title_font" style="text-align: left">
      <el-link
        href="javascript:void(0);"
        type="primary"
        @click="showTitleBtn"
        >{{ couponItem.couponName }}</el-link
      >
    </el-col>
    <el-col :span="4" class="msg_title_font">{{ couponItem.deadline }}</el-col>
    <el-col :span="4" class="msg_title_font">
      <el-link type="primary" href="javascript:void(0);" @click="operatorBtn">
        点击{{}}
      </el-link>
    </el-col>
  </el-row>
  <el-row style="min-height: 100px" v-show="isShowTitle">
    <div class="msg_detail_container">
      <p>{{ couponItem.couponDetail }}</p>
      <p>{{ couponItem.dadeadlinete }}</p>
    </div>
  </el-row>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  SetupContext,
  toRef,
  toRefs,
  watch,
} from "vue";
import dayjs from "dayjs";
import { MsgListItem } from "@/components/profile/Main/MsgDisplayMain/MsgListItem/MsgListItem";
import { EmitsOptions } from "@vue/test-utils/dist/mount";
import { MsgVo, MsgVoImpl } from "@/model/MsgEntity";
import { prop } from "node_modules/vue-class-component/dist/vue-class-component";
import { stores } from "@/utils/store/store";
import { CouponVOImpl } from "@/model/CouponEntity";
export default defineComponent({
  emits: ["operateBtn"],
  props: {
    couponItem: {
      type: CouponVOImpl,
    },
  },
  setup(props, ctx: SetupContext<EmitsOptions>) {
    // const { isShowTitle, showTitleBtn } = useTitle(ctx);
    const _: any = inject("_");
    const msg = ref(props.couponItem);
    stores.isDebug ? console.log("[Msg List Item]=", "{msg}", msg) : "";
    watch(msg, (nn, oo) => {
      stores.isDebug ? console.log("[Msg List Item]=", "{msg}", msg) : "";
    });
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
  return { isShowTitle, showTitleBtn, operatorBtn };
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