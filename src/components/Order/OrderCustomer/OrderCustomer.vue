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
            v-for="o in customerList"
            :key="o.idCard"
            closable
            type="info"
            effect="plain"
            @close="deleteFromList(o)"
          >
            {{ o.name }}
          </el-tag>
        </el-space>
      </div>
    </div>
    <div>
      <el-form :model="form" label-width="80px">
        <div
          style="background: white; padding: 10px; margin-top: 10px"
          class="form_shadow"
        >
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
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
      <el-form :model="contactForm" ref="formss" label-width="80px">
        <div
          style="background: white; padding: 10px; margin-top: 10px"
          class="form_shadow"
        >
          <el-form-item label="身份证号">
            <el-input v-model="contactForm.idCard"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
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
import { defineComponent, reactive, ref, Ref, toRef, toRefs } from "vue";
import { Customer } from "@/components/Order/OrderCustomer/OrderCustomer.ts";

export default defineComponent({
  setup() {
    const {
      contactForm,
      commonCustomerList,
      form,
      formss,
      customerList,
      addCustomerBtn,
      addToList,
      deleteFromList,
      nextBtn,
    } = useCustomers();

    return {
      contactForm,
      commonCustomerList,
      customerList,
      form,
      formss,
      addCustomerBtn,
      addToList,
      deleteFromList,
      nextBtn,
    };
  },
});

const useCustomers = () => {
  const formss = ref(null);
  const form: Ref<Customer> = ref({
    name: "",
    idCard: "",
    tel: "",
  });
  const contactForm = ref({
    name: "",
    idCard: "",
    tel: "",
  });
  const commonCustomerList: Ref<Array<Customer>> = ref([
    { name: "lulu", idCard: "303030303003030303", tel: "1235555412" },
  ]);
  const customerList = ref(new Set<Customer>());

  const addCustomerBtn = () => {
    let target = Object.assign({}, form.value);
    customerList.value.add(target);
    form.value.name = form.value.idCard = form.value.tel = "";
  };
  const addToList = (index: number) => {
    customerList.value.add(commonCustomerList.value[index]);
  };
  const deleteFromList = (index: Customer) => {
    customerList.value.delete(index);
  };
  //TODO: 表单校验

  //TODO: 下一步事件
  const nextBtn = () => {};
  return {
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