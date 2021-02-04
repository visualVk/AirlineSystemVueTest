export interface OrderBriefInfo extends Object {
  price: string,
  num: string,
  changeFee: string
}
export class OrderBriefInfoImpl implements OrderBriefInfo {
  price!: string;
  num!: string;
  changeFee!: string;
}