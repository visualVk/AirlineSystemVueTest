export let stores = {
  isLogin: true,
  isDebug: true,
  jwt: '',
  setIsLogin(value: boolean) {
    this.isLogin = value
    if (this.isDebug) {
      console.log(`login status:${this.isLogin}`);
    }
  }
}