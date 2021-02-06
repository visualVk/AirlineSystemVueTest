<template>
  <span
    >{{ deadlineTime.hours }}:{{ deadlineTime.minutes }}:{{
      deadlineTime.second
    }}</span
  >
</template>

<script lang="ts">
import { stores } from "@/utils/store/store";
import {
  defineComponent,
  inject,
  onMounted,
  reactive,
  ReactiveEffect,
  Ref,
  ref,
  toRef,
  toRefs,
} from "vue";
import { prop } from "vue-class-component";

export default defineComponent({
  props: {
    deadline: {
      type: Object,
      default: {
        hours: 24,
        minutes: 0,
        second: 0,
      },
    },
  },
  setup(props, ctx) {
    const _: any = inject("_");

    const deadline = useDeadline(props);
    console.log(_.merge({}, toRefs(deadline)));

    return _.merge({}, toRefs(deadline));
  },
});
const useDeadline = (props: any) => {
  const deadlineCopy: Ref<Deadline> = toRef(props, "deadline");
  const deadlineTime = reactive({
    hours: deadlineCopy.value.hours,
    minutes: deadlineCopy.value.minutes,
    second: deadlineCopy.value.second,
  });
  const countDown = () => {
    if (
      deadlineTime.second == 0 &&
      deadlineTime.minutes == 0 &&
      deadlineTime.hours == 0
    )
      return;
    deadlineTime.second = deadlineTime.second - 1;
    if (deadlineTime.second < 0) {
      deadlineTime.second = deadlineTime.second + 59;
      deadlineTime.minutes = deadlineTime.minutes - 1;
    }
    if (deadlineTime.minutes < 0) {
      deadlineTime.minutes = deadlineTime.minutes + 60;
      deadlineTime.hours = deadlineTime.hours - 1;
    }

    setTimeout(() => {
      countDown();
    }, 1000);
  };
  onMounted(() => {
    countDown();
  });
  return { deadlineTime, countDown };
};

interface Deadline {
  hours: number;
  minutes: number;
  second: number;
}
</script>

<style scoped>
</style>