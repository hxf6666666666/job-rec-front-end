<template>
  <n-menu
      ref="menu"
      class="side-menu"
      :indent="28"
      :collapsed-icon-size="22"
      :collapsed-width="64"
      :collapsed="appStore.collapsed"
      :options="permissionStore.menus"
      :value="activeKey"
      @update:value="handleMenuSelect"
  />
</template>

<script setup>
import {useAppStore, usePermissionStore} from '@/store'
import {isExternal} from '@/utils'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const activeKey = computed(() => route.meta?.parentKey || route.name)

const menu = ref(null)

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
    "path": "/home",
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
        "name": "职位推荐",
        "code": "CVDetail",
        "type": "MENU",
        "parentId": 9,
        "path": "/CVDetail",
        "redirect": null,
        "icon": "i-fe:file-text",
        "component": "/src/views/base/demo/CVDetail/CVDetail.vue",
        "layout": null,
        "keepAlive": null,
        "method": null,
        "description": null,
        "show": true,
        "enable": true,
        "order": 1
      },
      {
        "id": 64,
        "name": "我的职位",
        "code": "MyJob",
        "type": "MENU",
        "parentId": 6,
        "path": "/myjob",
        "redirect": null,
        "icon": "i-fe:star",
        "component": "/src/views/demo/MyJob/index.vue",
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
        "code": "JobUpload",
        "type": "MENU",
        "parentId": 9,
        "path": "/job-upload",
        "redirect": null,
        "icon": "i-fe:edit",
        "component": "/src/views/base/upload/index.vue",
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
        "name": "职位详情",
        "code": "JobDetail",
        "type": "MENU",
        "parentId": 9,
        "path": "/JobDetail",
        "redirect": null,
        "icon": "i-fe:file-text",
        "component": "/src/views/base/JobDetail.vue",
        "layout": null,
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


usePermissionStore().setPermissions(permissions)


watch(route, async () => {
  await nextTick()
  menu.value?.showOption()
})

function handleMenuSelect(key, item) {
  if (isExternal(item.path)) {
    window.open(item.path)
  } else {
    router.push(item.path)
  }
}

</script>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content-header {
    font-size: 15px;
  }

  .n-menu-item-content {
    &::before {
      left: 8px;
      right: 8px;
    }

    &.n-menu-item-content--selected::before {
      border-left: 4px solid var(--primary-color);
    }
  }
}


</style>
