<script setup>
import { AppPage } from '@/components/index.js'
import SeekerRec from '@/components/common/SeekerRec.vue'
import JobDetailCard from '@/components/common/JobDetailCard.vue'
import SeekerCard from '@/components/common/SeekerCard.vue'
import api from '@/components/common/api.js'
import submitForm from '@/components/common/JobForm.vue'

const route = useRoute()

const jobId = ref(parseInt(route.params.id, 10))

const job = reactive({
  title: String,
  exp: Number,
  edu: Number,
  city: String,
  type1: Number,
  company: String,
  address: String,
  skills: String,
  description: String,
  characters: String,
  industry: Number,
  salaryLower: String,
  salaryUpper: String,
  salaryUnit: String,
  link: String
});


onMounted(async() => {
  try {
    const response = await api.getJobById(jobId.value)
    const row = response.data
    job.title = row.jobName;
    job.exp = row.workTimeType;
    job.edu = row.educationType;
    job.city = row.city;
    job.type1 = row.jobType;
    job.company = row.companyName;
    job.address = row.jobAddress;
    job.skills = row.jobSkills;
    job.description = row.jobDescription;
    job.characters = row.jobPersonality;
    job.industry = row.industryId;
    job.salaryLower = row.salaryLower;
    job.salaryUpper = row.salaryUpper;
    job.salaryUnit = row.salaryUnit;
    job.link = row.link;
  } catch (error) {
    console.error('Error:', error);
  }
});
// 初始的 tabs value 值
const initialTabsValue = '职位卡片'; // 这里需要设置初始的 tabs value

// 创建一个 ref 来存储 tabs 的 value
const tabsValue = ref(initialTabsValue);

// 尝试从 localStorage 恢复 tabs value 数据
const savedTabsValue = localStorage.getItem('tabsValue');
if (savedTabsValue) {
  tabsValue.value = savedTabsValue;
}

// 使用 watch 监听 tabsValue 的变化，并将其保存到 localStorage
watch(tabsValue, (newValue) => {
  localStorage.setItem('tabsValue', newValue);
});

</script>

<template>
  <AppPage>
    <n-card>
      <n-tabs :bar-width="100" animated class="items-center" default-value="职位卡片" tab-style="font-size:17px; font-weight:bold;"
              type="bar">

        <!--  一个问题是，boss直聘似乎不允许使用iframe嵌入他们的页面(code 400)，智联招聘、猎聘网可以，但数据集都是boss直聘 -->
        <n-tab-pane name="原始链接" tab="原始链接">
          <n-alert type="warning">BOSS直聘不允许嵌入显示（故仅展示主页），智联招聘、猎聘网等可以正常显示！</n-alert>
          <div class="flex justify-center w-1100 mt-15">
            <iframe
              :src="job.link?.includes('zhipin') ? 'https://www.zhipin.com/' : job.link"
              width="100%"
              height="600"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </n-tab-pane>

        <n-tab-pane name="修改职位" tab="修改职位">
          <n-card embedded>
            <job-form
              :id="jobId"
              :title="job.title"
              :exp="job.exp"
              :edu="job.edu"
              :city="job.city"
              :type1="job.type1"
              :industry="job.industry"
              :company="job.company"
              :address="job.address"
              :skills="job.skills"
              :link="job.link"
              :description="job.description"
              :characters="job.characters"
              :salaryLower="job.salaryLower"
              :salaryUpper="job.salaryUpper"
              :salaryUnit="job.salaryUnit"
            ></job-form>
          </n-card>
        </n-tab-pane>


        <n-tab-pane name="职位卡片" tab="职位卡片">
          <div class="button-container">
            <n-button v-print="'#job-detail'" size="tiny" type="info">导出为PDF</n-button>
          </div>
          <job-detail-card
            v-if="job"
            :title="job.title"
            :exp="job.exp"
            :edu="job.edu"
            :city="job.city"
            :type1="job.type1"
            :industry="job.industry"
            :company="job.company"
            :address="job.address"
            :skills="job.skills"
            :description="job.description"
            :characters="job.characters"
            :salaryLower="job.salaryLower"
            :salaryUpper="job.salaryUpper"
            :salaryUnit="job.salaryUnit">
          </job-detail-card>
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
