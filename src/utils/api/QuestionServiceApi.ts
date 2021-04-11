import service from "../axios";
import { CommonResult } from "./CommonServiceEntity";
import { QuestionVO } from "./QuestionEntity";

/*
 * @Author: your name
 * @Date: 2021-04-11 13:57:24
 * @LastEditTime: 2021-04-11 14:21:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\api\QuestionServiceApi.ts
 */
export class QuestionServiceApi {
  static async findQuestion() {
    let res = await service.post<CommonResult<QuestionVO>>('/api/question/findQuestionByQuerySet', {});
    return res.data;
  }

  static async findQuestsionById(qId: string) {
    let res = await service.post<CommonResult<QuestionVO>>('/api/question/findQuestionByQuerySet', { qId: qId });
    return res.data;
  }

  // static async deleteQuestionByIds(qIds: Array<string>) {
  //   let res = await service.post<CommonResult<string>>(`/api/question/deleteQuestionByIds`, { ids: qIds });
  //   return res.data;
  // }

  // static async updateQuestion(question: QuestionVO) {
  //   let res = await service.post<CommonResult<QuestionVO>>('/api/question/updateQuestion', question);
  //   return res.data
  // }
}