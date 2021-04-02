<!--
 * @Author: your name
 * @Date: 2021-01-30 14:34:23
 * @LastEditTime: 2021-04-02 11:05:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\searchList\TicketBriefItem\TicketBriefItem.vue
-->
<template>
  <el-row style="height: 58px; line-height: 58px">
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <el-row>
        <el-col :span="16">
          <el-space size="10" spacer="|" style="font-size: 12px">
            <el-button type="text">退票须知</el-button>
            <!-- <el-popover
              placement="top-start"
              title="标题"
              :width="200"
              trigger="hover"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
              <template #reference>
                <el-button>hover 激活</el-button>
              </template>
            </el-popover> -->
            <el-button type="text">订票须知</el-button>
          </el-space>
        </el-col>
        <el-col :span="8" style="font-size: 14px">
          <el-button type="text">电子机票</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-row>
        <el-col :span="15"> {{ seatBO.seatTypeName }} </el-col>
        <el-col :span="4" style="color: #ff7d13">
          <span style="font-size: 12px">￥</span>
          <span style="font-size: 20px">{{ seatBO.price }}</span>
        </el-col>
        <el-col :span="4">
          <el-button
            style="
              background-image: linear-gradient(90deg, #ffa50a, #f70);
              color: white;
            "
            @click="orderBtn"
          >
            预定
          </el-button>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Router, useRouter } from "vue-router";

export default defineComponent({
  props: {
    seatBO: {
      default: {
        price: 90,
        remain: 5,
        seatTypeId: "ST1",
        seatTypeName: "经济舱",
        tot: 0,
      },
    },
  },
  setup() {
    const router = useRouter();
    const { orderBtn } = useCommons(router);
    return { orderBtn };
  },
});

const useCommons = (router: Router) => {
  const orderBtn = () => {
    router.push({ path: "order" });
  };
  return { orderBtn };
};
</script>

<style>
.el-row {
  width: 100%;
}
</style>