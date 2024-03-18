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
        name: 'tuijian',
        path: '/tuijian',
        component: () => import('@/views/base/tuijian.vue'),
        meta: {
            title: '求职者推荐',
        },
    },
    {
        name: 'zhaopinHistory',
        path: '/zhaopinHistory',
        component: () => import('@/views/base/zhaopinHistory.vue'),
        meta: {
            title: '招聘历史',
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
]
