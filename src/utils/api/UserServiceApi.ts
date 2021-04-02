/*
 * @Author: your name
 * @Date: 2021-03-18 18:04:16
 * @LastEditTime: 2021-03-18 20:40:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\api\UserServiceApi.ts
 */
import service from '@/utils/axios'
import { stores } from '../store/store'
interface User {
  isAdmin: Boolean,
  password: String,
  rememberMe: Boolean,
  username: String
}

interface CommonResult {
  code: Number,
  data: {
    token: string,
    tokenType: string
  },
  message: String
}

class UserService {
  static async login(user: User) {
    let res = await service.post<CommonResult>('/api/user/auth/login', user, {
      responseType: 'json'
    })
    return res.data
  }
  static async logout() {
    let res = await service.post('/api/user/auth/logout', {
      responseType: 'json'
    });
    return res.data
  }
}

export { UserService, User }