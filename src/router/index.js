import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

import Layout from '@/layout'
const layout = () => import('@/layout')

// 默认不需要权限的页面
export const constantRouterMap = [
  {
    path: '/',
    component: layout,
    meta: {
      icon: 'el-icon-s-home',
      isAuth: true,
      roles: [1, 2, 3],
      title: "首页"
    },
    title: '首页',
    children: [
      {
        path: '',
        component: () => import('@/views/index'),
        name: '首页',
        meta: {
          icon: 'el-icon-s-home',
          isAuth: true,
          roles: [1, 2, 3]
        }
      }
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {title: '登录', roles: [1, 2, 3]}
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    meta: {title: '注冊', roles: [1, 2, 3]}
  },
  {
    path: '/reset',
    component: () => import('@/views/reset'),
    meta: {title: '忘记密码', roles: [1, 2, 3]}
  },
  // {
  //   path: '/manage',
  //   component: Layout,
  //   meta: {title: '用户管理', isAuth: true},
  //   children: [
  //     {
  //       path: 'volunteer',
  //       component: () => import('@/views/manage/volunteer'),
  //       name: 'volunteerManage',
  //       meta: {title: '志愿者信息', isAuth: true}
  //     },
  //     {
  //       path: 'user',
  //       component: () => import('@/views/manage/user'),
  //       name: 'userManage',
  //       meta: {title: '用户信息', isAuth: true}
  //     },
  //     {
  //       path: 'missInformation',
  //       component: () => import('@/views/manage/missInformation'),
  //       name: 'missInformation',
  //       meta: {title: '寻人信息', isAuth: true}
  //     },
  //     {
  //       path: 'missInfoShow',
  //       component: () => import('@/views/manage/missInfoShow'),
  //       name: 'missInfoShow',
  //       meta: {title: '寻人启示', isAuth: true}
  //     },
  //     {
  //       path: 'missClaim',
  //       component: () => import('@/views/manage/missClaim'),
  //       name: 'missClaim',
  //       meta: {title: '寻人寻亲认领', isAuth: true}
  //     }
  //   ]
  // },
  // {
  //   path: '/data',
  //   component: Layout,
  //   meta: {title: '数据展示', isAuth: true},
  //   children: [
  //     {
  //       path: 'overview',
  //       component: () => import('@/views/data/overview'),
  //       name: 'overview',
  //       meta: {title: '数据总览'}
  //     }
  //   ]
  // },
  // {
  //   path: '/test',
  //   component: () => import('@/views/test'),
  //   meta: {
  //     title: '志愿者信息管理',
  //     icon: 'dashboard',
  //     roles: [3]
  //   }
  // }
]

// 注册路由
const router = new Router({
  mode: 'history', //去除url中的#
  routes: constantRouterMap
})

// 异步路由（需要权限的页面）
export const dynamicRouter = [
  // {
  //   path: '/test',
  //   component: Layout,
  //   meta: {title: 'test', roles: ['1', '2', '3'], isAuth: true},
  //   children: [
  //     {
  //       path: 'overview',
  //       component: () => import('@/views/test'),
  //       name: 'overview',
  //       meta: {
  //         title: '志愿者信息管理',
  //         icon: 'dashboard',
  //         roles: ['1', '2'],
  //         isAuth: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/userManage',
    component: Layout,
    meta: {title: '用户管理', isAuth: true, icon: 'el-icon-s-custom', roles: ['2', '3']},
    children: [
      {
        path: 'volunteer',
        component: () => import('@/views/manage/volunteer'),
        name: 'volunteerManage',
        meta: {title: '志愿者信息', isAuth: true, roles: ['3']}
      },
      {
        path: 'user',
        component: () => import('@/views/manage/user'),
        name: 'userManage',
        meta: {title: '用户信息', isAuth: true, roles: ['3']}
      },

    ]
  },
  {
    path: '/missManage',
    component: Layout,
    meta: {title: '失踪者管理', isAuth: true, icon: 'el-icon-tickets', roles: ['2', '3']},
    children: [
      {
        path: 'missInformation',
        component: () => import('@/views/manage/missInformation'),
        name: 'missInformation',
        meta: {title: '寻人信息', isAuth: true, roles: ['1','2', '3']}
      },
      {
        path: 'missInfoShow',
        component: () => import('@/views/manage/missInfoShow'),
        name: 'missInfoShow',
        meta: {title: '寻人启示', isAuth: true, roles: ['1','2', '3']}
      },
      {
        path: 'missClaim',
        component: () => import('@/views/manage/missClaim'),
        name: 'missClaim',
        meta: {title: '寻人寻亲认领', isAuth: true, roles: ['2', '3']}
      }
    ]
  },
  // {
  //   path: '/data',
  //   component: Layout,
  //   meta: {title: '数据展示', isAuth: true, roles: ['2', '3']},
  //   children: [
  //     {
  //       path: 'overview',
  //       component: () => import('@/views/data/overview'),
  //       name: 'overview',
  //       meta: {title: '数据总览', roles: ['2', '3']}
  //     }
  //   ]
  // },
]


export default router
