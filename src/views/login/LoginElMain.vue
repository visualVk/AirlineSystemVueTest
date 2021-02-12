<template>
  <div class="login">
    <section class="form_container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first"
          ><div class="manage_tip">
            <span class="title">登录</span>
            <el-form
              :model="loginUser"
              :rules="rules"
              ref="loginForm"
              label-width="60px"
              class="loginForm"
            >
              <el-form-item
                label="账号"
                v-model="loginUser.username"
                prop="username"
              >
                <el-input
                  v-model="loginUser.username"
                  placeholder="请输入账号"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="密码"
                v-model="loginUser.password"
                prop="password"
              >
                <el-input
                  type="password"
                  v-model="loginUser.password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  class="submit_btn"
                  @click="submitForm('loginForm')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div></el-tab-pane
        >
        <el-tab-pane label="注册" name="second">
          <div class="manage_tip">
            <span class="title">注册</span>
            <el-form
              :model="registerUser"
              :rules="registerRules"
              ref="registerForm"
              label-width="60px"
              class="loginForm"
            >
              <el-form-item
                label="账号"
                v-model="registerUser.username"
                prop="username"
              >
                <el-input
                  v-model="registerUser.username"
                  placeholder="请输入账号"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="密码"
                v-model="registerUser.password"
                prop="password"
              >
                <el-input
                  type="password"
                  v-model="registerUser.password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="密码"
                v-model="registerUser.repassword"
                prop="repassword"
              >
                <el-input
                  type="password"
                  v-model="registerUser.repassword"
                  placeholder="再输入密码"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  class="submit_btn"
                  @click="submitRegForm('loginForm')"
                  >注册</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
    <el-button
      class="home_btn"
      type="primary"
      icon="el-icon-s-home"
      alt="home"
      @click="backToHome"
      >返回主页</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs } from "vue";
import { useLogin } from "@/views/login/UseLogin.ts";
import { useRegister } from "@/views/login/UseRegister.ts";

export default defineComponent({
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    backToHome() {
      this.$router.replace("/");
    },
  },
  setup() {
    const _: any = inject("_");
    return _.merge({}, toRefs(useLogin()), toRefs(useRegister()));
  },
});
</script>

<style scoped>
.login {
  /* position: relative; */
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: url(../../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}

.form_container {
  background: white;
  width: 370px;
  height: 370px;
  position: absolute;
  top: 50%;
  margin-top: -185px;
  right: 50%;
  margin-right: -185px;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-style: 26px;
  color: #444;
}

.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}

.tiparea p a {
  color: #409eff;
}
.home_btn {
  position: absolute;
  right: 0%;
  bottom: 0%;
}
</style>