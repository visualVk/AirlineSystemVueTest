import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import HomeElMain from '@/views/home/HomeElMain.vue'
import SearchElMain from '@/views/searchList/SearchElMain.vue'
import ProfileElMain from '@/views/profile/ProfileElMain.vue'
import ProfileDisplayMain from "@/components/profile/Main/ProfileDisplayMain/ProfileDisplayMain.vue";

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
  // {
  //   path: '/home',
  //   name: 'HomeElMain',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/components/home/HomeElMain.vue')
  // }
  , {
    path: '/profile',
    name: 'Profile',
    component: ProfileElMain,
    children: [
      {
        path: '/me',
        name: 'ProfileMe',
        component: ProfileDisplayMain
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
