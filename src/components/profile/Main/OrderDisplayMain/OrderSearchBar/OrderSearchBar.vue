<!--
 * @Author: your name
 * @Date: 2021-02-01 18:04:13
 * @LastEditTime: 2021-04-08 22:47:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\OrderDisplayMain\OrderSearchBar\OrderSearchBar.vue
-->
<template>
  <div class="order_search_container">
    <el-row>
      <el-col :span="18" style="text-align: left">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <!-- TODO: 需要修改表单 -->
          <el-form-item label="筛选规则" prop="sort">
            <el-radio-group v-model="ruleForm.sort" @change="sortChange">
              <el-radio label="1">按时间排序-升序</el-radio>
              <el-radio label="2">按时间排序-降序</el-radio>
              <el-radio label="3">按价格排序-升序</el-radio>
              <el-radio label="4">按价格排序-降序</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item> -->
        </el-form>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      ruleForm: {
        sort: "1",
      },
      formInline: {
        sort: "1",
      },
    };
  },
  emits: ["popSort"],
  methods: {
    onSubmit() {
      //TODO: 需要修改提交方法
      console.log(this.ruleForm);
    },
    sortChange(label: number) {
      this.$emit("popSort", label);
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.order_search_container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: white;
  border: 1px solid #ccc;
}
.demo-form-inline {
  height: 50px !important;
  margin: 0;
  margin-left: 10px;
}
.demo-form-inline ::v-deep(.el-form-item),
.demo-form-inline ::v-deep(.el-form-item--mini),
.demo-form-inline ::v-deep(.el-form-item__content) {
  margin: 0 5px 0 0;
  height: 50px;
  line-height: 50px;
}
</style>