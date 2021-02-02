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