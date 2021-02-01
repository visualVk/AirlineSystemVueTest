<template>
  <div style="width: 100%">
    <MsgSearchBar></MsgSearchBar>
  </div>
  <div style="height: 20px"></div>
  <div class="msg_container">
    <el-row class="msg_title">
      <span style="padding: 5px">所有信息</span>
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
    </el-row>
    <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
    >
      <MsgListItem></MsgListItem>
    </el-checkbox-group>
    <!--end  -->
    <el-row style="text-align: center">
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:currentPage="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="100"
        >
        </el-pagination>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MsgSearchBar from "@/components/profile/Main/MsgDisplayMain/MsgSearchBar/MsgSearchBar.vue";
import MsgListItem from "@/components/profile/Main/MsgDisplayMain/MsgListItem/MsgListItem.vue";

export default defineComponent({
  components: {
    MsgSearchBar,
    MsgListItem,
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
  methods: {
    handleCheckAllChange(val: any) {
      // console.log(val);
      this.checkedCities = val ? ["上海", "北京", "广州", "深圳"] : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value: any) {
      // console.log(value);
      let checkedCount = value.length;
      // console.log(checkedCount);
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
  setup() {
    // TODO: 之后通过axios获取数据，进行for循环创建标签处元素
    const {} = useMsg();
    return {};
  },
});

const useMsg = () => {
  return {};
};
</script>

<style scoped>
.msg_container {
  width: 100%;
  background: white;
  border: 1px solid #ccc;
}
.el-row {
  width: 100%;
}
.msg_title {
  background: white;
  height: 30px;
  line-height: 30px;
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