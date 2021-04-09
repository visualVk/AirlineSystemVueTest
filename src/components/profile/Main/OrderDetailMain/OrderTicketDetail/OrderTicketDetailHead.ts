import { AirlineTicketAllBO } from "@/model/TicketEntity";
import { AirlineInfoServiceApi } from "@/utils/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { inject, computed } from "vue";

interface OrderDetail {
  airlineTicketId: string,
  userId: string,
  username: string,
  airlineId: string,
  ticketType: string,
  ticketStatus: number,
  airlineDate: Date
}

export class OrderDetailImpl implements OrderDetail {
  airlineTicketId!: string;
  userId!: string;
  username!: string;
  airlineId!: string;
  ticketType!: string;
  ticketStatus!: number;
  airlineDate!: Date;
}

export const useCommons = (props: any) => {
  // const ticket = reactive(new AirlineTicketAllBOImpl());
  // const route = useRouter().currentRoute;
  const ticket = inject("ticket") as AirlineTicketAllBO;
  const hintMsg = computed(() => {
    if (ticket.status == 0 || ticket.status == 3) {
      return "未支付";
    } else if (ticket.status == 1) {
      return "已支付";
    } else if (ticket.status == 2) {
      return "取消订单";
    } else if (ticket.status == 4) return "等票中";
  });
  const btnMsg = computed(() => {
    if (ticket.status == 1) {
      return "取消订单";
    } else if (ticket.status == 0 || ticket.status == 3) {
      return "支付订单";
    } else {
      return "";
    }
  });
  const cancelOrder = async () => {
    ElMessageBox.alert("确定取消订单？", "警告", {
      cancelButtonText: "取消",
      showCancelButton: true,
      confirmButtonText: "确定",
      callback: async (action, instance) => {
        if (action == "confirm") {
          let cancelRes = await AirlineInfoServiceApi.cancelTicketOrder(
            ticket.ticketId
          );
          if (cancelRes.code == 0) {
            ElMessage.success("取消成功");
            let res = await AirlineInfoServiceApi.findTIcketById(
              ticket.ticketId
            );
            if (res.code == 0) {
              ticket.status = res.data[0].status;
            }
          } else {
            ElMessage.error(cancelRes.message);
          }
        }
      },
    });
  };
  const payOrder = async () => {
    ElMessageBox.alert("确定支付订单？", "警告", {
      cancelButtonText: "取消",
      showCancelButton: true,
      confirmButtonText: "确定",
      callback: async (action, instance) => {
        if (action == "confirm") {
          let cancelRes = await AirlineInfoServiceApi.payTicket(
            ticket.ticketId
          );
          if (cancelRes.code == 0) {
            ElMessage.success("支付成功");
            let res = await AirlineInfoServiceApi.findTIcketById(
              ticket.ticketId
            );
            if (res.code == 0) {
              ticket.status = res.data[0].status;
            }
          } else {
            ElMessage.error(cancelRes.message);
          }
        }
      },
    });
  };
  const btnClick = () => {
    if (btnMsg.value == "取消订单") {
      cancelOrder();
    } else {
      payOrder();
    }
  };
  // onMounted(() => {
  //   findTicketById();
  // });
  return { btnMsg, hintMsg, ticket, cancelOrder, btnClick, payOrder };
};