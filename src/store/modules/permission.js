import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useRouterStore } from './router'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    accessRoutes: [],
    permissions: [],
    menus: [],
  }),
  actions: {
    setPermissions(permissions) {
      this.permissions = permissions
      const userRole = useUserStore().userRole
      this.permissions = this.checkUserRole(this.permissions, userRole)
      this.menus = this.permissions
        .filter((item) => item.type === 'MENU')
        .map((item) => this.getMenuItem(item))
        .filter((item) => !!item)
        .sort((a, b) => a.order - b.order)
    },
    getMenuItem(item, parent) {
      const route = this.generateRoute(item, item.show ? null : parent?.key)
      if (item.enable && route.path && !route.path.startsWith('http')) this.accessRoutes.push(route)
      if (!item.show) return null
      const menuItem = {
        label: route.meta.title,
        key: route.name,
        path: route.path,
        icon: () => h('i', { class: `${route.meta.icon}?mask text-16` }),
        order: item.order ?? 0,
      }
      const children = item.children?.filter((item) => item.type === 'MENU') || []
      if (children.length) {
        menuItem.children = children
          .map((child) => this.getMenuItem(child, menuItem))
          .filter((item) => !!item)
          .sort((a, b) => a.order - b.order)
        if (!menuItem.children.length) delete menuItem.children
      }
      return menuItem
    },
    generateRoute(item, parentKey) {
      return {
        name: item.code,
        path: item.path,
        redirect: item.redirect,
        component: item.component,
        meta: {
          icon: item.icon,
          title: item.name,
          layout: item.layout,
          keepAlive: !!item.keepAlive,
          parentKey,
          btns: item.children
            ?.filter((item) => item.type === 'BUTTON')
            .map((item) => ({ code: item.code, name: item.name })),
        },
      }
    },
    checkUserRole(permissions, userRole) {
      let filteredPermissions;
      switch (userRole) {
        case '管理员':
          filteredPermissions = permissions;
          break;
        case '求职者':
          filteredPermissions = permissions.filter(item => item.name !== '我要招人' && item.name !=='系统管理');
          break;
        case '招聘者':
          filteredPermissions = permissions.filter(item => item.name !== '我要求职'&& item.name !=='系统管理');
          break;
        default:
          // 默认情况
          filteredPermissions = permissions.filter(item => item.name !== '我要招人' && item.name !=='系统管理');
      }
      return filteredPermissions;
    },
    resetPermission() {
      this.$reset()
    },
  },
})
