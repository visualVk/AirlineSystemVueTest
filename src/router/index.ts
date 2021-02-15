import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import HomeElMain from '@/views/home/HomeElMain.vue'
import SearchElMain from '@/views/searchList/SearchElMain.vue'
import ProfileElMain from '@/views/profile/ProfileElMain.vue'
import ProfileDisplayMain from "@/components/profile/Main/ProfileDisplayMain/ProfileDisplayMain.vue";
import OrderDisplayMain from '@/components/profile/Main/OrderDisplayMain/OrderDisplayMain.vue'
import MsgDisplayMain from '@/components/profile/Main/MsgDisplayMain/MsgDisplayMain.vue'
import OrderDetailMain from '@/components/profile/Main/OrderDetailMain/OrderDetailMain.vue'
import CouponDisplayMain from '@/components/profile/Main/CouponDisplayMain/CouponDisplaMain.vue'
import QuestionDisplayMain from '@/components/profile/Main/QuestionDisplayMain/QuestionDisplayMain.vue'
import QuestionDetail from '@/components/profile/Main/QuestionDisplayMain/QuestionDetail/QuestionDetail.vue'
import OrderMain from '@/components/Order/OrderMain.vue'
import OrderConfirm from "@/components/Order/OrderConfirm/OrderConfirm.vue"
import ServiceClientElMain from "@/views/serviceClient/ServiceClientElMain.vue"
import Main from '@/views/main/Main.vue'
import LoginElMain from "@/views/login/LoginElMain.vue"
import element from '@/plugins/element'
import { nextTick } from 'vue'
import { stores } from '@/utils/store/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    redirect: '/home',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomeElMain
      }, {
        path: '/queryAirline',
        name: 'QueryAirline',
        component: SearchElMain
      },
      {
        path: '/order',
        name: 'order',
        component: OrderMain
      },
      {
        path: '/profile',
        name: 'Profile',
        component: ProfileElMain,
        children: [
          {
            path: '/me',
            name: 'ProfileMe',
            component: ProfileDisplayMain
          },
          {
            path: '/profileOrder',
            name: 'ProfileOrder',
            component: OrderDisplayMain
          },
          {
            path: '/msg',
            name: 'ProfileMsg',
            component: MsgDisplayMain
          },
          {
            path: '/coupon',
            name: 'ProfileCoupon',
            component: CouponDisplayMain
          },
          {
            path: '/question',
            name: 'ProfileQuestion',
            component: QuestionDisplayMain
          },
          {
            path: '/questionDetail',
            name: 'ProfileQuestionDetail',
            component: QuestionDetail
          }
        ]
      },
      {
        path: '/orderDetail',
        name: 'OrderDetail',
        component: OrderDetailMain
      },
      {
        path: '/orderConfirm',
        name: 'OrderConfirm',
        component: OrderConfirm
      },
      {
        path: '/serviceClient',
        name: 'ServiceClient',
        component: ServiceClientElMain
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginElMain
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
/**
 * @description: 路由守护，验证是否需要登录
 * @param {*} to
 * @param {*} from
 * @param {*} next
 * @return {*}
 */
router.beforeEach((to, from, next) => {
  if (!isInBlank(to.name)) {
    if (stores.isLogin) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

// const nameList = ['QueryAirline', 'order', 'Profile', 'ProfileMe', 'ProfileOrder', 'ProfileMsg', 'ProfileCoupon', 'ProfileQuestion', 'ProfileQuestionDetail', 'OrderConfirm', 'OrderDetail']
const blankList = ['Login', 'Main', 'Home', 'ServiceClient']
function isInBlank(name: string | symbol | null | undefined) {
  return blankList.find(e => e == name);
}
export default router
