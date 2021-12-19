import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export default new Router({
  mode: 'history', //去除url中的#
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/index'),
          name: '首页',
          meta: {icon: 'dashboard'}
        }
      ],
    },
    {
      path: '/manage',
      component: Layout,
      meta: {title: '用户管理'},
      children: [
        {
          path: 'volunteer',
          component: () => import('@/views/manage/volunteer'),
          name: 'volunteerManage',
          meta: {title: '志愿者信息'}
        },
        {
          path: 'user',
          component: () => import('@/views/manage/user'),
          name: 'userManage',
          meta: {title: '用户信息'}
        },
        {
          path: 'missInformation',
          component: () => import('@/views/manage/missInformation'),
          name: 'missInformation',
          meta: {title: '寻人信息'}
        },
        {
          path: 'missInfoShow',
          component: () => import('@/views/manage/missInfoShow'),
          name: 'missInfoShow',
          meta: {title: '寻人启示'}
        },
        {
          path: 'missClaim',
          component: () => import('@/views/manage/missClaim'),
          name: 'missClaim',
          meta: {title: '寻人寻亲认领'}
        }
      ]
    },
    {
      path: '/data',
      component: Layout,
      meta: {title: '数据展示'},
      children: [
        {
          path: 'overview',
          component: () => import('@/views/data/overview'),
          name: 'overview',
          meta: {title: '数据总览'}
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login'),
      meta: {title: '登录'}
    },
    {
      path: '/register',
      component: () => import('@/views/register'),
      meta: {title: '注冊'}
    },
    {
      path: '/test',
      component: () => import('@/views/test'),
      meta: {title: '志愿者信息管理', icon: 'dashboard'}
    }
  ]

})

