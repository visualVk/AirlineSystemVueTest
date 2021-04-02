/*
 * @Author: your name
 * @Date: 2021-01-23 15:31:01
 * @LastEditTime: 2021-04-02 14:03:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\HomeClass.ts
 */
import { City } from "@/utils/api/AirlineServiceApi"
import { computed, ComputedRef } from "vue"

export class AlreadyOrderItem {
  public departure: City
  public destination: City
  public date: Date
  constructor(startPoint: City, endPoint: City, d: Date) {
    this.departure = startPoint
    this.destination = endPoint
    this.date = d
  }
};

export class CustomSet {
  public childrenNum: number
  public adultNum: number
  public infant: number
  public airlineType: number
  constructor(c: number, a: number, i: number, type: number) {
    this.childrenNum = c
    this.adultNum = a
    this.infant = i
    this.airlineType = type
  }
}

export interface CascaderObjChild {
  value: String
  label: String
  // constructor(v:String,l:String){
  //   this.value = v
  //   this.label = l
  // }
}

export interface CascaderChildrenInterface {
  value: String
  label: String
}

export interface CascaderInterface {
  cityList: Array<CascaderChildrenInterface>,
  visitedCityList: Array<CascaderChildrenInterface>,
  options: ComputedRef<Array<CascaderChildrenInterface>>
}

export interface ResponseModel<T> {
  statusCode: number,
  data: Array<T>,
  meta?: string
}

export interface CityModel {
  cityId: string,
  cityName: string
}

export interface CityListModel {
  code: string,
  cityList: Array<CityModel>
}