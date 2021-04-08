import { TicketLockSeat, TicketLockUser } from "@/model/TicketEntity";
import { dateFormat } from "@/utils/date/DateFormatUtil";
import { stores } from "@/utils/store/store";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { Customer } from "./OrderCustomer/OrderCustomer";
import { AirlineInfoServiceApi } from '@/utils/api/index'
import { ElMessage, ElMessageBox } from "element-plus";
import { AirlineInfo } from "@/model/AirlineEntity";
import { SeatBO } from "@/model/SeatBOEntity";

/*
 * @Author: your name
 * @Date: 2021-04-07 09:43:23
 * @LastEditTime: 2021-04-08 11:42:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\Order\OrderTicketBrief\OrderMain.ts
 */
export const useCustom = () => {
  const orderObj = reactive([
    {
      price: "123",
      num: "0",
      changeFee: "12",
    },
  ]);
  const router = useRouter();
  const curRoute = useRouter().currentRoute.value;
  //用于子控件机票信息显示
  const airlineObj = reactive(
    JSON.parse(curRoute.query.airlineObj as string) as AirlineInfo
  );
  const seatBO = reactive(
    JSON.parse(curRoute.query.seatBO as string) as SeatBO
  );
  orderObj[0].price = seatBO.price.toString();
  stores.isDebug
    ? console.log(
      "[Order Main]=",
      "{airlineObj}",
      airlineObj,
      "{seatBO}",
      seatBO
    )
    : "";
  const updateNum = (num: Number) => {
    orderObj[0].num = num.toString();
  };
  const popCustomerList = async (customerList: Array<Customer>) => {
    stores.isDebug
      ? console.log("[Order Main]=", "{popCustomerList}", customerList)
      : "";
    //检验是否又乘客
    if (customerList == null || customerList.length == 0) {
      ElMessage.error("必须要有一名乘客");
      return;
    }
    //检测用户是否存在，存在不加，不存在加
    let lockUserList = customerList.map(custom => {
      return {
        username: custom.idCard,
        userNickname: custom.name,
        email: custom.tel
      }
    })
    let lockRes = await AirlineInfoServiceApi.addTicketLockUser(lockUserList)
    stores.isDebug ? console.log('[Order Main]=', '{lock result}', lockRes) : ""
    if (lockRes.code != 0) {
      ElMessage.error(lockRes.message)
      return;
    }
    let orderLockList = customerList.map(custom => {
      return {
        airlineSeatId: airlineObj.airlineSeatId,
        seatTypeId: seatBO.seatTypeId,
        username: custom.idCard,
        payUid: stores.getUser().uid,
        createDate: dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
        preferSeatIndex: custom.preferSeatIndex,
        ticketTypeId: custom.ticketTypeId,
      }
    })
    stores.isDebug
      ? console.log("[Order Main]=", "{orderLockList}", orderLockList)
      : "";
    let res = await AirlineInfoServiceApi.checkEnough({
      airlineSeatId: airlineObj.airlineSeatId,
      wantTicketTot: orderObj[0].num,
      seatTypeId: seatBO.seatTypeId,
    });
    if (res.data) {
      //TODO: 利用axios进行位置锁定
      let insertRes = await AirlineInfoServiceApi.insertTicketOrderList(orderLockList, stores.getUser().uid)
      stores.isDebug ? console.log('[Order Main]', '{insert result}', insertRes) : ''
      if (insertRes.code == 0) {
        router.push({ path: "/orderConfirm", query: { airlineSeatId: airlineObj.airlineSeatId } })
      } else {
        ElMessageBox.alert('乘客中已有预定过该航班的，不可重复预定', '订票出错')
      }
    }
    else {
      ElMessageBox.alert("是否选择等票", "余票不足", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        callback: (action, instance) => {
          //TODO: 余票不足情况
          if (action == "confirm") {
            stores.isDebug
              ? console.log("[Order Main]=", "{confirm}", action)
              : "";
          } else {
          }
        },
      });
    }
  };
  return { orderObj, updateNum, airlineObj, seatBO, popCustomerList };
};
//depreacted
export const useTicket = () => {
  //TODO: 获取路由中的参数，同时渲染
  stores.isDebug
    ? console.log(
      "[Order Main]={route param}",
      useRouter().currentRoute.value.params
    )
    : "";
  return {};
};