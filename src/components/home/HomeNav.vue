<template>
  <el-container style="height: 45px">
    <el-row style="width: 100%">
      <el-col :span="8" style="text-align: right; padding-right: 5%"
        >让你的旅行更幸福</el-col
      >
      <el-col :span="8"
        ><el-button
          type="text"
          icon="el-icon-bangzhu"
          size="small"
          @click="homeBtn"
          >Home</el-button
        ></el-col
      >
      <el-col :span="8">
        <el-row>
          <el-space alignment="start" size="20" spacer="|" id="buttog-group">
            <!-- <el-button type="text" v-if="isLogin" @click="profileBtn"
              >尊敬的客户</el-button
            > -->
            <el-dropdown
              @command="handleCommand"
              v-if="isLogin"
              style="width: 150px"
            >
              <span class="el-dropdown-link">
                尊敬的客户，您好<i
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button type="text" v-else @click="loginBtn"
              >登录/注册</el-button
            >
            <el-button
              type="text"
              icon="el-icon-message-solid"
              style="color: #909399"
              @click="msgBtn"
            >
              <el-badge is-dot>消息</el-badge>
            </el-button>
            <el-button
              type="text"
              icon="el-icon-s-ticket"
              style="color: #909399"
              @click="couponBtn"
              >优惠券</el-button
            >
            <el-button
              type="text"
              icon="el-icon-s-management"
              style="color: #909399"
              @click="orderBtn"
              >我的订单</el-button
            >
            <el-button
              type="text"
              icon="el-icon-s-custom"
              style="color: #909399"
              @click="serviceBtn"
              >问题集中地</el-button
            >
          </el-space>
        </el-row>
      </el-col>
    </el-row>
  </el-container>
</template>

<script lang='ts'>
import { inject, ref, toRef, toRefs } from "vue";
import "@/utils/store/store.ts";
import { stores } from "@/utils/store/store";
import { Router, useRoute, useRouter } from "vue-router";
import { UserService } from "@/utils/api";
import router from "@/router";
import { ElMessage } from "element-plus";
export default {
  methods: {},
  setup() {
    const router = useRouter();
    const _: any = inject("_");
    return _.merge(
      toRefs(useCommons()),
      toRefs(useLoginAndProfile(router)),
      toRefs(useLoginAndProfile(router)),
      toRefs(useOrder(router)),
      toRefs(useMsg(router)),
      toRefs(useHome(router)),
      toRefs(useCoupon(router)),
      toRefs(useService(router))
    );
  },
};

const useService = (router: Router) => {
  const serviceBtn = () => {
    router.push({ path: "/serviceClient" });
  };
  return { serviceBtn };
};

const useHome = (router: Router) => {
  const homeBtn = () => {
    router.push({ path: "/" });
  };
  return { homeBtn };
};

const useCoupon = (router: Router) => {
  const couponBtn = () => {
    router.push({ name: "ProfileCoupon" });
  };
  return { couponBtn };
};

const useOrder = (router: Router) => {
  const orderBtn = () => {
    router.push({ name: "ProfileOrder" });
  };
  return { orderBtn };
};

const useMsg = (router: Router) => {
  const msgBtn = () => {
    router.push({ name: "ProfileMsg" });
  };
  return { msgBtn };
};

const useLoginAndProfile = (router: Router) => {
  const loginBtn = () => {
    router.push({ name: "Login" });
  };
  const profileBtn = () => {
    // router.push();
    //=>/profile/me==1
    router.push({ name: "ProfileMe" });
  };
  // 使用commond代替，depreacted
  const logout = async () => {
    let res = await UserService.logout();
    if (res.code === 0) {
      stores.token = "";
      stores.tokenType = "";
      stores.isLogin = false;
      ElMessage.success("用户登出");
      // let rt = useRouter();
    }
    stores.isDebug ? console.log("[logout]=", "{router}", router) : "";
    // router.push({ path: "/" });
  };
  return {
    loginBtn,
    profileBtn,
    logout,
  };
};

/**
 * others
 */
const useCommons = () => {
  const isLogin = ref(stores.isLogin);

  const handleCommand = async (command: String) => {
    stores.isDebug ? console.log("command value:", command) : "";
    if (command == "logout") {
      let res = await UserService.logout();
      if (res.code === 0) {
        stores.token = "";
        stores.tokenType = "";
        stores.isLogin = false;
        isLogin.value = stores.isLogin;
        router.push({ path: "/" });
      }
    }
  };
  return {
    isLogin,
    handleCommand,
  };
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  line-height: 45px;
}
</style>