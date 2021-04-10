<template>
  <div style="width: 100%">
    <MsgSearchBar @popTitle="popTitle"></MsgSearchBar>
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
      v-model="checkedMsgIdList"
      @change="handleCheckedCitiesChange"
    >
      <!-- TODO: 之后需要借助数据进行遍历生成 -->
      <MsgListItem
        v-for="(msg, index) in showMsgList"
        :key="msg.msgId"
        :msgObj="msg"
        @operateBtn="operateBtn(index)"
      ></MsgListItem>
    </el-checkbox-group>
    <!--end  -->
    <el-row style="text-align: center">
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-pagination
          @current-change="handleCurrentChange"
          v-model:currentPage="page.currentPage"
          :page-size="page.pagesize"
          layout="total, prev, pager, next"
          :total="page.total"
        >
        </el-pagination>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRef, toRefs } from "vue";
import MsgSearchBar from "@/components/profile/Main/MsgDisplayMain/MsgSearchBar/MsgSearchBar.vue";
import MsgListItem from "@/components/profile/Main/MsgDisplayMain/MsgListItem/MsgListItem.vue";
import { stores } from "@/utils/store/store";
import { MsgServiceApi } from "@/utils/api";
import { MsgVoImpl } from "@/model/MsgEntity";
const msgIdOList = [""];
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
      msgIdList: [""],
      checkedMsgIdList: [""],
      msgList: [new MsgVoImpl()],
      msgListAfterFilter: [new MsgVoImpl()],
      showMsgList: [new MsgVoImpl()],
      page: {
        total: 0,
        pagesize: 5,
        currentPage: 1,
      },
    };
  },
  methods: {
    handleCurrentChange(page: number) {
      this.showMsgList = this.msgListAfterFilter.slice(
        (page - 1) * this.page.pagesize,
        page * this.page.pagesize
      );
    },
    handleCheckAllChange(val: any) {
      // console.log(val);
      this.checkedMsgIdList = val
        ? this.msgListAfterFilter.map((msg) => msg.msgId)
        : [];
      // console.log(this.checkedMsgIdList);
      // this.checkAll = true;
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value: any) {
      console.log(value);
      let checkedCount = value.length;
      // console.log(checkedCount);
      this.checkAll = checkedCount == this.msgListAfterFilter.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.msgListAfterFilter.length;
    },
    async findMsgByUsername() {
      let res = await MsgServiceApi.findMsgByUsername(
        stores.getUser().username.substring(1)
      );
      if (res.code == 0) {
        this.msgIdList = res.data.map((msg) => msg.msgId);
        this.checkedMsgIdList = [];
        msgIdOList.length = 0;
        res.data.forEach((msg) => msgIdOList.push(msg.msgId));
        this.page.total = res.data.length;
        this.checkAll = false;
        this.msgList = res.data;
        this.msgListAfterFilter = res.data;
        this.showMsgList = res.data.slice(0, this.page.pagesize);
        stores.isDebug
          ? console.log("[Msg Display Main]=", "{msg list}", this.msgList)
          : "";
      }
    },
    popTitle(title: string) {
      stores.isDebug ? console.log("[Msg Display Main]", "{title}", title) : "";
      this.checkAll = false;
      this.checkedMsgIdList = [];
      if (title == null || title == "") {
        this.msgListAfterFilter = this.msgList;
      } else {
        this.msgListAfterFilter = this.msgList.filter((msg) => {
          return msg.msgName.includes(title, 0);
        });
        stores.isDebug
          ? console.log(
              "[Msg Display Main]",
              "{msg list after filter}",
              this.msgListAfterFilter
            )
          : "";
      }
      this.page.currentPage = 1;
      this.page.total = this.msgListAfterFilter.length;
      this.showMsgList = this.msgListAfterFilter.slice(0, this.page.pagesize);
    },
  },
  mounted() {
    this.findMsgByUsername();
  },
  setup() {
    // TODO: 之后通过axios获取数据，进行for循环创建标签处元素
    const _: any = inject("_");
    return _.merge(toRefs(useMsg()));
  },
});

const useMsg = () => {
  const operateBtn = (index: number) => {
    stores.isDebug ? console.log("operateBtn's Index:", index) : "";
  };
  return { operateBtn };
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