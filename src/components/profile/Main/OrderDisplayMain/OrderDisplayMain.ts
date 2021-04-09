import { AirlineTicketAllBO } from "@/model/TicketEntity";
import { AirlineInfoServiceApi } from "@/utils/api";
import { stores } from "@/utils/store/store";
import { ElMessage } from "element-plus";
import { ref, Ref, reactive, watch, onMounted } from "vue";

/*
 * @Author: your name
 * @Date: 2021-04-09 13:18:25
 * @LastEditTime: 2021-04-09 13:18:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\OrderDisplayMain\OrderDisplayMain.ts
 */
export const useOrder = () => {
  const activeName = ref("first");
  const ticketList: Ref<Array<AirlineTicketAllBO>> = ref([]);
  const passTicketList: Ref<Array<AirlineTicketAllBO>> = ref([]);
  const findTicketListByUsername = async () => {
    let ticketListRes = await AirlineInfoServiceApi.findTicketByQuerySet(
      {
        username: undefined,
        payUid: stores.getUser().uid,
        airlineSeatId: undefined,
        status: undefined,
      },
      1,
      100000000
    );
    if (ticketListRes.code == 0) {
      ticketList.value.length = 0;
      passTicketList.value.length = 0;
      ticketListRes.data.forEach((ticket) => {
        ticketList.value.push(ticket);
        passTicketList.value.push(reactive(ticket));
      });
      // passTicketList.value.length = 0;
      // passTicketList.value = ticketList.value;
      stores.isDebug
        ? console.log(
          "[Order Dipslay Main]=",
          "{ticket list}",
          ticketList.value,
          "{pass ticket list}",
          passTicketList.value
        )
        : "";
    } else {
      ElMessage.error("查询出错");
    }
  };
  const handleClick = (name: string) => {
    console.log("name=", name);
  };
  watch(activeName, (nn, oo) => {
    passTicketList.value.length = 0;
    if (nn == "first") {
      //全部订单，不过滤
      ticketList.value.forEach((ticket) => {
        passTicketList.value.push(ticket);
      });
    } else if (nn == "second") {
      ticketList.value.forEach((ticket) => {
        if (ticket.status == 1) passTicketList.value.push(ticket);
      });
    } else if (nn == "third") {
      ticketList.value.forEach((ticket) => {
        if (ticket.status == 0 || ticket.status == 3)
          passTicketList.value.push(ticket);
      });
    } else if (nn == "forth") {
      ticketList.value.forEach((ticket) => {
        if (ticket.status == 5) passTicketList.value.push(ticket);
      });
    }
    stores.isDebug
      ? console.log(
        "[Order Display Main]=",
        "{nn}",
        nn,
        "{active name}",
        activeName.value,
        "{ticket list}",
        ticketList.value,
        "{pass ticket list}",
        passTicketList.value
      )
      : "";
  });
  onMounted(() => {
    findTicketListByUsername();
  });
  return {
    ticketList,
    findTicketListByUsername,
    passTicketList,
    activeName,
    handleClick,
  };
};