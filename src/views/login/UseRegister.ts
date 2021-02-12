import { stores } from "@/utils/store/store"
import { EmitsOptions } from "@vue/test-utils/dist/mount"
import { ElForm } from "element-plus"
import { reactive, Ref, ref, SetupContext } from "vue"

interface RegisterUser {
  username: String,
  password: String,
  repassword: String
}

export const useRegister = () => {
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
    registerForm.value.validate((valid: Boolean) => {
      if (valid) {
        //TODO: 注册请求
        stores.isDebug ? console.log('login form value:', valid) : '';
      }
    });
  }
  return { registerForm, registerUser, registerRules, submitRegForm }
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