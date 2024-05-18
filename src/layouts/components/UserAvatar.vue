<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div class="flex cursor-pointer items-center">
      <n-badge value="">
        <n-avatar round :size="56" :src="userStore.userAvatar" />
      </n-badge>
      <div v-if="userStore.userInfo" class="ml-12 flex-col flex-shrink-0 items-center">
        <span class="text-20" style="font-family: 华文中宋; font-weight: bold">{{ userStore.userNickname }}</span>
        <span>
          <n-tag :bordered="false" :type="getTagType(userStore.userRole)" round size="medium">
            {{ userStore.userRole }}
          </n-tag>
        </span>
      </div>
    </div>
  </n-dropdown>

  <RoleSelect ref="roleSelectRef" />
</template>

<script setup>
import { useAuthStore, usePermissionStore, useUserStore } from '@/store'
import { RoleSelect } from '@/layouts/components'
import { initUserAndPermissions } from '@/router'
import api from '@/api'

const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()
const permissionStore = usePermissionStore()

const getTagType = (userRole) => {
  switch (userRole) {
    case '超级管理员':
      return 'warning'; // or whatever type you want
    case '管理员':
      return 'error'; // or whatever type you want
    case '招聘者':
      return 'info'; // or whatever type you want
    default:
      return 'success'; // or whatever type you want for other cases
  }
}


const options = reactive([
  // {
  //   label: '个人资料',
  //   key: 'profile',
  //   icon: () => h('i', { class: 'i-material-symbols:person-outline text-14' }),
  //   show: computed(() => permissionStore.accessRoutes?.some((item) => item.path === '/profile')),
  // },
  // {
  //   label: '切换角色',
  //   key: 'toggleRole',
  //   icon: () => h('i', { class: 'i-basil:exchange-solid text-14' }),
  //   show: computed(() => userStore.userRole),
  // },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h('i', { class: 'i-mdi:exit-to-app text-14' }),
  },
])

const roleSelectRef = ref(null)
function handleSelect(key) {
  switch (key) {
    case 'profile':
      router.push('/profile')
      break
    case 'toggleRole':
      roleSelectRef.value?.open({
        onOk() {
          initUserAndPermissions().then(() => {
            router.replace('/')
          })
        },
      })
      break
    case 'logout':
      $dialog.confirm({
        title: '提示',
        type: 'info',
        content: '确认退出？',
        async confirm() {
          try {
            await api.logout()
          } catch (error) {
            console.error(error)
          }
          authStore.logout()
          localStorage.clear()
          $message.success('已退出登录')
          router.push('/')
        },
      })
      break
  }
}
</script>
