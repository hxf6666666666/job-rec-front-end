import { basePermissions } from '@/settings'
import api from '@/api'

export async function getUserInfo() {
  const res = await api.getUser()
  const { id, userName, userNickname, userAvatar, userRole, isDisabled } = res.data || {}
  return {
    id, userName, userNickname, userAvatar, userRole, isDisabled
  }
}

export async function getPermissions() {
  let asyncPermissions = []
  try {
    const res = await api.getRolePermissions()
    asyncPermissions = res?.data || []
  } catch (error) {
    console.error(error)
  }
  return basePermissions.concat(asyncPermissions)
}
