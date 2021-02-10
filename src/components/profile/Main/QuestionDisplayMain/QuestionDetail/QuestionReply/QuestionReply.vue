<template>
  <div class="container">
    <el-row>
      <div style="border-right: 1px solid #ccc; padding: 10px">
        <img src="@/assets/Question/serviceclient.svg" alt="" />
      </div>
      <el-col :span="21" class="question_container">
        <el-row style="" class="reply_title">
          {{ question.content }}
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: right">
            <span style="text-align: right" class="reply_date">{{
              question.date
            }}</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="border-bottom: 1px dashed #ccc; height: 10px"></el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  QuestionImp,
  QuestionInf,
} from "@/components/profile/Main/QuestionDisplayMain/QuestionDetail/QuestionClass.ts";
import dayjs from "dayjs";

export default defineComponent({
  props: {
    question: {
      type: QuestionImp,
      default: {
        questionId: "q1",
        title: "client",
        content: "content",
        date: dayjs(new Date()).format("YYYY-MM-DD"),
      },
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.container {
  width: inherit;
  background: #f2f6fc;
}
.el-row {
  width: 100%;
}
.container_center {
  vertical-align: middle;
}
.question_container {
  padding: 10px;
}
.reply_title {
  font-size: 20px;
}
.reply_date {
  font-size: 12px;
  color: #ccc;
}
</style>