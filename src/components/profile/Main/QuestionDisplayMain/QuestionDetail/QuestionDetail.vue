<template>
  <div class="container">
    <QuestionReply></QuestionReply>
    <QuestionAsk></QuestionAsk>
  </div>
  <div class="reply_write_container">
    <el-row>
      <el-col :span="18">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入回复，如果已得到答复，请点确认"
          v-model="questionDetail.content"
          maxlength="300"
          show-word-limit
        ></el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="5">
        <el-row>
          <el-col :span="24">
            <el-button type="danger" style="width: 100%"> 结束询问 </el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24">
            <el-button type="primary" style="width: 100%"> 回复 </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, toRefs } from "vue";
import QuestionReply from "@/components/profile/Main/QuestionDisplayMain/QuestionDetail/QuestionReply/QuestionReply.vue";
import QuestionAsk from "@/components/profile/Main/QuestionDisplayMain/QuestionDetail/QuestionAsk/QuestionAsk.vue";

export default defineComponent({
  components: {
    QuestionReply,
    QuestionAsk,
  },
  setup() {
    const _: any = inject("_");
    return _.merge(toRefs(useQuestionDetail()));
  },
});

const useQuestionDetail = () => {
  const questionDetail = reactive({
    userId: "",
    quesstionId: "",
    content: "",
  });
  /**
   * TODO:
   * 后续直接获得一个一个QuestionAskList,和QuestionReplyList,
   * 根据两个List动态生成对话框
   */
  return { questionDetail };
};
</script>

<style scoped>
.container {
  width: inherit;
  padding: 10px;
  background: white;
}
.reply_write_container {
  margin-top: 10px;
  background: ;
}
</style>