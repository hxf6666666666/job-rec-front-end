<template>
  <div class="wh-full flex-col bg-[url(@/assets/images/login_bg.webp)] bg-cover">
    <div class="m-auto max-w-700 min-w-345 f-c-c rounded-8 bg-opacity-20 bg-cover p-12 card-shadow auto-bg">
      <div class="hidden w-380 px-20 py-35 md:block">
        <img src="@/assets/images/login.png" class="w-full" alt="login_banner" />
      </div>

      <div class="w-320 flex-col px-20 py-32">
        <h2 class="f-c-c text-24 text-#6a6a6a font-normal">
          <img src="@/assets/images/logo3.png" height="50" class="mr-12" />
        </h2>
        <n-input v-model:value="loginInfo.username" autofocus class="mt-32 h-40 items-center" placeholder="请输入用户名"
          :maxlength="20">
          <template #prefix>
            <i class="i-fe:user mr-12 opacity-20" />
          </template>
        </n-input>
        <n-input v-model:value="loginInfo.password" class="mt-20 h-40 items-center" type="password"
          show-password-on="mousedown" placeholder="请输入密码" :maxlength="20" @keydown.enter="handleLogin()">
          <template #prefix>
            <i class="i-fe:lock mr-12 opacity-20" />
          </template>
        </n-input>

        <div class="mt-20 flex items-center">
          <n-input v-model:value="loginInfo.captcha" class="h-40 items-center" palceholder="请输入验证码" :maxlength="4"
            @keydown.enter="handleLogin()">
            <template #prefix>
              <i class="i-fe:key mr-12 opacity-20" />
            </template>
          </n-input>
          <img v-if="captchaUrl" :src="captchaUrl" alt="验证码" height="40" class="ml-12 w-80 cursor-pointer"
            @click="initCaptcha" />
        </div>

        <n-checkbox class="mt-20" :checked="isRemember" label="记住我" :on-update:checked="(val) => (isRemember = val)" />

        <div class="mt-20 flex items-center">
          <!-- <n-button
            class="h-40 flex-1 rounded-5 text-16"
            type="warning"
            ghost
            @click="quickLogin()"
          >
            一键体验
          </n-button> -->
          <n-button class="h-40 flex-1 rounded-5 text-16" type="warning" ghost @click="handleAdd()">
            注册
          </n-button>

          <n-button class="ml-32 h-40 flex-1 rounded-5 text-16" type="warning" :loading="loading"
            @click="handleLogin()">
            登录
          </n-button>
          <MeModal ref="modalRef" width="520px">
            <n-form ref="modalFormRef" label-placement="left" label-align="left" :label-width="80" :model="modalForm"
              :disabled="modalAction === 'view'">
              <n-form-item label="用户名" path="userName" :rule="{
                required: true,
                message: '请输入用户名',
                trigger: ['input', 'blur'],
              }">
                <n-input v-model:value="modalForm.userName"/>
              </n-form-item>
              <n-form-item label="初始密码" path="userPassword" :rule="{
                  required: true,
                  message: '请输入密码',
                  trigger: ['input', 'blur'],
                }">
                <n-input v-model:value="modalForm.userPassword" />
              </n-form-item>
              <!-- <n-form-item label="确认密码" path="confirmUserPassword" :rule="{
                  required: true,
                  message: '请确认密码',
                  trigger: ['input', 'blur'],
                }">
                <n-input v-model:value="modalForm.confirmUserPassword" />
              </n-form-item> -->

              <n-form-item :rule="{
                required: true,
                message: '请选择分配角色'
              }" label="角色" path="userRole">
                <n-select v-model:value="modalForm.userRole" :options="[
                  { label: '招聘者', value: '招聘者' },
                  { label: '求职者', value: '求职者' }
                ]" clearable filterable />
              </n-form-item>

            </n-form>
            <n-alert v-if="modalAction === 'add'" type="warning" closable>
              详细信息（昵称、头像）需要由用户本人补充修改
            </n-alert>
          </MeModal>
        </div>
      </div>
    </div>

    <!--    <TheFooter class="py-12" />-->
  </div>
</template>

<script setup>
import { throttle, lStorage } from '@/utils'
import { useStorage } from '@vueuse/core'
import api from './api'
import { useAuthStore } from '@/store'
import { initUserAndPermissions } from '@/router'
import { MeCrud, MeQueryItem, MeModal } from '@/components'
import { useCrud } from '@/composables'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const title = import.meta.env.VITE_TITLE

const loginInfo = ref({
  username: '',
  password: '',
})

const captchaUrl = ref('')
const initCaptcha = throttle(() => {
  captchaUrl.value = 'https://mock.apifox.com/m1/3776410-0-default/auth/captcha?' + 'Date.now()'
}, 500)

const localLoginInfo = lStorage.get('loginInfo')
if (localLoginInfo) {
  loginInfo.value.username = localLoginInfo.username || ''
  loginInfo.value.password = localLoginInfo.password || ''
}
initCaptcha()

function quickLogin() {
  loginInfo.value.username = 'baizhou'
  loginInfo.value.password = 'baizhou'
  handleLogin(true)
}

const isRemember = useStorage('isRemember', true)
const loading = ref(false)
async function handleLogin(isQuick) {
  const { username, password, captcha } = loginInfo.value
  if (!username || !password) return $message.warning('请输入用户名和密码')
  if (!isQuick && !captcha) return $message.warning('请输入验证码')
  try {
    loading.value = true
    $message.loading('正在验证，请稍后...', { key: 'login' })
    const { data } = await api.login({ userName: username, userPassword: password.toString() })
    if (isRemember.value) {
      lStorage.set('loginInfo', { username, password })
    } else {
      lStorage.remove('loginInfo')
    }
    onLoginSuccess(data)
  } catch (error) {
    // 10003为验证码错误专属业务码
    if (error?.code === 10003) {
      // 为防止爆破，验证码错误则刷新验证码
      initCaptcha()
    }
    $message.destroy('login')
    console.error(error)
  }
  loading.value = false
}

async function onLoginSuccess(data = {}) {
  authStore.setToken(data)
  $message.loading('登录中...', { key: 'login' })
  try {
    await initUserAndPermissions()
    $message.success('登录成功', { key: 'login' })
    if (route.query.redirect) {
      const path = route.query.redirect
      delete route.query.redirect
      router.push({ path, query: route.query })
      window.location.reload();
    } else {
      router.push('/home')
      window.location.reload();
    }
  } catch (error) {
    console.error(error)
    $message.destroy('login')
  }
}


const {
  modalRef,
  modalFormRef,
  modalForm,
  modalAction,
  handleAdd,
} = useCrud({
  name: '用户',
  initForm: { isDisabled: 0, createTime: new Date(Date.now()).toISOString(), updateTime: new Date(Date.now()).toISOString() },
  doCreate: api.create,
})
</script>
