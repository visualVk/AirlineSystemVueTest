import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import HomeElMain from '@/views/home/HomeElMain.vue'
import SearchElMain from '@/views/searchList/SearchElMain.vue'
import ProfileElMain from '@/views/profile/ProfileElMain.vue'
import ProfileDisplayMain from "@/components/profile/Main/ProfileDisplayMain/ProfileDisplayMain.vue";
import OrderDisplayMain from '@/components/profile/Main/OrderDisplayMain/OrderDisplayMain.vue'
import MsgDisplayMain from '@/components/profile/Main/MsgDisplayMain/MsgDisplayMain.vue'
import OrderDetailMain from '@/components/profile/Main/OrderDetailMain/OrderDetailMain.vue'

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
  }
  ,
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
        path: '/order',
        name: 'ProfileOrder',
        component: OrderDisplayMain
      },
      {
        path: '/msg',
        name: 'ProfileMsg',
        component: MsgDisplayMain
      }
    ]
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: OrderDetailMain
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
