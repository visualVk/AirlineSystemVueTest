export interface Customer {
  [key: string]: any
  idCard: string,
  name: string,
  tel: string
}

export let validator = {
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
