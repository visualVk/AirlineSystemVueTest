import { stores } from "@/utils/store/store";
import { ref, Ref, watch } from "vue";

/*
 * @Author: your name
 * @Date: 2021-04-09 13:12:56
 * @LastEditTime: 2021-04-09 13:13:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\OrderDisplayMain\OrderTabPanel\OrderTabPanel.ts
 */
export const useCommons = (props: any) => {
  const ticketList = ref(props.ticketList);
  const showTicketList: Ref<typeof ticketList.value> = ref([]);
  showTicketList.value.length = 0;
  const page = ref({
    pagesize: 5,
    total: ticketList.value.length,
    curPage: 1,
  });
  // watch(ticketList.value, (oo, nn) => {
  //   stores.isDebug ? console.log("[Order Tab Panel]=", oo, nn) : "";
  //   page.value.pageSize = oo.length;
  // });
  //排序规则
  const popSort = (label: number) => {
    stores.isDebug ? console.log("[Order Tab Panel]=", "{label}", label) : "";
    page.value.curPage = 1;
    if (label == 1) {
      ticketList.value.sort((a, b) => {
        if (a.airlineDate == b.airlineDate) {
          return a.ticketId < b.ticketId ? -1 : 1;
        } else {
          return a.airlineDate < b.airlineDate ? -1 : 1;
        }
      });
    } else if (label == 2) {
      ticketList.value.sort((a, b) => {
        if (a.airlineDate == b.airlineDate) {
          return a.ticketId < b.ticketId ? -1 : 1;
        } else {
          return a.airlineDate > b.airlineDate ? -1 : 1;
        }
      });
    } else if (label == 3) {
      ticketList.value.sort((a, b) => {
        if (a.price == b.price) {
          return a.ticketId < b.ticketId ? -1 : 1;
        } else {
          return a.price < b.price ? -1 : 1;
        }
      });
    } else if (label == 4) {
      ticketList.value.sort((a, b) => {
        if (a.price == b.price) {
          return a.ticketId < b.ticketId ? -1 : 1;
        } else {
          return a.price > b.price ? -1 : 1;
        }
      });
    }
    showTicketList.value = ticketList.value.slice(0, 5);
    stores.isDebug
      ? console.log(
        "[Order Tab Panel]=",
        "{show ticket list}",
        showTicketList.value
      )
      : "";
  };
  const handleCurrentChange = (cur: number) => {
    page.value.curPage = cur;
  };
  ticketList.value.sort((a, b) => {
    if (a.airlineDate == b.airlineDate) {
      return a.ticketId < b.ticketId ? -1 : 1;
    } else {
      return a.airlineDate < b.airlineDate ? -1 : 1;
    }
  });
  watch(ticketList.value, (oo, nn) => {
    page.value.total = nn.length;
    showTicketList.value = ticketList.value.slice(0, 5);
  });
  watch(page.value, (oo, nn) => {
    // console.log(oo, nn);
    showTicketList.value = ticketList.value.slice(
      (nn.curPage - 1) * nn.pagesize,
      nn.curPage * nn.pagesize
    );
  });
  return { page, showTicketList, handleCurrentChange, popSort };
}