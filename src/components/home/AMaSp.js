/*
 * @Author: your name
 * @Date: 2021-02-15 11:14:25
 * @LastEditTime: 2021-04-07 10:26:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\components\home\AMaSp.ts
 */

import { stores } from "@/utils/store/store";
import { reactive } from "vue";

/**
 * @description: init AMap and set default value, such as zoom,center
 * @param {*}
 * @return {*}
 */
const points = {
  startPoint: [],
  endPoint: []
}
let map;
export const needValueOfMap = () => {
  const twoPoint = reactive({
    startPoint: [],
    endPoint: []
  })
  return { twoPoint };
}

export const initMap = () => {
  map = new AMap.Map("container", {
    resizeEnable: true,
    center: [116.397428, 39.90923], //地图中心点
    zoom: 13, //地图显示的缩放级别
    keyboardEnable: false,
  });
  return map
}
/**
 * @description: add plugins into Amap, such as driving, autocomplete, 
 * placesearch(not used), which were used to mark location of users' need
 * and show a plan for users to know how to get there
 * @param {any} map
 * @return {*}
 */
export const addPlugin = () => {
  AMap.plugin(
    ["AMap.Driving", "AMap.Autocomplete", "AMap.PlaceSearch"],
    function () {
      // 出发地的点
      let departAutoOptions = {
        // input 为绑定输入提示功能的input的DOM ID
        input: "depart_input",
      };
      let departAutoComplete = new AMap.Autocomplete(departAutoOptions);
      AMap.event.addListener(departAutoComplete, "select", function (e) {
        //TODO 针对选中的poi实现自己的功能
        // console.log(e.poi.location.lng, e.poi.location.lat);
        points.startPoint = [e.poi.location.lng, e.poi.location.lat]
        // map.panTo([e.poi.location.lng, e.poi.location.lat]);
        // let viaMarker = new AMap.Marker({
        //   position: new AMap.LngLat(e.poi.location.lng, e.poi.location.lat),
        //   // 将一张图片的地址设置为 icon
        //   icon:
        //     "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
        //   // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
        //   offset: new AMap.Pixel(-13, -30),
        // });
        // map.add(viaMarker);
      });
      // 终点的点
      let destinationAutoOptions = {
        // input 为绑定输入提示功能的input的DOM ID
        input: "destination_input",
      };
      let destinationAutoComplete = new AMap.Autocomplete(
        destinationAutoOptions
      );
      AMap.event.addListener(
        destinationAutoComplete,
        "select",
        function (e) {
          //TODO 针对选中的poi实现自己的功能

          points.endPoint = [e.poi.location.lng, e.poi.location.lat]
          // let viaMarker = new AMap.Marker({
          //   position: new AMap.LngLat(
          //     e.poi.location.lng,
          //     e.poi.location.lat
          //   ),
          //   // 将一张图片的地址设置为 icon
          //   icon:
          //     "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
          //   // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
          //   offset: new AMap.Pixel(-13, -30),
          // });
          // map.add(viaMarker);
          // console.log(map);
        }
      );
    }
  );
}

export const findWay = () => {
  //TODO: 可能要更换地图库
  AMap.plugin('AMap.Driving', function () {
    let pp = document.getElementById("panel")
    pp.innerHTML = ""
    let driving = new AMap.Driving({
      // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
      policy: AMap.DrivingPolicy.LEAST_TIME,
      map: map,
      panel: 'panel'
    });
    driving.search(points.startPoint, points.endPoint, function (status, result) {
      // 未出错时，result即是对应的路线规划方案
      //TODO: 后续需要在这添加规划路径线
      stores.isDebug ? console.log('way:', result) : ''
    });
  })
}

export const decMap = () => {
  if (!!map) {
    map.destory();
  }
}

/**
 * @description: create map, which part will include two sub part, init and addplugin.
 * @param {*}
 * @return {*}
 */
export const createMap = () => {
  const map = initMap()
  addPlugin();
}
