<!--
 * @Author: your name
 * @Date: 2021-02-08 11:29:31
 * @LastEditTime: 2021-04-11 15:25:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\serviceClient\ServiceClientDisplayMain.vue
-->
<template>
  <div class="container">
    <!-- <ServiceSearchBar></ServiceSearchBar> -->
    <ServiceHotQUestion :qList="showHotQList"></ServiceHotQUestion>
    <ServiceCommonQuestion :qList="showRecQList"></ServiceCommonQuestion>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  Ref,
  toRefs,
} from "vue";
import ServiceSearchBar from "@/components/serviceClient/ServiceSearchBar/ServiceSearchBar.vue";
import ServiceHotQUestion from "@/components/serviceClient/ServiceHotQuestion/ServiceHotQuestion.vue";
import ServiceCommonQuestion from "@/components/serviceClient/ServiceCommonQuestion/ServiceCommonQuestion.vue";
import { QuestionVO, QuestionVoImpl } from "@/utils/api/QuestionEntity";
import { QuestionServiceApi } from "@/utils/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {
    ServiceSearchBar,
    ServiceHotQUestion,
    ServiceCommonQuestion,
  },
  setup() {
    const _: any = inject("_");
    return _.merge({}, toRefs(useCommons()));
  },
});

const useCommons = () => {
  const qList = ref([reactive(new QuestionVoImpl())]);
  const showHotQList = ref([reactive(new QuestionVoImpl())]);
  const showRecQList = ref([reactive(new QuestionVoImpl())]);
  const findQuestion = async () => {
    qList.value.length = 0;
    let res = await QuestionServiceApi.findQuestion();
    if (res.code == 0) {
      qList.value = res.data;
      showHotQList.value.length = 0;
      showRecQList.value.length = 0;
      res.data.slice(0, 8).forEach((question) => {
        showHotQList.value.push(reactive(question));
        showRecQList.value.push(reactive(question));
      });
      // showHotQList.value = res.data.slice(0, 8);
      // showRecQList.value = res.data.slice(0, 8);
    } else {
      ElMessage.error(res.message);
    }
  };
  onMounted(() => {
    findQuestion();
  });
  return { qList, showHotQList, showRecQList, findQuestion };
};
</script>

<style scoped>
.container {
  width: inherit;
}
</style>