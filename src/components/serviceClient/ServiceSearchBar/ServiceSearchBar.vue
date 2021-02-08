<template>
  <div class="container">
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select"
        >
          <template #append>
            <el-button icon="el-icon-search"></el-button>
          </template> </el-input
      ></el-col>
      <el-col :span="4">
        <el-button type="primary">我要提问</el-button>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs } from "vue";
import { Router, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const _: any = inject("_");
    const router = useRouter();
    return _.merge(toRefs(useQuestion(router)));
  },
});

const useQuestion = (router: Router) => {
  const aksQuestionBtn = () => {
    // router.push()
    // TODO: 提问跳转
  };
  return { useQuestion };
};
</script>

<style scoped>
.container {
  width: inherit;
  height: auto;
  margin: 10px;
  padding: 10px;
  background: white;
}
</style>