/*
 * @Author: your name
 * @Date: 2021-03-29 13:04:57
 * @LastEditTime: 2021-03-29 13:05:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\api\CommonServiceEntity.ts
 */
export interface CommonResult<T> {
  code: Number,
  message: string,
  data: Array<T>
}
