// import Axios from "axios";
import service from "../axios";

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

interface HttpResponse<T> {
  statusCode: number
  statusMsg: string
  data: Array<T>
}

interface CityModel {
  cityId: string,
  cityName: string
}

interface CityListModel {
  code: string,
  cityList: Array<CityModel>
}
interface UserInfo {
  username: string
  cardId: string
}

class HomeServiceApi {
  static async fingAllCity(params?: UserInfo) {
    let res = await service.get<HttpResponse<CityListModel>>('/api/findAllCity', {
      responseType: 'json'
    })
    return res.data
  }

  static async findAllVisitedCity(params?: UserInfo) {
    let res = await service.get<HttpResponse<CityModel>>('/api/findAllVisitedCity', {
      responseType: 'json'
    })
    return res.data
  }
}

export { HomeServiceApi }