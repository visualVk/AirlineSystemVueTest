export interface CustomInterface {
  childrenNum: number
  adultNum: number
  infant: number
  airlineType: number
}

export interface AlreadyOrderItemInterface {
  departure: String
  destination: String
  date: Date
};

export interface queryAirlineConditionInterface {
  hasChild: boolean,
  hasAdult: boolean,
  hasinfant: boolean,
  departure: String,
  destination: String,
  date: Date,
  airlineType: number
}