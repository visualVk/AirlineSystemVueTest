<template>
  <div class="passenger_box">
    <div class="box_tit">
      <h2>乘客</h2>
      <div class="notice_tips">
        <div>特惠机票每单最多可为4位乘客预订成人票。</div>
      </div>
    </div>
    <div class="common_list">
      <el-space size="large" direction="horizontal" wrap>
        <!-- TODO: 之后for循环生成常用乘客LIST -->
        <el-button
          class="common_list_item"
          size="medium"
          plain
          v-for="(o, index) in commonCustomerList"
          :key="o.idCard"
          @click="addToList(index)"
        >
          {{ o.name }}
        </el-button>
      </el-space>
    </div>
    <div class="box_tit">
      <h2>已选乘客</h2>
      <div class="">
        <el-space size="large" direction="horizontal" wrap>
          <!-- TODO: 之后for循环生成常用乘客LIST -->
          <el-tag
            v-for="(o, index) in customerList"
            :key="o.idCard"
            closable
            type="info"
            effect="plain"
            @close="deleteFromList(index)"
          >
            {{ o.name }}
          </el-tag>
        </el-space>
      </div>
    </div>
    <div>
      <el-form
        :model="form"
        label-width="80px"
        ref="customerForm"
        :rules="formRules"
      >
        <div
          style="background: white; padding: 10px; margin-top: 10px"
          class="form_shadow"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </div>
        <div style="margin-top: 20px">
          <el-button @click="addCustomerBtn" plain>添加乘客</el-button>
        </div>
      </el-form>
    </div>
  </div>
  <div class="contact">
    <div class="box_tit">
      <h2>联系人</h2>
      <div class="notice_tips">
        <div>订单信息将会发到该联系人手机上</div>
      </div>
    </div>
    <div>
      <el-form
        :model="contactForm"
        ref="formss"
        label-width="80px"
        :rules="contactRules"
      >
        <div
          style="background: white; padding: 10px; margin-top: 10px"
          class="form_shadow"
        >
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="contactForm.idCard"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="contactForm.tel"></el-input>
          </el-form-item>
        </div>
        <div style="margin-top: 20px; width: 100%">
          <el-button style="width: 100%" @click="nextBtn" type="primary"
            >下一步</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  reactive,
  ref,
  Ref,
  SetupContext,
  toRef,
  toRefs,
  watch,
} from "vue";
import { Customer } from "@/components/Order/OrderCustomer/OrderCustomer.ts";
import MessageBox from "element-plus/lib/el-message-box";
import { EmitsOptions } from "@vue/test-utils/dist/mount";
import { useCustomers } from "@/components/Order/OrderCustomer/UseOrderCustomer";

export default defineComponent({
  emits: ["updateNum"],
  setup(props, ctx: SetupContext<EmitsOptions>) {
    const useCustom = useCustomers(props, ctx);
    const _: any = inject("_");

    return _.merge({}, toRefs(useCommons()), toRefs(useCustom));
  },
});
const useCommons = () => {
  const testRef = ref(0);
  return { testRef };
};
</script>

<style scoped>
.contact,
.passenger_box {
  margin: 20px 0;
  text-align: left;
}
.box_tit {
  margin-bottom: 10px;
  color: #849bab;
  display: block;
  width: 100%;
}
.box_tit h2 {
  color: #234;
  display: inline-block;
}
.notice_tips {
  margin-left: 10px;
  display: inline-block;
  max-width: 450px;
  vertical-align: middle;
  font-size: 12px !important;
  font-family: BlinkMacSystemFont, Helvetica, Arial, Tahoma, PingFang SC,
    Hiragino Sans GB, Lantinghei SC, Microsoft YaHei, sans-serif !important;
}
.common_list_item {
  min-width: 100px;
}
.form_shadow {
  -moz-box-shadow: 2px 2px 5px #ccc;
  -webkit-box-shadow: 2px 2px 5px #ccc;
  box-shadow: 2px 2px 5px #ccc;
}
</style>