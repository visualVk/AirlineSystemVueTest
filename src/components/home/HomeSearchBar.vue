<template>
  <div class="card">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理"
            ><notice-bar
              ><div style="text-align: right">
                <el-button type="text">详情</el-button>
              </div></notice-bar
            >
            <el-row style="width: 95%; margin-top: 30px">
              <el-space direction="vertical" alignment="start" :size="30">
                <el-radio-group v-model="orderType">
                  <el-radio :label="1">单程</el-radio>
                  <el-radio :label="2">往返</el-radio>
                  <el-radio :label="3">多程</el-radio>
                </el-radio-group>
              </el-space>
            </el-row>
            <el-row>
              <home-airline-order
                style="width: 100%"
                v-for="(item, index) in alreadyOrderList"
                :key="index"
                @remove="deleteAirOrder(index)"
              ></home-airline-order>
            </el-row>
            <el-row v-if="orderType == 3"
              ><el-button type="primary" @click="addOrderItem"
                >添加</el-button
              ></el-row
            >
            <el-row style="margin-top: 20px">
              <el-col :span="8"></el-col>
              <el-col :span="8"
                ><el-button icon="el-icon-search" type="primary" round
                  >搜索</el-button
                ></el-col
              >
              <el-col :span="8"></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {
  getCurrentInstance,
  provide,
  reactive,
  readonly,
  ref,
  toRef,
  watch,
} from "vue";
import NoticeBar from "../commons/NoticeBar.vue";
import HomeAirlineOrder from "@/components/home/HomeAirlineOrder.vue";
import { AlreadyOrderItem } from "@/components/HomeClass.ts";
import MessageBox from "element-plus/lib/el-message-box";
import { VueWithProps } from "vue-class-component";
export default {
  components: { NoticeBar, HomeAirlineOrder },
  setup() {
    const app = getCurrentInstance()?.appContext.config.globalProperties;
    const orderType = ref(1);
    const swapAddress = (event: { target: { blur: () => void } }) => {
      console.log(event.target);
      event.target.blur();
    };
    //order list part
    let flag = ref(false);
    provide("isShowDelete", readonly(flag)); //delete button will be displayed according to flag
    const alreadyOrderList = ref([
      reactive(new AlreadyOrderItem("wzn", "sxb")),
    ]);
    const addOrderItem = () => {
      let list: AlreadyOrderItem[] = alreadyOrderList.value;
      if (list.length >= 5) {
        console.log(app);
        app?.$alert("最多同时订购5张", "前排提示", {
          confirmButtonText: "确定",
          callback: (action: any) => {
            app?.$message({
              type: "info",
              message: "取消添加",
            });
          },
        });
      } else list.push(reactive(new AlreadyOrderItem("", "")));
    };
    const deleteAirOrder = (index: number) => {
      let list = alreadyOrderList.value;
      if (list.length <= 2) {
        app?.$alert("至少订购2张", "前排提示", {
          confirmButtonText: "确定",
          callback: (action: any) => {
            app?.$message({
              type: "info",
              message: "取消删除",
            });
          },
        });
        return;
      }
      list.splice(index, 1);
    };
    watch(orderType, (nn, oo) => {
      //change value of isShowDelete accordding to ordetype(e.g. 1=>single,2=>double,3=>mulitply)
      let list = alreadyOrderList.value;
      let length = list.length;
      if (orderType.value == 1 || orderType.value == 2) flag.value = false;
      else flag.value = true;
      if (length > nn) {
        list.splice(nn);
      } else {
        length = nn - length;
        while (length > 0) {
          length--;
          list.push(reactive(new AlreadyOrderItem("", "")));
        }
      }
      console.log(alreadyOrderList.value);
    });
    watch(alreadyOrderList.value, (nn, oo) => {
      console.log(nn);
    });
    return {
      orderType,
      swapAddress,
      alreadyOrderList,
      addOrderItem,
      deleteAirOrder,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-tabs {
  border-radius: 15px;
}
.card {
  margin-top: 30px;
  height: 100%;
}
</style>