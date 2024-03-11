<template>
  <AppPage>
    <n-card>
      <n-space align="center">
        <n-avatar round :size="100" :src="userStore.avatar" />
        <div class="ml-20">
          <div class="flex items-center text-16">
            <span>用户名:</span>
            <span class="ml-12 opacity-80">{{ userStore.username }}</span>
            <n-button class="ml-32" type="primary" text @click="pwdModalRef.open()">
              <i class="i-fe:edit mr-4" />
              修改密码
            </n-button>
          </div>
          <div class="mt-16 flex items-center">
            <n-button type="primary" ghost @click="avatarModalRef.open()">更改头像</n-button>
            <span class="ml-12 opacity-60">
              修改头像只支持在线链接，暂时不提供上传图片功能！
            </span>
          </div>
        </div>
      </n-space>
    </n-card>

    <div class="flex">
      <n-card class="mt-20 mr-20 w-[50%]" title="个人资料信息">
        <template #header-extra>
          <n-button type="primary" text @click="profileModalRef.open()">
            <i class="i-fe:edit mr-4" />
            修改资料
          </n-button>
        </template>

        <n-descriptions
          label-placement="left"
          :label-style="{ width: '200px', textAlign: 'center' }"
          :column="1"
          bordered
        >
          <n-descriptions-item label="照片">
            <img class="w-xs" src="/src/assets/images/简历照片.png"  alt=""/>
          </n-descriptions-item>
          <n-descriptions-item label="姓名">{{ userStore.nickName }}</n-descriptions-item>
          <n-descriptions-item label="性别">
            {{ genders.find((item) => item.value === userStore.userInfo?.gender)?.label ?? '未知' }}
          </n-descriptions-item>
          <n-descriptions-item label="出生年月">2024-2</n-descriptions-item>
          <n-descriptions-item label="城市">南京</n-descriptions-item>
          <n-descriptions-item label="电话">15552510062</n-descriptions-item>
          <n-descriptions-item label="微信号">hxf15552510062</n-descriptions-item>
          <n-descriptions-item label="邮箱">635663114@qq.com</n-descriptions-item>
        </n-descriptions>
      </n-card>
      <n-card class="mt-20 w-[50%]" title="期望职位">
        <template #header-extra>
          <n-button type="primary" text @click="profileModalRef.open()">
            <i class="i-fe:edit mr-4" />
            修改期望
          </n-button>
        </template>

        <n-descriptions
          label-placement="left"
          :label-style="{ width: '200px', textAlign: 'center' }"
          :column="1"
          bordered
        >
          <n-descriptions-item label="实习/全职">全职</n-descriptions-item>
          <n-descriptions-item label="类型">Java</n-descriptions-item>
          <n-descriptions-item label="薪资范围(k)">
            <n-space vertical>
              <n-slider v-model:value="value" range :step="1" disabled/>
              <n-space>
                <n-input-number disabled v-model:value="value[0]" size="small" />
                <n-input-number disabled v-model:value="value[1]" size="small" />
              </n-space>
            </n-space>
          </n-descriptions-item>
          <n-descriptions-item label="工作城市">
            南京
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </div>

    <div class="flex">
      <n-card class="mt-20 w-[100%]" title="教育经历">
        <template #header-extra>
          <n-button type="primary" text @click="profileModalRef.open()">
            <i class="i-fe:edit mr-4" />
            编辑教育经历
          </n-button>
        </template>

        <n-space align="center">
          <img object-contain size="65" src="/src/assets/images/东南大学校徽.png"  alt=""/>
          <div class="ml-20">
            <div class="flex items-center text-16">
              <span>东南大学</span>
              <span class="ml-12"><n-tag :bordered="false" type="error">985院校</n-tag></span>
              <span class="ml-12"><n-tag :bordered="false" type="info">211院校</n-tag></span>
              <span class="ml-12"><n-tag :bordered="false" type="success">双一流院校</n-tag></span>
            </div>
            <div class="mt-16 flex items-center text-15">
              <span class="ml-12 opacity-60">2021-2025</span>
              <span class="ml-12 opacity-100">计算机科学与技术</span>
              <span class="ml-12 opacity-100">本科</span>
            </div>
          </div>
          <div class="ml-20">
            专业排名：前1%
            主修课程：数据结构、数据库、C++、Java程序设计、计算机网络
            毕设/论文：暂无
            描述：暂无。
          </div>
        </n-space>

        <n-space align="center" class="mt-32">
          <img object-contain size="65" src="/src/assets/images/南京大学校徽.png"  alt=""/>
          <div class="ml-20">
            <div class="flex items-center text-16">
              <span>南京大学</span>
              <span class="ml-12"><n-tag :bordered="false" type="error">985院校</n-tag></span>
              <span class="ml-12"><n-tag :bordered="false" type="info">211院校</n-tag></span>
              <span class="ml-12"><n-tag :bordered="false" type="success">双一流院校</n-tag></span>
            </div>
            <div class="mt-16 flex items-center text-15">
              <span class="ml-12 opacity-60">2025-2027</span>
              <span class="ml-12 opacity-100">计算机科学与技术</span>
              <span class="ml-12 opacity-100">硕士</span>
            </div>
          </div>
          <div class="ml-20">
            专业排名：前1%
            主修课程：数据结构、数据库、C++、Java程序设计、计算机网络
            毕设/论文：暂无
            描述：暂无。
          </div>
        </n-space>
      </n-card>
    </div>

    <div class="flex">
      <n-card class="mt-20 mr-20 w-[50%]" title="工作实习经历">
        <template #header-extra>
          <n-button type="primary" text @click="profileModalRef.open()">
            <i class="i-fe:edit mr-4" />
            编辑工作实习经历
          </n-button>
        </template>

        <n-descriptions
          label-placement="left"
          :label-style="{ width: '200px', textAlign: 'center' }"
          :column="1"
          bordered
        >
          <n-descriptions-item label="2021-2022">公司名称、职位名称、工作内容、拥有技能等</n-descriptions-item>
          <n-descriptions-item label="2022-2025">公司名称、职位名称、工作内容、拥有技能等</n-descriptions-item>
        </n-descriptions>
      </n-card>
      <n-card class="mt-20 w-[50%]" title="项目经历">
        <template #header-extra>
          <n-button type="primary" text @click="profileModalRef.open()">
            <i class="i-fe:edit mr-4" />
            编辑项目经历
          </n-button>
        </template>

        <n-descriptions
          label-placement="left"
          :label-style="{ width: '200px', textAlign: 'center' }"
          :column="1"
          bordered
        >
          <n-descriptions-item label="项目1">项目角色、项目描述、项目时间等</n-descriptions-item>
          <n-descriptions-item label="项目2">项目角色、项目描述、项目时间等</n-descriptions-item>
        </n-descriptions>
      </n-card>
    </div>

    <div class="flex">
      <n-card class="mt-20 mr-20 w-[50%]" title="技能|知识|素养">
        <template #header-extra>
          <n-button type="primary" text @click="profileModalRef.open()">
            <i class="i-fe:edit mr-4" />
            编辑个人能力
          </n-button>
        </template>

        <n-descriptions
          label-placement="left"
          :label-style="{ width: '200px', textAlign: 'center' }"
          :column="1"
          bordered
        >
          <n-descriptions-item label="技能"></n-descriptions-item>
          <n-descriptions-item label="知识"></n-descriptions-item>
          <n-descriptions-item label="素养"></n-descriptions-item>
        </n-descriptions>
      </n-card>
      <n-card class="mt-20 w-[50%]" title="自定义添加">
        <template #header-extra>
          <n-button type="primary" text @click="profileModalRef.open()">
            <i class="i-fe:edit mr-4" />
            编辑自定义
          </n-button>
        </template>
        <div class="flex">
          资格证书、社团组织经历、培训经历和志愿者经历等描述。
        </div>
      </n-card>
    </div>


    <MeModal ref="avatarModalRef" width="420px" title="更改头像" @ok="handleAvatarSave()">
      <n-input v-model:value="newAvatar" />
    </MeModal>

    <MeModal ref="pwdModalRef" title="修改密码" width="420px" @ok="handlePwdSave()">
      <n-form
        ref="pwdFormRef"
        :model="pwdForm"
        label-placement="left"
        require-mark-placement="left"
      >
        <n-form-item label="原密码" path="oldPassword" :rule="required">
          <n-input v-model:value="pwdForm.oldPassword" type="password" placeholder="请输入原密码" />
        </n-form-item>
        <n-form-item label="新密码" path="newPassword" :rule="required">
          <n-input v-model:value="pwdForm.newPassword" type="password" placeholder="请输入新密码" />
        </n-form-item>
      </n-form>
    </MeModal>

    <MeModal ref="profileModalRef" title="修改资料" width="420px" @ok="handleProfileSave()">
      <n-form ref="profileFormRef" :model="profileForm" label-placement="left">
        <n-form-item label="昵称" path="nickName">
          <n-input v-model:value="profileForm.nickName" placeholder="请输入昵称" />
        </n-form-item>
        <n-form-item label="性别" path="gender">
          <n-select
            v-model:value="profileForm.gender"
            :options="genders"
            placeholder="请选择性别"
          />
        </n-form-item>
        <n-form-item label="地址" path="address">
          <n-input v-model:value="profileForm.address" placeholder="请输入地址" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="profileForm.email" placeholder="请输入邮箱" />
        </n-form-item>
      </n-form>
    </MeModal>
  </AppPage>
