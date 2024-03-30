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
      title: '首页',
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
    name: 'UserMgt',
    path: '/pms/user',
    component: () => import('@/views/pms/user/index.vue'),
    meta: {
      title: '用户管理',
    },
  },

  {
    name: 'ResumeMgt',
    path: '/pms/resume',
    component: () => import('@/views/pms/resume/index.vue'),
    meta: {
      title: '简历管理',
    },
  },

  {
    name: 'JobMgt',
    path: '/pms/job',
    component: () => import('@/views/pms/job/index.vue'),
    meta: {
      title: '职位管理',
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
    path: '/demo/upload(弃用)',
    component: () => import('@/views/demo/upload(弃用)/index.vue'),
    meta: {
      title: '简历上传',
    },
  },
  {
    name: 'MyJob',
    path: '/myjob',
    component: () => import('@/views/demo/MyJob/index.vue'),
    meta: {
      title: '我的职位',
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
    name: 'JobUpload',
    path: '/job-upload',
    component: () => import('@/views/base/upload/index.vue'),
    meta: {
      title: '职位发布',
    },
  },
  {
    name: 'JobDetail',
    path: '/JobDetail',
    component: () => import('@/views/base/JobDetail.vue'),
    meta: {
      title: '职位详情',
    },
  },
  {
    name: 'Icon',
    path: '/base/icon',
    component: () => import('@/components/common/KnowledgeGraph.vue'),
    meta: {
      title: '钟意人选',
    },
  },
  {
      name: 'SeekerSearch',
      path: '/seeker-search',
      component: () => import('@/views/base/seeker-collection/index.vue'),
      meta: {
          title: '人才推荐',
      },
  },
  {
      name: 'CVDetail',
      path: '/CVDetail',
      component: () => import('@/views/demo/CVDetail/CVDetail.vue'),
      meta: {
          title: '职位推荐',
      },
  },
]
