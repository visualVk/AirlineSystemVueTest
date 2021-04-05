/*
 * @Author: your name
 * @Date: 2021-01-31 11:40:39
 * @LastEditTime: 2021-04-04 17:24:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\store\store.ts
 */
export let stores = {
  isLogin: false,
  isDebug: true,
  tokenType: '',
  token: '',
  setIsLogin(value: boolean) {
    this.isLogin = value
    if (this.isDebug) {
      console.log(`login status:${this.isLogin}`);
    }
  },
  getIsLogin() {
    // const tokenInStorage = localStorage.getItem('token')
    // this.isDebug ? console.log('[token]=', this.token) : ''
    // if (tokenInStorage != null && tokenInStorage != '') {
    //   this.isLogin = true;
    //   this.token = 'Bearer ' + tokenInStorage;
    // }
    return this.isLogin
  }
}