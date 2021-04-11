<template>
  <div class="container">
    <div class="msg_container">
      <!-- <el-row class="msg_title">
        <el-col :span="12">
          <span style="padding: 5px">所有问题</span>
        </el-col>
        <el-col :span="12">
          <el-link
            type="danger"
            style="line-height: 50px"
            href="javascript:void(0)"
            >删除</el-link
          >
        </el-col>
      </el-row>
      <el-row class="msg_header">
        <el-col :span="2">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            size="mini"
            ><span class="msg_title_font">全选</span></el-checkbox
          >
        </el-col>
        <el-col :span="14" class="msg_title_font">主题</el-col>
        <el-col :span="4" class="msg_title_font">时间</el-col>
        <el-col :span="4" class="msg_title_font">操作</el-col>
      </el-row> -->
      <!-- <el-checkbox-group
        v-model="checkedQuestion"
        @change="handleCheckedCitiesChange"
      >
        <QuestionListItem
          v-for="i in 4"
          :key="i"
          @titleBtn="titleBtn(i - 1)"
        ></QuestionListItem>
      </el-checkbox-group> -->
      <div>
        <question-detail></question-detail>
      </div>
      <!-- end -->
      <!-- <el-row style="text-align: center">
        <el-col :span="2"></el-col>
        <el-col :span="20">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-model:currentPage="currentPage1"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="questionTitleArr.length"
          >
          </el-pagination>
        </el-col>
        <el-col :span="2"></el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs } from "vue";
import QuestionListItem from "@/components/profile/Main/QuestionDisplayMain/QuestionListItem/QuestionListItem.vue";
import QuestionDetail from "@/components/profile/Main/QuestionDisplayMain/QuestionDetail/QuestionDetail.vue";
import { useQuestion } from "@/components/profile/Main/QuestionDisplayMain/UseQuestion";

export default defineComponent({
  components: {
    QuestionListItem,
    QuestionDetail,
  },
  data() {
    return {
      //TODO:未来需要修改
      isIndeterminate: true,
      checkAll: false,
      cities: ["上海", "北京", "广州", "深圳"],
      checkedCities: ["上海", "北京"],
    };
  },
  setup() {
    const _: any = inject("_");
    return _.merge({}, toRefs(useQuestion()));
  },
});
</script>

<style scoped>
.container {
  width: inherit;
  background: white;
  /* border: 1px solid #ccc; */
}

.el-row {
  width: 100%;
}
.msg_container {
  width: 100%;
  background: white;
  border: 1px solid #ccc;
}
.msg_title span {
  background: white;
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  font-size: 14px;
  font-family: Simsun, sans-serif;
}
.msg_header {
  background: #f0f0f0;
  height: 30px;
  line-height: 30px;
}
.msg_title_font {
  font-size: 12px;
  color: #666666;
}
</style>