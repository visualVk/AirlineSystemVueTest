import { stores } from "@/utils/store/store";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export const useQuestion = () => {
  // TODO: 未来需要修改选中数组，以及check数据的类型
  const router = useRouter()
  const isIndeterminate = ref(true)
  const checkAll = ref(false)
  const questionTitleArr = ref(["上海", "北京", "广州", "深圳"])
  const checkedQuestion = ref(["上海", "北京"])

  const handleCheckAllChange = (val: any) => {
    // console.log(val);
    checkedQuestion.value = val ? ["上海", "北京", "广州", "深圳"] : [];
    isIndeterminate.value = false;
  }
  const handleCheckedCitiesChange = (value: any) => {
    // console.log(value);
    let checkedCount = value.length;
    // console.log(checkedCount);
    checkAll.value = checkedCount === questionTitleArr.value.length;
    isIndeterminate.value =
      checkedCount > 0 && checkedCount < questionTitleArr.value.length;
  }
  const titleBtn = (index: Number) => {
    stores.isDebug ? console.log(index) : ''
    router.push({ name: 'ProfileQuestionDetail' })
  }
  return { isIndeterminate, checkAll, questionTitleArr, checkedQuestion, handleCheckAllChange, handleCheckedCitiesChange, titleBtn }
}