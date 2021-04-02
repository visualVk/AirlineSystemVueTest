/*
 * @Author: your name
 * @Date: 2021-02-12 12:42:13
 * @LastEditTime: 2021-03-20 16:05:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\views\login\UseLogin.ts
 */
import { UserService } from "@/utils/api"
import service from "@/utils/axios"
import { stores } from "@/utils/store/store"
import { EmitsOptions } from "@vue/test-utils/dist/mount"
import Axios from "axios"
import { ElForm } from "element-plus"
import { reactive, Ref, ref, SetupContext } from "vue"
import { Router } from "vue-router"

interface LoginUser {
  username: String,
  password: String,
  isAdmin: Boolean
  rememberMe: Boolean
}

export const useLogin = (router: Router) => {
  const loginForm = ref()
  const loginUser = reactive<LoginUser>({
    username: "",
    password: "",
    isAdmin: false,
    rememberMe: false
  })
  const rules = reactive({
    username: [
      { required: true, message: '用户名不能为空', trigger: 'blur' }

    ],
    password: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur"
      },
      {
        min: 4,
        max: 30,
        message: "长度在4到30之间",
        trigger: "blur"
      }
    ]
  })
  const submitForm = () => {
    loginForm.value.validate(async (valid: Boolean) => {
      if (valid) {
        //TODO: 登录请求
        // stores.isDebug ? console.log('login form value:', valid) : '';
        let res = await UserService.login({ username: loginUser.username, password: loginUser.password, rememberMe: false, isAdmin: false })
        // stores.isDebug ? console.log(res) : ''
        if (res.code === 0) {
          let tokenObj = res.data
          stores.tokenType = tokenObj.tokenType
          stores.token = tokenObj.token
          // console.log(`login:${stores.tokenType}-${stores.token}`);

          router.push({ path: '/' })
          stores.isLogin = true
        }
      }
    });
  }
  return { loginForm, loginUser, rules, submitForm }
}