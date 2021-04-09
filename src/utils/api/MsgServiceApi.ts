import { MsgVo } from "@/model/MsgEntity";
import service from "../axios";
import { stores } from "../store/store";
import { CommonResult } from "./CommonServiceEntity";

/*
 * @Author: your name
 * @Date: 2021-04-09 20:50:32
 * @LastEditTime: 2021-04-09 20:52:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\api\MsgServiceApi.ts
 */
export class MsgServiceApi {
  static async findMsgByUsername(username: string) {
    let res = await service.post<CommonResult<MsgVo>>('/api/msg/findMsgByMsgQuerySet', { username: username })
    return res.data;
  }
}