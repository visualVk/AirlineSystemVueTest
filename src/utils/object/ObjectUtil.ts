/*
 * @Author: your name
 * @Date: 2021-04-09 11:55:25
 * @LastEditTime: 2021-04-09 11:58:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\object\ObjectUtil.ts
 */
export const sourceCopy2Target = (source: Object, target: Object): Object => {
  const keys = Object.keys(source);
  for (const key of keys) {
    if (source[key] != undefined) {
      target[key] = source[key];
    }
  }
  return target;
}