import { CouponVO } from "@/model/CouponEntity";
import service from "../axios";
import { CommonResult } from "./CommonServiceEntity";

/*
 * @Author: your name
 * @Date: 2021-04-10 12:30:04
 * @LastEditTime: 2021-04-10 12:33:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\api\CouponServiceApi.ts
 */
export class CouponServiceApi {
  static async findCouponByUsername(username: string) {
    let res = await service.post<CommonResult<CouponVO>>(`/api/coupon/findCouponsByUsername?username=${username}`)
    return res.data
  }
}