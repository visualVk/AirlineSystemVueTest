<!--
 * @Author: your name
 * @Date: 2021-02-01 15:57:09
 * @LastEditTime: 2021-04-09 21:45:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\MsgDisplayMain\MsgSearchBar\MsgSearchBar.vue
-->
<template>
  <div class="msg_search_container">
    <el-row>
      <el-col :span="18" style="text-align: left">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <!-- TODO: 需要修改表单 -->
          <el-form-item label="信息标题">
            <el-input
              v-model="formInline.title"
              placeholder="信息标题"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["popTitle"],
  data() {
    return {
      formInline: {
        title: "",
        region: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit("popTitle", this.formInline.title);
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.msg_search_container {
  width: 100%;
  height: 70px;
  line-height: 70px;
  background: white;
  border: 1px solid #ccc;
}
.demo-form-inline {
  height: 70px !important;
  margin: 0;
  margin-left: 10px;
}
.demo-form-inline ::v-deep(.el-form-item),
.demo-form-inline ::v-deep(.el-form-item--mini),
.demo-form-inline ::v-deep(.el-form-item__content) {
  margin: 0 5px 0 0;
  height: 70px;
  line-height: 70px;
}
/* .el-form-item--mini .el-form-item__content; */
</style>