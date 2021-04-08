<template>
  <div>
    <!-- 第一行 -->
    <el-row style="padding: 10px">
      <el-col :span="18">
        <div class="profile_avator_bg no_padding no_margin">
          <el-row style="height: 100%">
            <el-col :span="4" style="text-align: center">
              <el-image
                style="
                  width: 100px;
                  height: 100px;
                  top: 50%;
                  margin-top: -50px;
                  border-radius: 50%;
                "
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                fit="fill"
              ></el-image>
            </el-col>
            <el-col
              :span="16"
              style="height: 100%; text-align: left; color: white"
            >
              <div
                style="
                  width: 100%;
                  height: 60px;
                  line-height: 60px;
                  font-size: 20px;
                "
              >
                尊贵的用户{{ curUser.userNickname }}
              </div>
              <div
                style="
                  width: 100%;
                  height: 60px;
                  line-height: 60px;
                  font-size: 14px;
                "
              >
                <span
                  style="
                    font-family: Microsoft yahei, arial, Simsun, sans-serif;
                  "
                >
                  欢迎光临寒舍！
                </span>
              </div>
            </el-col>
            <el-col :span="4" style="text-align: right">
              <el-image
                style="width: 100px; height: 100px; top: 50%; margin-top: -50px"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                fit="fill"
              ></el-image>
            </el-col>
          </el-row>
        </div>
        <div
          style="height: 45px; width: 100%; background: white"
          class="no_padding no_margin"
        >
          <div style="width: 100%; text-align: center; height: 100%">
            <el-row style="height: 100%; line-height: 45px">
              <el-col :span="6" class="right_border inherit_height"
                >选项1</el-col
              >
              <el-col :span="6" class="right_border inherit_height"
                >选项2</el-col
              >
              <el-col :span="6" class="right_border inherit_height"
                >选项3</el-col
              >
              <el-col :span="6" class="inherit_height">选项3</el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div
          style="
            height: 165px;
            width: 100%;
            background: white;
            margin: 0 0 0 10px;
          "
        >
          <el-row
            style="
              text-align: left;
              height: 30px;
              line-height: 30px;
              border-bottom: 1px solid #e4e7ed;
            "
          >
            <span style="padding-left: 15%"><strong>应用中心</strong></span>
          </el-row>
          <el-row style="height: 135px">
            <el-col :span="12" style="text-align: center">
              <ProfileAppItem
                style="margin-top: 5px"
                itemName="应用一"
              ></ProfileAppItem>
            </el-col>
            <el-col :span="12" style="text-align: center">
              <ProfileAppItem
                style="margin-top: 5px"
                itemName="应用二"
              ></ProfileAppItem>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <el-row style="padding: 10px 0px 0 10px; min-height: 450px">
      <el-col
        :span="14"
        style="background: white; padding-right: 10px; padding-top: 10px"
      >
        <el-form
          :model="form"
          ref="userForm"
          label-width="140px"
          class="demo-ruleForm"
          :rules="userRule"
        >
          <div style="width: 80%">
            <el-form-item label="用户姓名" prop="userNickname">
              <el-input
                v-model="form.userNickname"
                :disabled="isEdit"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="form.idCard" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item
              label="是否修改密码"
              prop="isOn"
              v-if="isEdit == false"
            >
              <el-switch v-model="form.isOn"></el-switch>
            </el-form-item>
            <el-form-item label="旧密码" prop="opassword" v-if="form.isOn">
              <el-input
                v-model="form.opassword"
                show-password
                :disabled="isEdit"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="npassword" v-if="form.isOn">
              <el-input
                v-model="form.npassword"
                show-password
                :disabled="isEdit"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="重新输入新密码"
              prop="rnpassword"
              v-if="form.isOn"
            >
              <el-input
                v-model="form.rnpassword"
                show-password
                :disabled="isEdit"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-if="mdBtn.isOn" @click="modifyUserBtn"
                >提交</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-col>
      <el-col
        :span="10"
        style="background: white; padding-right: 10px; padding-top: 10px"
      >
        <el-button type="primary" @click="mdBtnClick">{{
          mdBtn.modifyBtnText
        }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref, toRefs, watch } from "vue";
import ProfileAppItem from "@/components/profile/Main/ProfileDisplayMain/ProfileAppItem/ProfileAppItem.vue";
import { stores } from "@/utils/store/store";
import { ModifyUserQuery } from "@/model/UserEntity";
import { ElMessage } from "element-plus";
import { UserService } from "@/utils/api";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    ProfileAppItem,
  },
  data() {
    return {
      size: 55,
      // ruleForm: {
      //   name: "",
      //   idCard: "",
      //   date1: "",
      //   date2: "",
      //   delivery: false,
      //   type: [],
      //   resource: "",
      //   desc: "",
      //   isOn: false,
      // },
    };
  },
  setup() {
    const _: any = inject("_");
    return _.merge({}, toRefs(useMdBtn()));
  },
});
const useMdBtn = () => {
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
</script>

<style scoped>
.el-row {
  width: 100%;
  height: 100%;
}
.profile_avator_bg {
  background: #36d1dc;
  background: -webkit-linear-gradient(
    to right,
    rgb(54, 209, 220),
    rgb(91, 134, 229)
  );
  background: linear-gradient(to right, rgb(54, 209, 220), rgb(91, 134, 229));
  height: 120px;
  width: 100%;
}
.no_padding {
  padding: 0;
}
.no_margin {
  margin: 0;
}

.right_border {
  border-right: 1px solid #e4e7ed;
}
.inherit_height {
  height: 100%;
}
</style>