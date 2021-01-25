export class AlreadyOrderItem {
  public departure: String
  public destination: String
  public date: Date
  constructor(startPoint: String, endPoint: String, d: Date) {
    this.departure = startPoint
    this.destination = endPoint
    this.date = d
  }
};

export class CustomSet {
  public childrenNum: number
  public adultNum: number
  public infant: number
  public airlineType: number
  constructor(c: number, a: number, i: number, type: number) {
    this.childrenNum = c
    this.adultNum = a
    this.infant = i
    this.airlineType = type
  }
}
