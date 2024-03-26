<script setup>

import ResumeCard from '@/components/common/ResumeCard.vue'
import { AppPage } from '@/components/index.js'
import ResumeForm from '@/components/common/ResumeForm.vue'
import JobRec from '@/components/common/JobRec.vue'
import CompetencyAssess from '@/components/common/CompetencyAssess.vue'

const currentRef = ref(1)

</script>

<template>
  <AppPage>
    <n-card>
      <n-tabs :bar-width="100" animated class="items-center" default-value="解析结果" tab-style="font-size:17px; font-weight:bold;"
              type="bar">
        <n-tab-pane name="原始文件" tab="原始文件">
          <div class="button-container">
            <n-button size="tiny" type="success">重新上传</n-button>
          </div>
          <div id="my-pdf" class="flex justify-center">
            <PdfObject :options="{ page: 1 }" url="src/assets/王译_简历.pdf" />
          </div>
        </n-tab-pane>
        <n-tab-pane name="修改简历" tab="修改简历">
          <div class="button-container">
            <n-button v-print="'#resume'" size="tiny" type="warning">提交修改</n-button>
          </div>
          <resume-form></resume-form>
        </n-tab-pane>
        <n-tab-pane name="解析结果" tab="解析结果">
          <div class="button-container">
            <n-button v-print="'#resume'" size="tiny" type="info">导出为PDF</n-button>
          </div>
          <resume-card></resume-card>
        </n-tab-pane>
        <n-tab-pane name="能力评价" tab="能力评价">
          <div class="button-container">
            <n-button class="mr-12" size="tiny" type="info">开始评价</n-button>
            <n-button size="tiny" type="error">导出评价</n-button>
            <div class="mt-8">
              当前评价结果生成时间：
              <n-time :time="time" />
            </div>
          </div>
          <CompetencyAssess></CompetencyAssess>
        </n-tab-pane>
        <n-tab-pane name="职位推荐" tab="职位推荐">
          <div class="button-container">
            <n-button class="mr-12" size="tiny" type="info">开始推荐职位</n-button>
            <n-button size="tiny" type="success">导出为Excel</n-button>
            <div class="mt-8">
              当前推荐结果生成时间：
              <n-time :time="time" />
            </div>
          </div>
          <job-rec></job-rec>
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
