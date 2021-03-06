import router from "@/router"
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { getCurrentInstance } from "vue"
import { stores } from "@/utils/store/store"
// import message from "element-plus/lib/el-message/src/message"

/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2text = (response: AxiosResponse): string => {
  /** http status code */
  const code = response.status
  /** notice text */
  let message = 'Request Error'
  switch (code) {
    case 400:
      message = 'Request Error'
      break
    case 401:
      message = 'Unauthorized, please login'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '访问资源不存在'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '位置错误'
      break
    case 501:
      message = '承载服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务暂不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = '暂不支持的 HTTP 版本'
      break
    default:
      message = '位置错误'
  }
  return message
}

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
const service = Axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: 'http://localhost:32001',
  timeout: 10000,
  headers: {
    'User-Type': 'bus'
  }
})

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
// const service = Axios.create({
//   baseURL: process.env.VUE_APP_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'User-Type': 'bus'
//   }
// })

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // 如果是获取token接口：
  if (config.url === '/api/user/auth/login') {
  } else {
    // 如果保存有token，则取，否则不添加Authorization
    if (stores.token != null && stores.token != '') {
      let token = stores.token
      // let tokenType = stores.tokenType
      console.log(stores.token)
      config.headers['Authorization'] = `${token}`
    }
  }
  // console.log(config);

  return config
})


/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
service.interceptors.response.use(
  /** 请求有响应 */
  async (response: AxiosResponse) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      const __text = getErrorCode2text(response)
      return Promise.reject(new Error(__text))
    }
  },
  /** 请求无响应 */
  (error: AxiosError) => {
    let __emsg: string = error.message || ''

    if (error.message) {
      __emsg = error.message
    }

    if (error.response) {
      __emsg = error.response.data.message
        ? error.response.data.message
        : error.response.data.data
    }
    // timeout
    if (__emsg.indexOf('timeout') >= 0) {
      __emsg = 'timeout'
    }

    if (error?.response?.status === 401) {
      let app = getCurrentInstance()?.appContext.config.globalProperties
      if (router.currentRoute.value.path !== '/entry/login') {
        app?.$message({
          type: 'info',
          message: '登录凭证已过期，请重新登录'
        })
        router.push('/entry/login')
      }
      return Promise.reject(new Error('401'))
    }
    return Promise.reject(new Error(__emsg))
  }
)

export default service