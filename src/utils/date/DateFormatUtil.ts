/*
 * @Author: your name
 * @Date: 2021-03-29 22:14:58
 * @LastEditTime: 2021-03-31 14:30:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\date\DateFormatUtil.ts
 */
export const dateFormat = (fmt: string, date: Date) => {
  let ret;
  let opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? ((opt as any)[k]) : ((opt as any)[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt;
}