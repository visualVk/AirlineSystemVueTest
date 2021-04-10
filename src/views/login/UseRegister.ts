/*
 * @Author: your name
 * @Date: 2021-02-12 13:52:29
 * @LastEditTime: 2021-04-10 11:59:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\views\login\UseRegister.ts
 */
import { UserService } from "@/utils/api"
import { stores } from "@/utils/store/store"
import { EmitsOptions } from "@vue/test-utils/dist/mount"
import { ElForm, ElMessage } from "element-plus"
import { reactive, Ref, ref, SetupContext } from "vue"
import { Router } from "vue-router"

interface RegisterUser {
  username: String,
  password: String,
  repassword: String
}

export const useRegister = (router: Router) => {
  const enRegister = ref(true)
  const registerForm = ref()
  const registerUser = reactive<RegisterUser>({
    username: "",
    password: "",
    repassword: ""
  })
  const vvalidator = MyValidtor(registerUser)
  const registerRules = reactive({
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
        min: 5,
        max: 30,
        message: "长度在6到30之间",
        trigger: "blur"
      },
      { validator: vvalidator.passwordSame, trigger: 'change' }
    ],
    repassword: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur"
      },
      {
        min: 5,
        max: 30,
        message: "长度在6到30之间",
        trigger: "blur"
      },
      { validator: vvalidator.passwordSame, trigger: 'change' }
    ]
  })
  const submitRegForm = () => {
    registerForm.value.validate(async (valid: Boolean) => {
      if (valid) {
        //TODO: 注册请求
        enRegister.value = false;
        let res = await UserService.register({ isAdmin: false, username: registerUser.username, password: registerUser.password, rememberMe: true })
        enRegister.value = true;
        if (res.code == 0) {
          ElMessage.success('注册成功，请手动进行登录')
        } else {
          ElMessage.error(res.message)
        }
        stores.isDebug ? console.log('login form value:', valid) : '';
      }
    });
  }
  return { registerForm, registerUser, registerRules, submitRegForm, enRegister }
}
const MyValidtor = (form: RegisterUser) => {
  const passwordSame = (rule: any, value: String, callback: any) => {
    // console.log(form);
    if (!value) {
      return callback(new Error('密码不能为空'));
    }
    const formerPassword = form.password, latterPassword = form.repassword
    // stores.isDebug ? console.log(formerPassword, latterPassword) : ''
    if (formerPassword == latterPassword) {
      callback()
    } else {
      callback('密码不一致')
    }
  };
  return { passwordSame }
}