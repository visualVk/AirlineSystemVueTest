/*
 * @Author: your name
 * @Date: 2021-04-10 12:25:36
 * @LastEditTime: 2021-04-10 12:36:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\model\CouponEntity.ts
 */
export interface CouponVO {
  couponDetail: string,
  couponId: string,
  couponName: string,
  deadline: string,
  isValid: boolean
}

export class CouponVOImpl implements CouponVO {
  couponDetail!: string;
  couponId!: string;
  couponName!: string;
  deadline!: string;
  isValid!: boolean;

}
