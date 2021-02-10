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
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeElMain
  },
  {
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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
