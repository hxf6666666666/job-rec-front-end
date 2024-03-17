export const basicRoutes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页',
      layout: 'empty',
    },
  },
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '简历岗位大数据', // 从权限中获取
    },
  },
  {
    name: 'UserMgt',
    path: '/pms/user',
    component: () => import('@/views/pms/user/index.vue'), // 注意路径
    meta: {
      title: '用户管理',
    },
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '页面飞走了',
      layout: 'empty',
    },
  },
  {
    name: '403',
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    meta: {
      title: '没有权限',
      layout: 'empty',
    },
  },
  {
    name: 'JobSearch',
    path: '/demo/job-search',
    component: () => import('@/views/demo/job-search/index.vue'),
    meta: {
      title: '职位搜索',
    },
  },
  {
    name: 'ImgUpload',
    path: '/demo/upload',
    component: () => import('@/views/demo/upload/index.vue'),
    meta: {
      title: '简历上传',
    },
  },
  {
    name: 'MyLove',
    path: '/demo/mylove',
    meta: {
      title: '我的收藏',
    },
  },
  {
    name: 'UserProfile',
    path: '/profile',
    component: () => import('@/views/profile/index.vue'),
    meta: {
      title: '个人资料',
      show: false, // 不在菜单中显示
    },
  },
  {
    name: 'BaseComponents',
    path: '/base/components',
    component: () => import('@/views/base/index.vue'),
    meta: {
      title: '职位发布',
    },
  },
  {
    name: 'Icon',
    path: '/base/icon',
    component: () => import('@/views/base/unocss-icon.vue'),
    meta: {
      title: '钟意人选',
    },
  },
]
