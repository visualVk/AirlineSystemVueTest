/*
 * @Author: your name
 * @Date: 2021-03-18 18:04:16
 * @LastEditTime: 2021-04-08 15:41:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\api\UserServiceApi.ts
 */
import { ModifyUserQuery, UserBO } from '@/model/UserEntity';
import service from '@/utils/axios'
import { stores } from '../store/store'
import { CommonResultPrim } from './CommonServiceEntity';
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
    tokenType: string,
    uid: number,
    username: string,
    userNickname: string
  },
  message: String
}

class UserService {
  static async login(user: User) {
    let res = await service.post<CommonResult>('/api/user/auth/login', user, {
      responseType: 'json'
    })
    // localStorage.setItem('token', res.data.data.token);
    return res.data
  }
  static async logout() {
    let res = await service.post('/api/user/auth/logout', {
      responseType: 'json'
    });
    // localStorage.removeItem('token')
    // stores.setIsLogin(false)
    return res.data
  }
  static async modifyUser(modifyUser: ModifyUserQuery) {
    let res = await service.post<CommonResultPrim<UserBO>>('/api/user/auth/modifyUserInfo', modifyUser);
    return res.data
  }
}

export { UserService, User }