/*
 * @Author: your name
 * @Date: 2021-04-09 20:49:33
 * @LastEditTime: 2021-04-09 21:08:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\model\MsgEntity.ts
 */
export interface MsgVo {
  msgId: string,
  msgName: string,
  norUsername: string,
  msgContent: string,
  date: string,
}

export class MsgVoImpl implements MsgVo {
  msgId!: string;
  msgName!: string;
  norUsername!: string;
  msgContent!: string;
  date!: string;

}