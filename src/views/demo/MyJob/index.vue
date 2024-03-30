<script setup>

import JobRec from '@/components/common/JobRec.vue'
import ResumeForm from '@/components/common/ResumeForm.vue'
import CompetencyAssess from '@/components/common/CompetencyAssess.vue'
import ResumeCard from '@/components/common/ResumeCard.vue'
import { AppPage } from '@/components/index.js'
import JobCard from '@/components/common/JobCard.vue'
import JobCard2 from '@/components/common/JobCard2.vue'
</script>

<template>
  <AppPage>
    <n-card>
      <n-tabs :bar-width="100" animated class="items-center" default-value="浏览过" tab-style="font-size:17px; font-weight:bold;"
              type="bar">
        <n-tab-pane name="浏览过" tab="浏览过">
          <n-alert type="info" :bordered="false">
            点击查看过的职位会显示在这里，仅显示最近浏览过的10条！
          </n-alert>
          <job-card></job-card>
          <job-card></job-card>
          <job-card></job-card>
          <job-card></job-card>
          <job-card></job-card>
        </n-tab-pane>

        <n-tab-pane name="收藏过" tab="收藏过">
          <n-alert type="info" :bordered="false">
            点击收藏过的职位会显示在这里！
          </n-alert>
          <job-card></job-card>
          <job-card></job-card>
          <job-card></job-card>
          <job-card></job-card>
          <job-card></job-card>
        </n-tab-pane>

        <n-tab-pane name="投递过" tab="投递过">
          <n-alert type="info" :bordered="false">
            点击投递过的职位会显示在这里！
          </n-alert>
          <job-card></job-card>
          <job-card></job-card>
          <job-card></job-card>
          <job-card></job-card>
          <job-card></job-card>
        </n-tab-pane>

        <n-tab-pane name="我的offer" tab="我的offer">
          <n-alert type="info" :bordered="false">
            投递成功、被招聘方邀请的职位都会显示在这里哦！
          </n-alert>
          <job-card2></job-card2>
          <job-card2></job-card2>
          <job-card2></job-card2>
        </n-tab-pane>

      </n-tabs>
    </n-card>
  </AppPage>
</template>

<style scoped>

</style>
