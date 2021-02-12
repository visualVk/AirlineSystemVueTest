export let stores = {
  isLogin: false,
  isDebug: true,
  jwt: '',
  setIsLogin(value: boolean) {
    this.isLogin = value
    if (this.isDebug) {
      console.log(`login status:${this.isLogin}`);
    }
  }
}