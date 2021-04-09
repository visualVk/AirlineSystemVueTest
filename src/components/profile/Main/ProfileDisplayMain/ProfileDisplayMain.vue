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
import { useMdBtn } from "@/components/profile/Main/ProfileDisplayMain/ProfileDisplayMain";

export default defineComponent({
  components: {
    ProfileAppItem,
  },
  data() {
    return {
      size: 55,
    };
  },
  setup() {
    const _: any = inject("_");
    return _.merge({}, toRefs(useMdBtn()));
  },
});
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