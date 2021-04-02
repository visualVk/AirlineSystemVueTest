import service from "../axios";
import { City } from "./AirlineServiceApi";
import { CommonResult } from "./CommonServiceEntity";

/*
 * @Author: your name
 * @Date: 2021-04-02 15:35:24
 * @LastEditTime: 2021-04-02 17:19:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\utils\api\CityServiceApi.ts
 */
export class CityServiceApi {
  static async findCityByIds(idList: Array<String>) {
    let res = await service.get<CommonResult<City>>(`/api/city/findAllCityByIds?ids=${idList}`)
    // console.log('[city service api=]', res.data);
    return res.data;
  }
}
