/*
 * @Author: your name
 * @Date: 2021-04-11 13:56:02
 * @LastEditTime: 2021-04-11 14:30:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\api\QuestionEntity.ts
 */
export interface QuestionVO {
  qid: string,
  qtitle: string,
  qcontent: string,
  date: string
}

export class QuestionVoImpl implements QuestionVO {
  qid!: string;
  qtitle!: string;
  qcontent!: string;
  date!: string;

}