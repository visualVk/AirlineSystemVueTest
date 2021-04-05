/*
 * @Author: your name
 * @Date: 2021-04-04 15:59:18
 * @LastEditTime: 2021-04-04 16:10:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\model\Airline.ts
 */
import { City } from "@/model/CItyEntity"
import { SeatBO } from "./SeatBOEntity";
import { SupEntityBO } from "./SupEntityBO";
export interface AirlineInfo {
  airlineDate: string,
  airlineId: string,
  airlineName: string,
  airlineSeatId: string,
  hours: number,
  endTime: string,
  startTime: string,
  companyId: string,
  companyName: string,
  companyImg: string,
  departureCity: City,
  destinationCity: City,
  seatBOList: Array<SeatBO>,
  supEntityBOList: Array<SupEntityBO>
}

export class AirlineInfoImpl implements AirlineInfo {
  airlineDate!: string;
  airlineId!: string;
  airlineName!: string;
  airlineSeatId!: string;
  hours!: number;
  endTime!: string;
  startTime!: string;
  companyId!: string;
  companyName!: string;
  companyImg!: string;
  departureCity!: City;
  destinationCity!: City;
  seatBOList!: SeatBO[];
  supEntityBOList!: SupEntityBO[];
}
