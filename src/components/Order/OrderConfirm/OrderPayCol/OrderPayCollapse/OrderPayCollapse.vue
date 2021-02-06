<template>
  <div style="width: inherit" class="collapse_container">
    <el-collapse v-model="activeName" accordion style="width: inherit">
      <el-collapse-item>
        <template #title>
          <span style="font-size: 20px; font-weight: 700">
            {{ paymentMethod }}
          </span>
        </template>
        <div class="payment_qr_code_container">
          <!-- 二维码 -->
          <qrcode-vue :value="value" :size="size" level="H" />
        </div>
        <div class="deadline_container">
          <span
            >请在&nbsp;<DeadlineCount style="color: red"></DeadlineCount
            >&nbsp;内支付</span
          >
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DeadlineCount from "@/components/Order/OrderConfirm/OrderPayCol/DeadlineCount/DeadlineCount.vue";
import QrcodeVue from "qrcode.vue";
export default defineComponent({
  components: {
    DeadlineCount,
    QrcodeVue,
  },
  data() {
    return {
      value: "https://example.com",
      size: 300,
    };
  },
  props: {
    src: {
      type: String,
      default:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
    },
    paymentMethod: {
      type: String,
      default: "支付宝支付",
    },
  },
  setup() {
    return {};
  },
});

const usePayment = () => {};
</script>

<style scoped>
.payment_qr_code_container {
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  height: auto;
}
.img_ {
  top: 50%;
  margin-top: -75px;
}
.collapse_container ::v-deep(.el-collapse-item__header) {
  padding: 10px 10px;
}
.deadline_container {
  font-size: 20px;
  font-weight: 700;
}
</style>