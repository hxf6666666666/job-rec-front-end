<script setup>
import { useUserStore } from '@/store/index.js'
import JobDetailCard from '@/components/common/JobDetailCard.vue'
import ResumeCard from '@/components/common/ResumeCard.vue'
const userStore = useUserStore()
const tags = [
  { text: 'CET6', type: 'info' },
  { text: 'Java', type: 'info' },
  { text: 'MySQL', type: 'info' },
  { text: 'SpringBoot', type: 'info' },
  { text: '爱学习', type: 'error' },
  { text: '善于合作', type: 'error' },
  // 更多标签...
];
const isApplied = ref(false)
const show = ref(false)

</script>

<template>
  <n-card id="resume" title=" " class="mt-15" size="small" embedded hoverable @click="show=!show">
    <template #header-extra>
      <n-button size="tiny" :type="isApplied ? 'error' : 'info'" @click.stop="isApplied = !isApplied" class="mr-12">
        {{ isApplied ? '取消' : '发放offer' }}
      </n-button>
      <div @click.stop>
        <n-rate size="large" count="1" clearable/>
      </div>
    </template>
    <div class="flex">
      <n-avatar :size="100" :src="userStore.userAvatar" class="mt-15 ml-15" round />
      <div class="mt-15 ml-40">
        <div>
          <span class="text-23" style="font-family: 华文中宋; font-weight: bold">{{ userStore.userNickname }}</span>
          <span class="ml-10">
          <n-tag :bordered="false" size="small">
            男
          </n-tag>
          </span>
          <span class="ml-10">
          <n-tag :bordered="false" size="small">
            23岁
          </n-tag>
          </span>
          <span class="ml-10">
          <n-tag :bordered="false" size="small">
            南京大学
          </n-tag>
          </span>
          <span v-for="(tag, index) in tags" :key="index" class="ml-10">
            <n-tag :bordered="false" size="small" :type="tag.type">
              {{ tag.text }}
            </n-tag>
          </span>
        </div>
        <div class="mt-10">
        <span>
          <n-tag :bordered="false" size="medium" type="success">
            <template #icon>
              <i class="i-fe:pen-tool"></i>
            </template>
            名校背景
          </n-tag>
        </span>
          <span class="ml-10">
          <n-tag :bordered="false" size="medium" type="error">
            <template #icon>
              <i class="i-fe:book"></i>
            </template>
            成绩优异
          </n-tag>
        </span>
          <span class="ml-10">
          <n-tag :bordered="false" size="medium" type="warning">
            <template #icon>
              <i class="i-fe:airplay?mask"></i>
            </template>
            项目多
          </n-tag>
        </span>
        </div>
        <div class="mt-10">
          <span class="text-14 opacity-70"><i class="i-fe:phone mr-6"></i>15552510062</span>
          <span class="text-14 ml-12 opacity-70"><i class="i-fe:mail mr-6"></i>635663114@qq.com</span>
          <span class="text-14 ml-12 opacity-70"><i class="i-fe:book?mask mr-6"></i>0年经验</span>
        </div>
      </div>
    </div>
  </n-card>
  <n-drawer v-model:show="show" :width="760" show-mask="true">
    <n-drawer-content :native-scrollbar="false">
      <resume-card></resume-card>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
