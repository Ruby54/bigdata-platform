import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/userportrait',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { title: '用户画像管理', icon: 'table' },
  //   alwaysShow: true,
  //   children: [
  //
  //     {
  //       path: 'userProfile/tag',
  //       name: '标签管理',
  //       component: () => import('@/views/userProfile/tag/tagList'),
  //       meta: { title: '标签管理' }
  //     },
  //     {
  //       path: 'userProfile/flowTaskList',
  //       name: '流程任务管理',
  //       component: () => import('@/views/userProfile/tag/flowTaskList'),
  //       meta: { title: '流程任务管理' }
  //
  //     },
  //     {
  //       path: 'userProfile/taskProcessList',
  //       name: '任务监控',
  //       component: () => import('@/views/userProfile/tag/taskProcessList'),
  //       meta: { title: '任务进程' }
  //     },
  //     {
  //       path: 'userProfile/userGroup',
  //       name: '用户分群',
  //       component: () => import('@/views/userProfile/tag/userGroupList'),
  //       meta: { title: '用户分群' }
  //
  //     }
  //   ]
  // },
  {
    path: '/statistics',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: '统计管理', icon: 'table' },
    alwaysShow: true,
    children: [
      // {
      //   path: 'echarts/rt',
      //   name: '实时统计',
      //   component: () => import('@/views/statistics/echarts/rt'),
      //   meta: { title: '实时统计' }
      // },
      // {
      //   path: 'echarts/orderAnalysis',
      //   name: '交易分析',
      //   component: () => import('@/views/statistics/echarts/orderAnalysis'),
      //   meta: { title: '交易分析' }
      // } ,
      // {
      //   path: 'echarts/index',
      //   name: 'echarts统计',
      //   component: () => import('@/views/statistics/echarts/index'),
      //   meta: { title: 'echarts统计' }
      // },
      {
        path: 'echarts/visit',
        name: '流量统计',
        component: () => import('@/views/statistics/echarts/visit/visit'),
        meta: { title: '访问流量统计' }
      },
      {
        path: 'echarts/user',
        name: '会员统计',
        component: () => import('@/views/statistics/echarts/user/user'),
        meta: { title: '会员统计' }
      },
      {
        path: 'echarts/goods',
        name: '商品分析',
        component: () => import('@/views/statistics/echarts/goods/goods'),
        meta: { title: '商品分析' }
      },
      {
        path: 'echarts/order',
        name: '订单统计',
        component: () => import('@/views/statistics/echarts/order/order'),
        meta: { title: '订单统计' }
      },
      {
        path: 'echarts/activityTable',
        name: '活动分析',
        component: () => import('@/views/statistics/echarts/activity/activityTable'),
        meta: { title: '活动分析' }
      }
      ,
      {
        path: 'echarts/couponTable',
        name: '优惠券分析',
        component: () => import('@/views/statistics/echarts/activity/couponTable'),
        meta: { title: '优惠券分析' }
      }
      // {
      //   path: 'echarts/orderuser',
      //   name: '统计',
      //   component: () => import('@/views/statistics/echarts/orderuser'),
      //   meta: { title: '统计' }
      // }
    ]
  },
  // {
  //   path: '/report',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: { title: '报表管理', icon: 'table' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'report/customQuery',
  //       name: '报表管理',
  //       component: () => import('@/views/report/customQuery'),
  //       meta: { title: '报表管理' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
