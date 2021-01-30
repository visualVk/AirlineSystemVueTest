<template>
  <el-row style="width: 100%; height: 70px; line-height: 70px">
    <el-col :span="2"></el-col>
    <el-col :span="20" style="text-align: left">
      <span
        >第&nbsp;<span style="font-size: 20px"
          ><strong>{{ titleObj.title }}</strong></span
        >&nbsp;趟：&nbsp;</span
      >
      <span style="font-size: 20px">
        <strong>
          {{ titleObj.departure }}
          <i class="el-icon-right"> </i>
          {{ titleObj.destination }}
        </strong>
      </span>
      <span> &nbsp;{{ showDate }} </span>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <el-row style="width: 100%">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <!-- TODO: 未来需要通过数据for循环创建 -->
      <div style="background: white">
        <SearchSelectBar></SearchSelectBar>
        <SearchListAirlineItem v-for="i in 4" :key="i"></SearchListAirlineItem>
      </div>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from "vue";
import { TitleObjInterface } from "@/components/searchList/SearchListTitle/SearchListTitle.ts";
import SearchListAirlineItem from "@/components/searchList/SearchListAirlineItem/SearchListAirlineItem.vue";
import SearchSelectBar from "@/components/searchList/SearchSelectBar/SearchSelectBar.vue";
export default defineComponent({
  components: {
    SearchListAirlineItem,
    SearchSelectBar,
  },
  props: {
    titleObj: {
      default: {
        title: "ddd",
        departure: "wz",
        destination: "bj",
        date: new Date(),
      },
    },
  },
  setup(props, ctx) {
    const { showDate } = useTitle(props);
    return { showDate };
  },
});

const useTitle = (props: any) => {
  const titleObj: Ref<TitleObjInterface> = toRef(props, "titleObj");
  const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const showDate = computed(() => {
    return (
      titleObj.value.date.getFullYear() +
      "年" +
      (titleObj.value.date.getMonth() + 1) +
      "月" +
      titleObj.value.date.getDate() +
      "日" +
      week[titleObj.value.date.getDay()]
    );
  });
  return { showDate };
};
</script>

<style scoped>
.el-row {
  width: 100%;
}
</style>