<template>
  <div>
    <el-row style="height: 80px">
      <!-- 图标区 -->
      <el-col :span="4" style="text-align: right; line-height: 80px">
        <el-image style="width: 75px; height: 75px" :src="url" fit="fill">
        </el-image>
      </el-col>
      <!-- 公司 -->
      <el-col :span="6" style="line-height: 40px; text-align: center">
        <div>
          <span class="company">公司{{}}</span>
        </div>
        <div>
          <span class="airlineTitle">航班名{{}}</span>
        </div>
      </el-col>
      <!-- 地点和时间 -->
      <el-col :span="6" style="line-height: 40px">
        <el-row>
          <el-col :span="8" style="text-align: center">
            <div><span>出发地{{}}</span></div>
            <div>时间{{}}</div>
          </el-col>
          <el-col :span="8" style="line-height: 80px; text-align: center">
            <i class="el-icon-right"></i>
          </el-col>
          <el-col :span="8" style="text-align: center">
            <div>目的地{{}}</div>
            <div>时间{{}}</div>
          </el-col>
        </el-row>
      </el-col>
      <!-- 按钮以及标签区 -->
      <el-col :span="8" style="text-align: right; line-height: 80px">
        <el-space size="10px">
          <!-- TODO: 之后需要通过数据循环创建 -->
          <el-tag type="success" v-for="i in 4" :key="i">标签三</el-tag>
        </el-space>
        <el-button
          style="margin-right: 10px"
          @click="isShow = !isShow"
          :class="isShow ? 'close-btn' : 'show-btn'"
        >
          {{ closeAndShowBtnText }}
        </el-button>
      </el-col>
    </el-row>
    <el-row v-show="isShow" style="background: #f8fafb">
      <!-- TODO: 未来需要通过数据for循环创建 -->
      <TicketBrieftItem
        v-for="i in 1"
        :key="i"
        style="border-bottom: 1px solid #e4e7ed"
      ></TicketBrieftItem>
    </el-row>
    <el-row style="background: #e9eef3; height: 5px"></el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import TicketBrieftItem from "@/components/searchList/TicketBriefItem/TicketBriefItem.vue";
export default defineComponent({
  components: {
    TicketBrieftItem,
  },
  props: {
    imgUrl: String,
    airlineInfoObj: {
      default: {
        company: "str",
        airlineName: "str",
      },
    },
  },
  setup() {
    const { isShow, closeAndShowBtnText } = useCommons();
    return { isShow, closeAndShowBtnText };
  },
});
const useCommons = () => {
  const isShow = ref(false);
  const closeAndShowBtnText = computed(() => {
    return isShow.value ? "收起" : "展开";
  });
  return { isShow, closeAndShowBtnText };
};
</script>

<style scoped>
.el-row {
  width: 100%;
}
.show-btn {
  background-image: linear-gradient(90deg, #ffa50a, #f70);
  color: white;
}
.show-btn:hover,
.show-btn:visited,
.show-btn:active,
.show-btn:link {
  color: white;
  background-image: linear-gradient(90deg, #ffa50a, #f70);
}
.close-btn {
  color: #ff9913;
  background: white;
}
.close-btn:hover,
.close-btn:visited,
.close-btn:active,
.close-btn:link {
  color: #ff9913;
  background: white;
}
</style>