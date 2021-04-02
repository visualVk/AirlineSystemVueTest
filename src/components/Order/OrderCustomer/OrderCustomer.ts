/*
 * @Author: your name
 * @Date: 2021-02-03 15:53:15
 * @LastEditTime: 2021-03-15 12:37:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\Order\OrderCustomer\OrderCustomer.ts
 */
export interface Customer {
  [key: string]: any
  idCard: string,
  name: string,
  tel: string
}

export let validator = {
  /**
   * 检测手机号码
   * @param rule 
   * @param value 
   * @param callback 
   */
  checkPhone(rule: any, value: any, callback: any) {
    let isTel: boolean = false;
    const telReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    isTel = telReg.test(value);
    if (!isTel) {
      isTel = false;
      callback(new Error("请检查要输入的手机号码是否合法"));
    } else {
      isTel = true;
    }
    callback();
  }
}
