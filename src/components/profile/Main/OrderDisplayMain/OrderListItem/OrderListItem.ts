import { AirlineInfoServiceApi } from "@/utils/api";
import { stores } from "@/utils/store/store";
import { ElMessage } from "element-plus";
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

/*
 * @Author: your name
 * @Date: 2021-04-09 13:16:00
 * @LastEditTime: 2021-04-09 13:16:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\OrderDisplayMain\OrderListItem\OrderListItem.ts
 */
export const useCommons = (props: any) => {
  const router = useRouter();
  const innertIsShowCancel = ref(true);
  const ticket = ref(props.ticket);
  const cityList = ref(["", ""]);
  const statusClass = reactive({
    status_cancel: (ticket.value?.status as number) == 2,
    status_wait_pay:
      (ticket.value?.status as number) == 0 ||
      (ticket.value?.status as number) == 3,
    status_wait_travel: (ticket.value?.status as number) == 1,
  });
  stores.isDebug
    ? console.log("[Order List Item]=", "{status}", ticket.value?.status)
    : "";
  stores.isDebug
    ? console.log("[Order List Item]=", "{status class}", statusClass)
    : "";
  const statusLB = computed(() => {
    const status = ticket.value?.status as number;
    innertIsShowCancel.value = Boolean(status != 2 && status != 5);
    stores.isDebug
      ? console.log(
        "[Order List Item]=",
        "{isSohowCancel}",
        innertIsShowCancel,
        "{status == 2?}",
        status != 2,
        "{status == 5?}",
        status != 5,
        false && true
      )
      : "";
    if (status == 0 || status == 3) return "未支付";
    else if (status == 2) return "已取消";
    else if (status == 4) return "等票中";
    else if (status == 1) return "待出行";
    else return "已使用";
  });
  stores.isDebug
    ? console.log("[Order List Item]=", "{status LB}", statusLB)
    : "";
  onMounted(async () => {
    let airlineInfoRes = await AirlineInfoServiceApi.findAirlineInfoByQuerySet(
      {
        airlineId: ticket.value?.airlineId,
        airlineDate: undefined,
        supTicketIds: undefined,
        departureCityId: undefined,
        destinationCityId: undefined,
      }
    );
    if (airlineInfoRes.code == 0) {
      cityList.value.length = 0;
      cityList.value.push(airlineInfoRes.data[0].departureCity.cityName);
      cityList.value.push(airlineInfoRes.data[0].destinationCity.cityName);
    } else {
      ElMessage.error(airlineInfoRes.message);
    }
  });
  const cancelOrder = async () => {
    let cancelRes = await AirlineInfoServiceApi.cancelTicketOrder(
      ticket.value?.ticketId!
    );
    if (cancelRes.code == 0) {
      ElMessage.success("取消成功");
    } else {
      ElMessage.error(cancelRes.message);
    }
  };
  const orderDetailBtn = () => {
    router.push({
      path: "/orderDetail",
      query: { ticketId: ticket.value?.ticketId },
    });
  };
  return { orderDetailBtn, cityList, cancelOrder, statusClass, statusLB };
}