</template>

<script setup>
import { MeModal } from '@/components'
import { useForm, useModal } from '@/composables'
import { useUserStore } from '@/store'
import { getUserInfo } from '@/store/helper'
import api from './api'
import { AppPage } from '@/components/index.js'

const userStore = useUserStore()
const required = {
  required: true,
  message: '此为必填项',
  trigger: ['blur', 'change'],
}

const value = ref([30,50])
const [pwdModalRef] = useModal()
const [pwdFormRef, pwdForm, pwdValidation] = useForm()

async function handlePwdSave() {
  await pwdValidation()
  await api.changePassword(pwdForm.value)
  $message.success('密码修改成功')
  refreshUserInfo()
}

const newAvatar = ref(userStore.avatar)
const [avatarModalRef] = useModal()
async function handleAvatarSave() {
  if (!newAvatar.value) {
    $message.error('请输入头像地址')
    return false
  }
  await api.updateProfile({ id: userStore.userId, avatar: newAvatar.value })
  $message.success('头像修改成功')
  refreshUserInfo()
}

const genders = [
  { label: '保密', value: 0 },
  { label: '男', value: 1 },
  { label: '女', value: 2 },
]
const [profileModalRef] = useModal()
const [profileFormRef, profileForm, profileValidation] = useForm({
  id: userStore.userId,
  nickName: userStore.nickName,
  gender: userStore.userInfo?.gender ?? 0,
  address: userStore.userInfo?.address,
  email: userStore.userInfo?.email,
})
async function handleProfileSave() {
  await profileValidation()
  await api.updateProfile(profileForm.value)
  $message.success('资料修改成功')
  refreshUserInfo()
}

async function refreshUserInfo() {
  const user = await getUserInfo()
  userStore.setUser(user)
}
</script>
