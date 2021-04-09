import { AirlineTicketAllBOImpl } from "@/model/TicketEntity";
import { AirlineInfoServiceApi } from "@/utils/api";
import { stores } from "@/utils/store/store";
import { ElMessage } from "element-plus";
import { reactive, provide, onMounted } from "vue";
import { useRouter } from "vue-router";

/*
 * @Author: your name
 * @Date: 2021-04-09 13:10:39
 * @LastEditTime: 2021-04-09 13:11:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\profile\Main\OrderDetailMain\OrderDetailMain.ts
 */
export const useCommons = () => {
  const ticket = reactive(new AirlineTicketAllBOImpl());
  provide("ticket", ticket);
  const route = useRouter().currentRoute;
  const findTicketById = async () => {
    let ticketRes = await AirlineInfoServiceApi.findTIcketById(
      route.value.query.ticketId as string
    );
    if (ticketRes.code == 0) {
      stores.isDebug
        ? console.log(
          "[Order Detail Main]",
          "{ticket result}",
          ticketRes.data
        )
        : "";
      const ticketResD1 = ticketRes.data[0];
      const keys = Object.keys(ticketResD1);
      for (const key of keys) {
        if (ticketResD1[key] != undefined) {
          ticket[key] = ticketResD1[key];
        }
      }
      stores.isDebug
        ? console.log("[Order Ticket Detail]=", "{ticket}", ticket)
        : "";
    } else {
      ElMessage.error("查询出错");
    }
  };
  onMounted(() => {
    findTicketById();
  });
  return {};
}