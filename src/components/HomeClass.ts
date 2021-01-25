export class AlreadyOrderItem {
  public departure: String
  public destination: String
  constructor(startPoint: String, endPoint: String) {
    this.departure = startPoint;
    this.destination = endPoint;
  }
};
