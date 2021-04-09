import { ModifyUserQuery } from "@/model/UserEntity";
import { UserService } from "@/utils/api";
import { stores } from "@/utils/store/store";
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

/*
 * @Author: your name
 * @Date: 2021-04-08 20:41:57
 * @LastEditTime: 2021-04-08 20:43:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\ProfileDisplayMain\ProfileDisplayMain.ts
 */
export const useMdBtn = () => {
  const textArr = ["开启修改", "取消修改"];
  const router = useRouter();
  const curUser = ref(stores.getUser());
  const userForm = ref(null);
  const isEdit = ref(true);
  const form = ref({
    userNickname: curUser.value.userNickname,
    idCard: curUser.value.username.substring(1),
    isOn: false,
    opassword: "",
    npassword: "",
    rnpassword: "",
  });
  const userRule = ref({
    userNickname: [
      { required: true, message: "请输入姓名", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
    idCard: [
      { required: true, message: "请输入身份证号", trigger: "blur" },
      // { min: 18, max: 18, message: "长度为18个字符", trigger: "blur" },
    ],
    opassword: [
      { required: false, message: "请输入邮箱", trigger: "blur" },
      { min: 4, max: 18, message: "长度4-18位", trigger: "blur" },
    ],
    npassword: [
      { required: false, message: "请输入邮箱", trigger: "blur" },
      { min: 4, max: 18, message: "长度4-18位", trigger: "blur" },
    ],
    rnpassword: [
      { required: false, message: "请输入邮箱", trigger: "blur" },
      { min: 4, max: 18, message: "长度4-18位", trigger: "blur" },
    ],
  });
  const mdBtn = reactive({
    modifyBtnText: "开启修改",
    isOn: false,
  });
  const mdBtnClick = () => {
    mdBtn.isOn = !mdBtn.isOn;
    isEdit.value = !isEdit.value;
    mdBtn.modifyBtnText = textArr[mdBtn.isOn ? 1 : 0];
  };
  const modifyUserBtn = () => {
    let el: any = userForm.value;
    let target = Object.assign({}, form.value);
    el.validate(async (valid: boolean) => {
      //校验两次密码是否相同
      if (target.npassword != null || target.npassword != "") {
        if (target.npassword != target.rnpassword) {
          ElMessage.error("两次密码输入不相同");
          return;
        }
      }
      stores.isDebug
        ? console.log("[Profile Display Main]=", "{valid}", valid)
        : "";
      let userSubmit: ModifyUserQuery = {
        userNickname: target.userNickname,
        username: target.idCard,
        email: undefined,
        gender: undefined,
        oldPassword: target.opassword,
        password: target.npassword,
      };
      let modifyRes = await UserService.modifyUser(userSubmit);
      if (modifyRes.code == 0) {
        stores.getUser().userNickname = modifyRes.data.userNickname;
        if (target.isOn) {
          ElMessage.success("修改成功,2S后跳转到登录页面，重新登录");
          // setTimeout(() => {}, 2000);
          let logoutRes = await UserService.logout();
          router.replace("/login");
        } else {
          ElMessage.success("修改成功");
        }
      } else {
        ElMessage.error("修改失败，请重新提交");
      }
    });
  };
  return {
    mdBtn,
    mdBtnClick,
    curUser,
    form,
    userForm,
    userRule,
    isEdit,
    modifyUserBtn,
  };
};