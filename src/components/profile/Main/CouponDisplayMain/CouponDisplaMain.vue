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
      v-model="checkedCouponIdList"
      @change="handleCheckedCitiesChange"
    >
      <!-- TODO: 之后需要借助数据进行遍历生成 -->
      <coupon-list-item
        v-for="(coupon, index) in showCouponList"
        :key="coupon.couponId"
        :couponItem="coupon"
        @operateBtn="operateBtn(index)"
      ></coupon-list-item>
    </el-checkbox-group>
    <!--end  -->
    <el-row style="text-align: center">
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-pagination
          @current-change="handleCurrentChange"
          v-model:currentPage="page.currentPage1"
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
import { defineComponent, inject, toRefs } from "vue";
import MsgSearchBar from "@/components/profile/Main/MsgDisplayMain/MsgSearchBar/MsgSearchBar.vue";
import MsgListItem from "@/components/profile/Main/MsgDisplayMain/MsgListItem/MsgListItem.vue";
import { stores } from "@/utils/store/store";
import dayjs from "dayjs";
import { CouponServiceApi } from "@/utils/api";
import { ElMessage } from "element-plus";
import { CouponVOImpl } from "@/model/CouponEntity";
import CouponListItem from "./CouponListItem/CouponListItem.vue";
const couponIdOList = [""];
export default defineComponent({
  components: {
    MsgSearchBar,
    MsgListItem,
    CouponListItem,
  },
  data() {
    return {
      //TODO:未来需要修改
      isIndeterminate: true,
      checkAll: false,
      couponIdList: [""],
      checkedCouponIdList: [""],
      couponList: [new CouponVOImpl()],
      couponListAfterFilter: [new CouponVOImpl()],
      showCouponList: [new CouponVOImpl()],
      page: {
        total: 0,
        pagesize: 5,
        currentPage: 1,
      },
    };
  },
  methods: {
    handleCurrentChange(page: number) {
      this.showCouponList = this.showCouponList.slice(
        (page - 1) * this.page.pagesize,
        page * this.page.pagesize
      );
    },
    handleCheckAllChange(val: any) {
      // console.log(val);
      this.checkedCouponIdList = val
        ? this.couponListAfterFilter.map((coupon) => coupon.couponId)
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value: any) {
      // console.log(value);
      let checkedCount = value.length;
      // console.log(checkedCount);
      this.checkAll = checkedCount === this.couponListAfterFilter.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.couponListAfterFilter.length;
    },
    async findCouponByUsername() {
      let couponRes = await CouponServiceApi.findCouponByUsername(
        stores.getUser().username.substring(1)
      );
      if (couponRes.code == 0) {
        this.couponIdList = couponRes.data.map((coupon) => coupon.couponId);
        this.checkedCouponIdList = [];
        couponIdOList.length = 0;
        couponRes.data.forEach((coupon) => couponIdOList.push(coupon.couponId));
        this.couponList = couponRes.data;
        this.couponListAfterFilter = couponRes.data;
        this.page.total = this.couponListAfterFilter.length;
        this.checkAll = false;
        this.showCouponList = this.couponListAfterFilter.slice(
          0,
          this.page.pagesize
        );
      } else {
        ElMessage.error(couponRes.message);
      }
    },
    popTitle(title: string) {
      this.checkAll = false;
      this.checkedCouponIdList = [];
      if (title == null || title == "") {
        this.couponListAfterFilter = this.couponList;
      } else {
        this.couponListAfterFilter = this.couponList.filter((coupon) => {
          return coupon.couponName.includes(title, 0);
        });
      }
      this.page.currentPage = 1;
      this.page.total = this.couponListAfterFilter.length;
      this.showCouponList = this.couponListAfterFilter.slice(
        0,
        this.page.pagesize
      );
    },
  },
  mounted() {
    this.findCouponByUsername();
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