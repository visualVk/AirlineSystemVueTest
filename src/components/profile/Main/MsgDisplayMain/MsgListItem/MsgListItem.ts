interface MsgListItemInterface {
  title: string,
  date: Date,
  operator: string
  msgDetail: string
}

export class MsgListItem implements MsgListItemInterface {
  msgDetail!: string;
  title!: string;
  date!: Date;
  operator!: string;
}