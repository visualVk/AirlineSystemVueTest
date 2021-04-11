<!--
 * @Author: your name
 * @Date: 2021-02-08 12:05:34
 * @LastEditTime: 2021-04-11 15:25:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\serviceClient\ServiceCommonQuestion\ServiceCommonQuestion.vue
-->
<template>
  <div class="container">
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16" style="text-align: left">
        <h2>常见问题</h2>
      </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="2" v-for="(i, index) in qList" :key="i.qid">
        <CommonCard
          :imgh="75"
          :imgw="75"
          :cardName="i.qtitle"
          @click="commonBtn(index)"
        ></CommonCard>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
  <el-dialog title="日常问题" v-model="dialogVisible" width="30%">
    <span>问：{{ qInDiaLog.qtitle }}</span>
    <p>
      <span>答：{{ qInDiaLog.qcontent }}</span>
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
import { defineComponent, inject, reactive, ref, toRefs } from "vue";
import CommonCard from "@/components/serviceClient/ServiceCommonQuestion/CommonCard/CommonCard.vue";
import { stores } from "@/utils/store/store";
import { QuestionVoImpl } from "@/utils/api/QuestionEntity";
import { prop } from "node_modules/vue-class-component/dist/vue-class-component";

export default defineComponent({
  components: {
    CommonCard,
  },
  props: {
    qList: Array,
  },
  setup(props) {
    const _: any = inject("_");
    return _.merge({}, toRefs(useQuestion(props)));
  },
});

const useQuestion = (props: any) => {
  const dialogVisible = ref(false);
  const qList = ref(props.qList);
  const qInDiaLog = reactive(new QuestionVoImpl());
  const commonBtn = (index: number) => {
    stores.isDebug ? console.log(qList.value[index]) : "";
    qInDiaLog.qtitle = qList.value[index].qtitle;
    qInDiaLog.qcontent = qList.value[index].qcontent;
    dialogVisible.value = true;
  };
  const handleClose = () => {
    dialogVisible.value = true;
  };
  return { commonBtn, handleClose, dialogVisible, qInDiaLog };
};
</script>

<style scoped>
.container {
  width: inherit;
  margin: 10px;
  padding: 10px;
  background: white;
}
</style>