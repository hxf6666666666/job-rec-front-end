<script setup>

import ResumeCard from '@/components/common/ResumeCard.vue'
import { AppPage } from '@/components/index.js'
import ResumeForm from '@/components/common/ResumeForm.vue'
import JobRec from '@/components/common/JobRec.vue'
import CompetencyAssess from '@/components/common/CompetencyAssess.vue'
import SeekerRec from '@/components/common/SeekerRec.vue'
import JobDetailCard from '@/components/common/JobDetailCard.vue'
import JobCard2 from '@/components/common/JobCard2.vue'
import JobCard from '@/components/common/JobCard.vue'
import SeekerCard from '@/components/common/SeekerCard.vue'

const currentRef = ref(1)

</script>

<template>
  <AppPage>
    <n-card>
      <n-tabs :bar-width="100" animated class="items-center" default-value="职位卡片" tab-style="font-size:17px; font-weight:bold;"
              type="bar">


        <!--  一个问题是，boss直聘似乎不允许使用iframe嵌入他们的页面(code 400)，智联招聘、猎聘网可以，但数据集都是boss直聘 -->
        <n-tab-pane name="原始链接" tab="原始链接">
          <div class="flex justify-center w-1000 mt-15">
            <iframe
              src="https://www.liepin.com/job/1919898383.shtml"
              width="100%"
              height="600"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </n-tab-pane>

        <n-tab-pane name="修改职位" tab="修改职位">
          <div class="button-container">
            <n-button v-print="'#resume'" size="tiny" type="warning">提交修改</n-button>
          </div>
          <n-card embedded>
            <job-form></job-form>
          </n-card>
        </n-tab-pane>


        <n-tab-pane name="职位卡片" tab="职位卡片">
          <div class="button-container">
            <n-button v-print="'#job-detail'" size="tiny" type="info">导出为PDF</n-button>
          </div>
          <job-detail-card></job-detail-card>
        </n-tab-pane>



        <n-tab-pane name="人才推荐" tab="人才推荐">
          <div class="button-container">
            <n-button class="mr-12" size="tiny" type="info">开始推荐人才</n-button>
            <n-button size="tiny" type="success">导出为Excel</n-button>
            <div class="mt-8">
              当前推荐结果生成时间：
              <n-time :time="time" />
            </div>
          </div>
          <seeker-rec></seeker-rec>
        </n-tab-pane>

        <n-tab-pane name="收藏过" tab="收藏过">
          <n-alert type="info" :bordered="false">
            该职位下，点击收藏过的简历会显示在这里！
          </n-alert>
          <seeker-card></seeker-card>
          <seeker-card></seeker-card>
          <seeker-card></seeker-card>
          <seeker-card></seeker-card>
        </n-tab-pane>

        <n-tab-pane name="投递者" tab="投递者">
          <n-alert type="info" :bordered="false">
            该职位下，投递者的简历会显示在这里，你可以选择是否发放offer！
          </n-alert>
          <seeker-card></seeker-card>
          <seeker-card></seeker-card>
          <seeker-card></seeker-card>
          <seeker-card></seeker-card>
        </n-tab-pane>

        <n-tab-pane name="入选人员" tab="入选人员">
          <n-alert type="info" :bordered="false">
            发放offer的简历都会显示在这里哦！
          </n-alert>
          <seeker-card></seeker-card>
          <seeker-card></seeker-card>
          <seeker-card></seeker-card>
          <seeker-card></seeker-card>
        </n-tab-pane>


      </n-tabs>
    </n-card>
  </AppPage>
</template>

<style scoped>

.pdfobject-container {
  height: 900px;
  width: 720px;
  border: 1px solid #ccc;
}

.button-container {
  text-align: right;
  margin-bottom: 10px; /* 根据需要调整间隔 */
}
</style>
