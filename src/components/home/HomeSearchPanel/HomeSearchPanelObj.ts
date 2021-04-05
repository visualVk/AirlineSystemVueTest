/*
 * @Author: your name
 * @Date: 2021-01-28 13:56:12
 * @LastEditTime: 2021-04-04 15:46:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\home\HomeSearchPanel\HomeSearchPanelObj.ts
 */
import { City } from "@/utils/api/AirlineServiceApi";
export interface CustomInterface {
  childrenNum: number
  adultNum: number
  infant: number
  airlineType: number
}

export interface AlreadyOrderItemInterface {
  departure: string
  destination: string
  date: Date
};

export interface queryAirlineConditionInterface {
  hasChild: boolean,
  hasAdult: boolean,
  hasinfant: boolean,
  departure: string,
  destination: string,
  date: Date,
  airlineType: number
}