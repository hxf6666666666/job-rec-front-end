<script setup>

import ResumeCard from '@/components/common/ResumeCard.vue'
import { AppPage } from '@/components/index.js'
import ResumeForm from '@/components/common/ResumeForm.vue'
import JobRec from '@/components/common/JobRec.vue'
import CompetencyAssess from '@/components/common/CompetencyAssess.vue'
import api from '@/views/demo/upload(弃用)/api.js'

// function onBeforeUpload({ file }) {
//   if (
//     !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'text/plain', 'image/jpeg', 'image/png'].includes(file.type)) {
//     $message.error('该格式的简历暂不支持');
//     return false;
//   }
//   return true;
// }
// async function handleUpload({ file, onFinish }) {
//   if (!file || !file.type) {
//     $message.error('请选择你的简历文件')
//   }
//
//   let formData = new FormData();
//   formData.append("file", file.file);
//
//   try {
//     // 发送文件到后端
//     const response = await api.uploadResume(formData);
//
//     // 处理后端返回的响应
//     if (response.data) {
//       $message.success(response.data);
//       // 这里可以根据后端返回的数据更新页面的显示状态或者做其他操作
//     } else {
//       $message.error('上传失败');
//     }
//   } catch (error) {
//     $message.error('上传失败：' + error.message);
//   } finally {
//     onFinish();
//   }
// }
</script>

<template>
  <AppPage>
    <n-card>
      <n-tabs :bar-width="100" animated class="items-center" default-value="解析结果" tab-style="font-size:17px; font-weight:bold;"
              type="bar">
        <n-tab-pane name="简历上传" tab="简历上传">
          <n-upload
            class="mx-auto p-20 text-center"
            :custom-request="handleUpload"
            :show-file-list="false"
            accept=".pdf,.docx,.doc,.txt,.jpeg,.png"
            @before-upload="onBeforeUpload"
          >
            <n-upload-dragger>
              <div class="h-150 f-c-c flex-col">
                <i class="i-mdi:upload mb-12 text-68 color-primary" />
                <n-text class="text-24 font-extrabold color-neutral">点击或者拖动文件到该区域</n-text>
                <n-text class="text-16 color-primary">支持简历格式：PDF, DOC, DOCX, TXT, JPEG, PNG</n-text>
              </div>
            </n-upload-dragger>
          </n-upload>
          <div id="my-pdf" class="flex justify-center">
            <PdfObject :options="{ page: 1 }" url="src/assets/王译_简历.pdf" />
          </div>
        </n-tab-pane>
        <n-tab-pane name="在线简历" tab="在线简历">
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
