/*
 * @Author: your name
 * @Date: 2021-04-08 15:14:14
 * @LastEditTime: 2021-04-08 15:41:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\model\UserEntity.ts
 */
export interface ModifyUserQuery {
  email: string | undefined,
  gender: boolean | undefined,
  oldPassword: string | undefined,
  password: string | undefined,
  userNickname: string | undefined,
  username: string
}

export interface UserBO {
  uid: number,
  username: string,
  password: string,
  oldPassword: string,
  userNickname: string,
  gender: boolean,
  smartphone: string,
  email: string,
  isFreeze: number,
  roleName: string
}