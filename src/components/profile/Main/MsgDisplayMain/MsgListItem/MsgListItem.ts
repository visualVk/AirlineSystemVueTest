interface MsgListItemInterface {
  title: string,
  date: Date,
  operator: string
}

export class MsgListItem implements MsgListItemInterface {
  title!: string;
  date!: Date;
  operator!: string;
}