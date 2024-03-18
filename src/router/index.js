import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { setupRouterGuards } from './guards'
import { useAuthStore, usePermissionStore, useUserStore } from '@/store'
import { getPermissions, getUserInfo } from '@/store/helper'
import { basicRoutes } from './basic-routes'

export const router = createRouter({
  history:
    import.meta.env.VITE_USE_HASH === 'true' ? createWebHashHistory('/') : createWebHistory('/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app) {
  try {
    await initUserAndPermissions()
  } catch (error) {
    console.error('🚀 初始化失败', error)
  }
  setupRouterGuards(router)
  app.use(router)
}

export async function initUserAndPermissions() {
  const permissionStore = usePermissionStore()
  const userStore = useUserStore()
  const authStore = useAuthStore()

  if (!authStore.accessToken) {
    const route = unref(router.currentRoute)
    if (route.path !== '/login') {
      router.replace({
        path: '/login',
        query: route.query,
      })
    }
    return
  }
  // const [user1, permissions2] = await Promise.all([getUserInfo(), getPermissions()])

  await getUserInfo().then((res)=>{
    const user = res;
    userStore.setUser(user)
  })

  const permissions = ref([
    {
      "id": 0,
      "name": "简历岗位大数据",
      "code": "Home",
      "type": "MENU",
      "icon": "i-fe:map",
      "show": true,
      "enable": true,
      "order": 0,
      "path": "/",
    },
    {
      "id": 2,
      "name": "系统管理",
      "code": "SysMgt",
      "type": "MENU",
      "icon": "i-fe:tool",
      "show": true,
      "enable": true,
      "order": 2,
      "children": [
        {
          "id": 21,
          "name": "用户管理",
          "code": "UserMgt",
          "type": "MENU",
          "parentId": 2,
          "path": "/pms/user",
          "icon": "i-fe:user",
          "component": "/src/views/pms/user/index.vue",
          "keepAlive": true,
          "show": true,
          "enable": true,
          "order": 0,
          "children": [
            {
              "id": 211,
              "name": "创建新用户",
              "code": "AddUser",
              "type": "BUTTON",
              "parentId": 4,
              "show": true,
              "enable": true,
              "order": 1
            }
          ]
        },
        {
          "id": 22,
          "name": "简历管理",
          "code": "ResumeMgt",
          "type": "MENU",
          "parentId": 2,
          "path": "/pms/resume",
          "icon": "i-fe:file-text",
          "component": "",
          "keepAlive": true,
          "show": true,
          "enable": true,
          "order": 1
        },
        {
          "id": 23,
          "name": "职位管理",
          "code": "JobMgt",
          "type": "MENU",
          "parentId": 2,
          "path": "/pms/job",
          "icon": "i-me:dialog",
          "component": "",
          "keepAlive": true,
          "show": true,
          "enable": true,
          "order": 2
        },
      ]
    },
    {
      "id": 6,
      "name": "我要求职",
      "code": "DEMO",
      "type": "MENU",
      "path": null,
      "icon": "i-fe:send",
      "component": null,
      "show": true,
      "enable": true,
      "order": 1,
      "children": [
        {
          "id": 61,
          "name": "职位搜索",
          "code": "JobSearch",
          "type": "MENU",
          "parentId": 6,
          "path": "/demo/job-search",
          "redirect": null,
          "icon": "i-fe:search",
          "component": "/src/views/demo/job-search/index.vue",
          "layout": "simple",
          "keepAlive": true,
          "show": true,
          "enable": true,
          "order": 0
        },
        {
          "id": 62,
          "name": "简历上传",
          "code": "ImgUpload",
          "type": "MENU",
          "parentId": 6,
          "path": "/demo/upload",
          "redirect": null,
          "icon": "i-fe:upload",
          "component": "/src/views/demo/upload/index.vue",
          "layout": "simple",
          "keepAlive": true,
          "show": true,
          "enable": true,
          "order": 1
        },
        {
          "id": 63,
          "name": "我的收藏",
          "code": "MyLove",
          "type": "MENU",
          "parentId": 6,
          "path": "/demo/mylove",
          "redirect": null,
          "icon": "i-fe:star",
          "component": "/src/views/demo/upload/index.vue",
          "layout": "simple",
          "keepAlive": true,
          "show": true,
          "enable": true,
          "order": 2
        },
      ]
    },
    {
      "id": 8,
      "name": "个人资料",
      "code": "UserProfile",
      "type": "MENU",
      "parentId": null,
      "path": "/profile",
      "redirect": null,
      "icon": "i-fe:user",
      "component": "/src/views/profile/index.vue",
      "layout": null,
      "keepAlive": null,
      "method": null,
      "description": null,
      "show": false,
      "enable": true,
      "order": 99
    },
    {
      "id": 9,
      "name": "我要招人",
      "code": "Base",
      "type": "MENU",
      "parentId": null,
      "path": "",
      "redirect": null,
      "icon": "i-fe:users",
      "component": null,
      "layout": "",
      "keepAlive": null,
      "method": null,
      "description": null,
      "show": true,
      "enable": true,
      "order": 0,
      "children": [
        {
          "id": 91,
          "name": "职位发布",
          "code": "BaseComponents",
          "type": "MENU",
          "parentId": 9,
          "path": "/base/components",
          "redirect": null,
          "icon": "i-fe:edit",
          "component": "/src/views/base/index.vue",
          "layout": null,
          "keepAlive": null,
          "method": null,
          "description": null,
          "show": true,
          "enable": true,
          "order": 0
        },
        {
          "id": 92,
          "name": "钟意人选",
          "code": "Icon",
          "type": "MENU",
          "parentId": 9,
          "path": "/base/icon",
          "redirect": null,
          "icon": "i-fe:smile",
          "component": "/src/views/base/unocss-icon.vue",
          "layout": "",
          "keepAlive": null,
          "method": null,
          "description": null,
          "show": true,
          "enable": true,
          "order": 1
        }
      ]
    }
  ])


  // const user = {
  //     "id": 1,
  //     "username": "admin",
  //     "enable": true,
  //     "createTime": "2023-11-18T08:18:59.150Z",
  //     "updateTime": "2023-11-18T08:18:59.150Z",
  //     "profile": {
  //       "id": 1,
  //       "nickName": "Admin",
  //       "gender": null,
  //       "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
  //       "address": null,
  //       "email": null,
  //       "userId": 1
  //     },
  //     "roles": [
  //       {
  //         "id": 1,
  //         "code": "SUPER_ADMIN",
  //         "name": "超级管理员",
  //         "enable": true
  //       },
  //       {
  //         "id": 2,
  //         "code": "ROLE_QA",
  //         "name": "质检员",
  //         "enable": true
  //       }
  //     ],
  //     "currentRole": {
  //       "id": 1,
  //       "code": "SUPER_ADMIN",
  //       "name": "超级管理员",
  //       "enable": true
  //     }
  // }

  permissionStore.setPermissions(permissions)
  const routeComponents = import.meta.glob('@/views/**/*.vue')
  permissionStore.accessRoutes.forEach((route) => {
    route.component = routeComponents[route.component] || undefined
    !router.hasRoute(route.name) && router.addRoute(route)
  })
}
