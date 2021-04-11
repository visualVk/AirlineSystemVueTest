<!--
 * @Author: your name
 * @Date: 2021-02-09 12:54:13
 * @LastEditTime: 2021-04-11 12:00:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\QuestionDisplayMain\QuestionDetail\QuestionDetail.vue
-->
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

<script>
import {
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import QuestionReply from "@/components/profile/Main/QuestionDisplayMain/QuestionDetail/QuestionReply/QuestionReply.vue";
import QuestionAsk from "@/components/profile/Main/QuestionDisplayMain/QuestionDetail/QuestionAsk/QuestionAsk.vue";
import { stores } from "@/utils/store/store";
import VueSocketIO from "vue-socket.io";
import * as io from "socket.io-client";
// import fromr "socket.io"
//TODO:聊天室BUG，有问题

export default defineComponent({
  components: {
    QuestionReply,
    QuestionAsk,
  },
  setup() {
    const _ = inject("_");
    return _.merge(toRefs(useQuestionDetail()));
  },
  data() {
    return {};
  },
  created() {},
  unmounted() {
    // this.socket.disconnect();
  },
});

const useQuestionDetail = () => {
  const questionDetail = reactive({
    userId: "",
    quesstionId: "",
    content: "",
  });
  // const socket = new VueSocketIO({
  //   debug: true,
  //   connection: `http://127.0.0.1:32002?token=Bearer ${stores.token}`, //options object is Optional
  // });
  // console.log("socket=", socket);
  // socket.on("chat", (data) => {
  //   console.log("[chat],{data}=", data);
  // });
  // socket.io.on("chat", function (data) {
  //   stores.isDebug ? console.log("[Question Detail]", "{chat}", data) : "";
  // });
  // const sendConnect = () => {
  //   socket.connect();
  // };
  // const sendDisConnect = () => {
  //   socket.disconnect();
  // };
  // const sendChat = () => {
  //   let singleRequest = {
  //     fromUid: token,
  //     toUid: toUserId,
  //     message: message,
  //   };
  //   socket.emit("chat", singleRequest, function (data) {
  //     stores.isDebug ? console.log("[Question Detail]", "{chat}", data) : "";
  //     if (data && data.flag) {
  //       stores.isDebug ? console.log("[Question Detail]", "{chat}", data) : "";
  //     } else {
  //       stores.isDebug ? console.log("[Question Detail]", "{chat}", data) : "";
  //     }
  //   });
  // };
  onMounted(() => {});
  onUnmounted(() => {
    // sendDisConnect();
  });
  // return { questionDetail, sendDisConnect, sendChat, sendConnect };
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
  background: transparent;
}
</style>