import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
  }),
  getters: {
    userId() {
      return this.userInfo?.id
    },
    userName() {
      return this.userInfo?.userName
    },
    userNickname() {
      return this.userInfo?.userNickname
    },
    userAvatar() {
      return this.userInfo?.userAvatar
    },
    userRole() {
      return this.userInfo?.userRole || {}
    },
    isDisabled(){
      return this.userInfo?.isDisabled
    }
  },
  actions: {
    setUser(user) {
      this.userInfo = user
    },
    resetUser() {
      this.$reset()
    },
  },
})
