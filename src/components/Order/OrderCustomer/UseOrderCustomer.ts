import { stores } from "@/utils/store/store";
import MessageBox from "element-plus/lib/el-message-box";
import { EmitsOptions, getCurrentInstance, reactive, Ref, ref, SetupContext, watch } from "vue";
import { Customer, validator } from "./OrderCustomer";

export const useCustomers = (props: any, ctx: SetupContext<EmitsOptions>) => {
  const app = getCurrentInstance()?.appContext.config.globalProperties;
  const formss = ref(null);
  const customerForm = ref(null);
  const form: Ref<Customer> = ref({
    name: "",
    idCard: "",
    tel: "",
  });
  const formRules = ref({
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    idCard: [
      { required: true, message: '请输入身份证号', trigger: 'blur' },
      { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' }
    ],
    tel: [
      { required: false, message: '请输入手机号', trigger: 'blur' },
      { validator: validator.checkPhone, trigger: 'blur' }
    ]
  })
  const contactForm = ref({
    name: "",
    idCard: "",
    tel: "",
  });
  const contactRules = ref({
    idCard: [
      { required: true, message: '请输入身份证号', trigger: 'blur' },
      { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' }
    ],
    tel: [
      { required: false, message: '请输入手机号', trigger: 'blur' },
      { validator: validator.checkPhone, trigger: 'blur' }
    ]
  })
  //TODO: 需要再onmouted的时候，通过axios获取常用乘客信息
  const commonCustomerList: Ref<Array<Customer>> = ref([
    { name: "lulu", idCard: "303030303003030303", tel: "1235555412" },
  ]);
  const customerList = ref(new Array<Customer>());



  const addCustomerBtn = () => {
    let target = Object.assign({}, form.value);
    if (
      //是否重复添加相同信息的乘客
      customerList.value.some((element) => {
        return element.idCard == target.idCard;
      })
    ) {
      MessageBox.alert("不能添加相同身份证号的乘客", "警告");
      return;
    }
    //表单校验
    let el: any = customerForm.value
    el.validate((valid: boolean) => {
      stores.isDebug ? console.log(valid) : ''
      if (valid) {
        customerList.value.push(target);
        for (let v in form.value) {
          form.value[v] = "";
        }
      }
    })
  };
  const addToList = (index: number) => {
    let target = Object.assign({}, commonCustomerList.value[index]);
    if (
      //是否重复添加相同信息的乘客
      customerList.value.some((element) => {
        return element.idCard == target.idCard;
      })
    ) {
      MessageBox.alert("不能添加相同身份证号的乘客", "警告");
      return;
    }
    customerList.value.push(commonCustomerList.value[index]);
  };
  const deleteFromList = (index: number) => {
    customerList.value.splice(index, 1);
  };
  watch(customerList.value, (oo, nn) => {
    ctx.emit("updateNum", nn.length);
  }); //返回乘客人数的变化

  //TODO: 下一步事件
  const nextBtn = () => { };
  return {
    contactRules,
    formRules,
    customerForm,
    contactForm,
    customerList,
    commonCustomerList,
    form,
    formss,
    addCustomerBtn,
    addToList,
    deleteFromList,
    nextBtn,
  };
};