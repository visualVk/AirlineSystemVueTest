<template>
  <div class="qcontainer">
    <el-row>
      <el-col :span="24" class="question_container">
        <span class="ask_title">{{ question.content }}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 5px">
      <el-col :span="24">
        <span class="ask_date">{{ question.date }}</span>
      </el-col>
    </el-row>
    <el-row style="height: 10px"></el-row>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { defineComponent } from "vue";
import { QuestionImp } from "../QuestionClass";

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
.qcontainer {
  width: inherit;
  background: #f2f6fc;
  text-align: right;
  padding: 10px;
}
.el-row {
  width: 100%;
  background: transparent;
}
.container_question {
  text-align: right;
  padding: 10px;
}
.ask_title {
  font-size: 20px;
}
.ask_date {
  font-size: 12px;
  color: #ccc;
}
</style>