/*
 * @Author: your name
 * @Date: 2021-01-27 13:17:19
 * @LastEditTime: 2021-03-29 13:07:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\api\HomeServiceApi.ts
 */
// import Axios from "axios";
import service from "@/utils/axios";
import { CommonResult } from "@/utils/api/CommonServiceEntity";

export interface OptionInterface {
  label: string;
  value: string;
  disable?: boolean
  children: {
    label: string;
    value: string;
    disable?: boolean
  }[];
}

// interface HttpResponse<T> {
//   statusCode: number
//   statusMsg: string
//   data: Array<T>
// }

interface CityModel {
  cityId: string,
  cityName: string
}

interface CityListModel {
  cityFirstAlp: string,
  cityList: Array<CityModel>
}
interface UserInfo {
  username: string
  cardId: string
}

class HomeServiceApi {
  static async fingAllCity(params?: UserInfo) {
    let res = await service.get<CommonResult<CityListModel>>('/api/city/findAllCity', {
      responseType: 'json'
    })
    return res.data
  }
}

export { HomeServiceApi }