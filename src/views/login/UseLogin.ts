import { stores } from "@/utils/store/store"
import { EmitsOptions } from "@vue/test-utils/dist/mount"
import { ElForm } from "element-plus"
import { reactive, Ref, ref, SetupContext } from "vue"

interface LoginUser {
  username: String,
  password: String
}

export const useLogin = () => {
  const loginForm = ref()
  const loginUser = reactive<LoginUser>({
    username: "",
    password: "",
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
        min: 5,
        max: 30,
        message: "长度在6到30之间",
        trigger: "blur"
      }
    ]
  })
  const submitForm = () => {
    loginForm.value.validate((valid: Boolean) => {
      if (valid) {
        //TODO: 登录请求
        stores.isDebug ? console.log('login form value:', valid) : '';
      }
    });
  }
  return { loginForm, loginUser, rules, submitForm }
}