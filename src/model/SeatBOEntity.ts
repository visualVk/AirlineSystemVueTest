/*
 * @Author: your name
 * @Date: 2021-04-04 16:03:10
 * @LastEditTime: 2021-04-04 17:27:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\model\SeatBOEntity.ts
 */
export interface SeatBO {
  price: number,
  remain: number,
  seatTypeId: string,
  seatTypeName: string,
  tot: number,
}

export class SeatBOImpl implements SeatBO {
  price!: number;
  remain!: number;
  seatTypeId!: string;
  seatTypeName!: string;
  tot!: number;

}