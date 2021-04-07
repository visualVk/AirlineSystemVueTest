/*
 * @Author: your name
 * @Date: 2021-04-06 10:10:48
 * @LastEditTime: 2021-04-07 20:38:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\model\TicketEntity.ts
 */
export interface TicketLockSeat {
  airlineSeatId: string,
  createDate: string,
  payUid: number,
  preferSeatIndex: number,
  seatTypeId: string,
  ticketTypeId: string,
  username: string
}

export interface TicketLockUser {
  username: string,
  userNickname: string,
  email: string
}

export interface Ticket {
  ticketId: string,
  payUid: number,
  username: string,
  userNickName: string,
  gender: boolean,
  ticketTypeId: string
}

export interface AirlineTicketAllBO {
  airlineDate: string,
  airlineId: string,
  airlineSeatId: string,
  createDate: string,
  gender: boolean,
  millisecond: number,
  payUid: number,
  price: number,
  seatDetailInfoIndex: string,
  seatTypeId: string,
  seatTypeName: string,
  status: 0,
  ticketId: string,
  ticketTypeId: string,
  ticketTypeName: string,
  userNickname: string,
  username: string
}

export class AirlineTicketAllBOImpl implements AirlineTicketAllBO {
  airlineDate!: string;
  airlineId!: string;
  airlineSeatId!: string;
  createDate!: string;
  gender!: boolean;
  millisecond!: number;
  payUid!: number;
  price!: number;
  seatDetailInfoIndex!: string;
  seatTypeId!: string;
  seatTypeName!: string;
  status!: 0;
  ticketId!: string;
  ticketTypeId!: string;
  ticketTypeName!: string;
  userNickname!: string;
  username!: string;

}

export interface TicketQuery {
  payUid: number,
  airlineSeatId: string,
  status: number | undefined
}