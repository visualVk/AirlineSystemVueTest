import service from "../axios";
import { CommonResult } from "./CommonServiceEntity";

/*
 * @Author: your name
 * @Date: 2021-03-29 11:57:06
 * @LastEditTime: 2021-04-02 13:48:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: \vue-airline-01\src\utils\api\AirlineServiceApi.ts
 */
export interface AirlineInfoQuerySet {
  departureCityId: string,
  destinationCityId: string,
  supTicketIds: Array<number>,
  airlineDate: string
  airlineId: string
}

export interface City {
  cityFirstAlp: string,
  cityId: string,
  cityName: string
}

export interface SeatBO {
  price: number,
  remain: number,
  seatTypeId: string,
  seatTypeName: string,
  tot: number
}

export interface SupEntityBO {
  ticketTypeId: string,
  ticketTypeName: string
}

export interface AirlineInfoAllBO {
  airlineDate: string,
  airlineId: string,
  airlineName: string,
  airlineSeatId: string,
  companyId: string,
  companyName: string,
  companyImg: string,
  departureCity: City,
  destinationCity: City,
  seatBOList: Array<SeatBO>,
  supEntityBOList: Array<SupEntityBO>,
  hours: number,
  startTime: string,
  endTime: string
}

export class AirlineInfoServiceApi {
  static async findAirlineInfoByQuerySet(querySet: AirlineInfoQuerySet) {
    let result = await service.post<CommonResult<AirlineInfoAllBO>>('/api/airlineInfo/findAirlineInfoByQuerySet', querySet)
    return result.data;
  }
}

