<!--
 * @Author: your name
 * @Date: 2021-02-08 11:46:39
 * @LastEditTime: 2021-04-11 15:17:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\serviceClient\ServiceHotQuestion\ServiceHotQuestion.vue
-->
<template>
  <div class="container">
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16" style="text-align: left">
        <h2>热门问题</h2>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row class="hot_question">
      <el-col :span="4"></el-col>
      <el-col :span="8" style="text-align: left">
        <ol>
          <li v-for="(i, index) in qList.slice(0, 4)" :key="i.qid">
            <a href="javascript:void(0)" @click="showDialog(index, 0)">{{
              i.qtitle
            }}</a>
          </li>
        </ol>
      </el-col>
      <el-col :span="8" style="text-align: left">
        <ol>
          <li v-for="(i, index) in qList.slice(4, 8)" :key="i.qid">
            <a href="javascript:void(0)" @click="showDialog(index, 1)">{{
              i.qtitle
            }}</a>
          </li>
        </ol>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
  <el-dialog title="日常问题" v-model="dialogVisible" width="30%">
    <span>问：{{ showInDialog.qtitle }}</span>
    <p>
      <span>答：{{ showInDialog.qcontent }}</span>
    </p>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { QuestionVO, QuestionVoImpl } from "@/utils/api/QuestionEntity";
import { stores } from "@/utils/store/store";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  props: {
    qList: [QuestionVoImpl],
  },
  setup(props) {
    const qList = ref((props.qList as unknown) as Array<QuestionVO>);
    const dialogVisible = ref(false);
    const showInDialog = reactive({ qtitle: "", qcontent: "" });
    const showDialog = (index, col) => {
      stores.isDebug
        ? console.log(
            "[Service Hot Question]=",
            "{qList}",
            qList,
            "{entity}",
            qList.value[col * 4 + index]
          )
        : "";
      showInDialog.qtitle = qList.value[col * 4 + index].qtitle;
      showInDialog.qcontent = qList.value[col * 4 + index].qcontent;
      dialogVisible.value = true;
    };
    return { dialogVisible, showInDialog, showDialog };
  },
});
</script>

<style scoped>
.container {
  width: inherit;
  margin: 10px;
  padding: 10px;
  background: white;
}
.hot_question li a {
  padding: 3px 0 3px 25px;
  height: 22px;
  line-height: 1.8;
  color: #666;
  /* overflow: hidden; */
  white-space: nowrap;
  text-overflow: ellipsis;
  font: 12px/1.5 "PingFangSC-Regular", "Microsoft yahei", Arial, Simsun,
    sans-serif;
}
li {
  list-style: disc;
}
.hot_question li a:hover {
  color: #06c;
}
</style>