<script setup>

import JobRec from '@/components/common/JobRec.vue'
import ResumeForm from '@/components/common/ResumeForm.vue'
import CompetencyAssess from '@/components/common/CompetencyAssess.vue'
import ResumeCard from '@/components/common/ResumeCard.vue'
import { AppPage } from '@/components/index.js'
import JobCard from '@/components/common/JobCard.vue'
import JobCard2 from '@/components/common/JobCard2.vue'
import { useUserStore } from '@/store/index.js'
import api from './api.js' 
const userStore = useUserStore()
const jobHistoryList = ref([]);
const jobFavoriteList = ref([]);
const jobApplicationList = ref([]);
const jobOfferList = ref([]);
// const jobList = ref([]);

// 执行搜索操作
const getHistory = async () => {
  try {
    const response = await api.getHistory(userStore.userId);
    console.log(response.data)
    jobHistoryList.value = response.data

  } catch (error) {
    console.error('Error get history:', error);
  }
};
const getFavorites = async () => {
  try {
    const response = await api.getFavorites(userStore.userId);
    console.log(response.data)
    jobFavoriteList.value = response.data

  } catch (error) {
    console.error('Error get favorites:', error);
  }
};
const getApplications = async () => {
  try {
    const response = await api.getApplications(userStore.userId);
    console.log(response.data)
    jobApplicationList.value = response.data

  } catch (error) {
    console.error('Error get applications:', error);
  }
};
const getMyOffers = async () => {
  try {
    const response = await api.getMyOffers(userStore.userId);
    console.log(response.data)
    jobOfferList.value = response.data

  } catch (error) {
    console.error('Error get applications:', error);
  }
};
onMounted(()=>{
  getHistory();
  getFavorites();
  getApplications();
  getMyOffers();
})
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
          <div v-for="(job, index) in jobHistoryList" :key="index">
      <job-card
        :id="job.id"
        :title="job.jobName"
        :exp="job.workTimeType"
        :edu="job.educationType"
        :city="job.city"
        :type1="job.jobType"
        :industry="job.industryId"
        :company="job.companyName"
        :address="job.jobAddress"
        :skills="job.jobSkills"
        :characters="job.jobPersonality"
        :salaryLower="job.salaryLower"
        :salaryUpper="job.salaryUpper"
        :salaryUnit="job.salaryUnit"
      ></job-card>
    </div>
        </n-tab-pane>

        <n-tab-pane name="收藏过" tab="收藏过">
          <n-alert type="info" :bordered="false">
            点击收藏过的职位会显示在这里！
          </n-alert>
          <div v-for="(job, index) in jobFavoriteList" :key="index">
      <job-card
        :id="job.id"
        :title="job.jobName"
        :exp="job.workTimeType"
        :edu="job.educationType"
        :city="job.city"
        :type1="job.jobType"
        :industry="job.industryId"
        :company="job.companyName"
        :address="job.jobAddress"
        :skills="job.jobSkills"
        :characters="job.jobPersonality"
        :salaryLower="job.salaryLower"
        :salaryUpper="job.salaryUpper"
        :salaryUnit="job.salaryUnit"
      ></job-card>
    </div>
        </n-tab-pane>

        <n-tab-pane name="投递过" tab="投递过">
          <n-alert type="info" :bordered="false">
            点击投递过的职位会显示在这里！
          </n-alert>
          <div v-for="(job, index) in jobApplicationList" :key="index">
      <job-card
        :id="job.id"
        :title="job.jobName"
        :exp="job.workTimeType"
        :edu="job.educationType"
        :city="job.city"
        :type1="job.jobType"
        :industry="job.industryId"
        :company="job.companyName"
        :address="job.jobAddress"
        :skills="job.jobSkills"
        :characters="job.jobPersonality"
        :salaryLower="job.salaryLower"
        :salaryUpper="job.salaryUpper"
        :salaryUnit="job.salaryUnit"
      ></job-card>
    </div>
        </n-tab-pane>

        <n-tab-pane name="我的offer" tab="我的offer">
          <n-alert type="info" :bordered="false">
            投递成功、被招聘方邀请的职位都会显示在这里哦！
          </n-alert>
          <div v-for="(job, index) in jobOfferList" :key="index">
      <job-card2
        :id="job.id"
        :title="job.jobName"
        :exp="job.workTimeType"
        :edu="job.educationType"
        :city="job.city"
        :type1="job.jobType"
        :industry="job.industryId"
        :company="job.companyName"
        :address="job.jobAddress"
        :skills="job.jobSkills"
        :characters="job.jobPersonality"
        :salaryLower="job.salaryLower"
        :salaryUpper="job.salaryUpper"
        :salaryUnit="job.salaryUnit"
      ></job-card2>
    </div>
        </n-tab-pane>

      </n-tabs>
    </n-card>
  </AppPage>
</template>

<style scoped>

</style>
