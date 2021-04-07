import { AirlineTicketAllBO, TicketLockSeat, TicketLockUser, TicketQuery } from "@/model/TicketEntity";
import service from "../axios";
import { CommonResult, CommonResultPrim } from "./CommonServiceEntity";

/*
 * @Author: your name
 * @Date: 2021-03-29 11:57:06
 * @LastEditTime: 2021-04-07 21:29:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: \vue-airline-01\src\utils\api\AirlineServiceApi.ts
 */
export interface AirlineInfoQuerySet {
  departureCityId: string | undefined,
  destinationCityId: string | undefined,
  supTicketIds: Array<number> | undefined,
  airlineDate: string | undefined
  airlineId: string | undefined
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
    let result = await service.post<CommonResult<AirlineInfoAllBO>>(`/api/airlineInfo/findAirlineInfoByQuerySet`, querySet)
    return result.data;
  }
  static async checkEnough(querySet: any) {
    let result = await service.post<CommonResultPrim<boolean>>('/api/ticket/checkEnough', querySet)
    return result.data
  }
  static async addTicketLockUser(ticketLockUser: Array<TicketLockUser>) {
    let result = await service.post<CommonResult<AirlineInfoAllBO>>('/api/user/auth/insertNormalUser', ticketLockUser)
    return result.data
  }
  static async insertTicketOrderList(ticketOrderList: Array<TicketLockSeat>, payUId: number) {
    let result = await service.post<CommonResult<AirlineTicketAllBO>>(`/api/ticket/insertTicketOrderList?payUid=${payUId}`, ticketOrderList)
    return result.data
  }
  static async findTicketByQuerySet(query: TicketQuery, page: number, size: number) {
    let result = await service.post<CommonResult<AirlineTicketAllBO>>(`/api/ticket/findTicketByQuerySet?page=${page}&size=${size}`, query)
    return result.data
  }
  static async cancelTicketOrder(ticketID: string) {
    let result = await service.delete<CommonResult<AirlineInfoAllBO>>('/api/ticket/cancelTicketOrder', { data: { ticketId: ticketID } })
    return result.data
  }
  static async payTicket(ticketId: string,) {
    let result = await service.post<CommonResult<AirlineInfoAllBO>>('/api/ticket/updateTicketOrder', { ticketId: ticketId })
    return result.data
  }
}

