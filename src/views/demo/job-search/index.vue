<script setup>
import { AppPage } from '@/components/index.js'
import JobCard from '@/components/common/JobCard.vue'
import api from './api.js'

defineOptions({ name: 'JobSearch' })

import { ref } from 'vue';
import { NButton } from 'naive-ui'

const searchName = ref();
const city_value = ref();
const type_value1 = ref();
const type_value2 = ref();
const edu_value = ref();
const salary_value = ref();
const exp_value = ref();

const edus = ref([
  { value: 0, label: "不限" },
  { value: 1, label: "大专" },
  { value: 2, label: "本科" },
  { value: 3, label: "硕士" },
  { value: 4, label: "博士" },
]);

const salaries = ref([
  { value: 0, label: "3K以下" },
  { value: 1, label: "3-5K" },
  { value: 2, label: "5-10K" },
  { value: 3, label: "10-20K" },
  { value: 4, label: "20-50K" },
  { value: 5, label: "50K以上" },
]);

const exps = ref([
  { value: 0, label: "应届生" },
  { value: 1, label: "经验不限" },
  { value: 2, label: "1年以内" },
  { value: 3, label: "1-3年" },
  { value: 4, label: "3-5年" },
  { value: 5, label: "5-10年" },
  { value: 6, label: "10年以上" },
]);

const type2 = [
  { label: "后端开发/Java/C/C++/PHP/Python/C#/Golang/全栈", value: 1 },
  { label: "移动开发工程师", value: 2 },
  { label: "前端开发工程师", value: 3 },
  { label: "测试工程师/软件测试", value: 4 },
  { label: "运维/技术支持", value: 5 },
  { label: "人工智能/算法", value: 6 },
  { label: "销售技术支持", value: 7 },
  { label: "大数据/数据分析/数据", value: 8 },
  { label: "IT培训", value: 9 },
  { label: "软件工程师", value: 10 },
  { label: "硬件/电子/电气", value: 11 },
  { label: "暂无分类", value: 12 },
];

const types1 = [
  { value: 0, label: "全职" },
  { value: 1, label: "实习" },
];

const cities = [
  { value: "北京", label: "北京" },
  { value: "上海", label: "上海" },
  { value: "广州", label: "广州" },
  { value: "重庆", label: "重庆" },
  { value: "深圳", label: "深圳" },
  { value: "天津", label: "天津" },
  { value: "武汉", label: "武汉" },
  { value: "成都", label: "成都" },
  { value: "杭州", label: "杭州" },
  { value: "南京", label: "南京" },
  { value: "西安", label: "西安" },
  { value: "青岛", label: "青岛" },
  { value: "郑州", label: "郑州" },
  { value: "苏州", label: "苏州" }
];

const searchQuery = ref('');
const currentPage = ref(1); // 当前页码，默认为第一页
const pageSize = 15; // 每页显示的数据条数

// 其他数据及选项省略...

const jobList = ref([]);
const totalJobs = ref(10);

// 执行搜索操作
const performSearch = async () => {
  const params = {
    jobName: searchName.value,
    jobType: type_value1.value,
    city: city_value.value,
    industryId: type_value2.value,
    workTimeType: exp_value.value,
    salary: salary_value.value,
    educationType: edu_value.value,
    page: currentPage.value, // 将当前页码作为参数传递给后端
    pageSize: pageSize, // 每页数据条数也作为参数传递给后端
  };
  try {
    const response = await api.read(params);
    jobList.value = response.data.content;
    totalJobs.value = response.data.totalElements; // 假设后端返回总数据条数

  } catch (error) {
    console.error('Error searching jobs:', error);
  }
};

onMounted(()=>{
  performSearch()
})

// 监听分页控件的事件，切换当前页码
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  performSearch(); // 切换页码时重新搜索并获取新的数据
};

const clearSelection = ()=> {
  type_value1.value = null; // 清空求职类型选中状态
  city_value.value = null; // 清空城市和区域选中状态
  searchName.value = '';
  type_value2.value = null;
  edu_value.value = null;
  salary_value.value = null;
  exp_value.value = null;
}

</script>

<template>
  <AppPage class="items-center" title="职位搜索">
    <div style="width: 1000px">
      <n-card class="mt-10 mr-10" embedded title="">
        <n-input-group>
          <n-input round size="large" v-model:value="searchName" placeholder="请输入职位名">
            <template #prefix>
              <n-icon i-fe:search />
            </template>
          </n-input>
          <n-button type="error" round size="large" @click="clearSelection">
            清空
          </n-button>
          <n-button type="info" round size="large" @click="performSearch">
            搜索
          </n-button>
        </n-input-group>

        <h3 class="mt-14 ml-12 color-primary underline">求职类型</h3>

        <n-radio-group class="mt-10 ml-12" size="small" v-model:value="type_value1">
          <n-radio-button
            v-for="type in types1"
            :key="type.value"
            :value="type.value"
            :label="type.label"
          >
          </n-radio-button>
        </n-radio-group>

        <h3 class="mt-14 ml-12 color-primary underline">城市和区域</h3>

        <n-radio-group class="mt-10 ml-12" size="small" v-model:value="city_value">
          <n-radio-button
            v-for="city in cities"
            :key="city.value"
            :value="city.value"
            :label="city.label"
          >
          </n-radio-button>
        </n-radio-group>

        <h3 class="mt-14 ml-12 color-primary underline">更多筛选条件</h3>
        <div class="flex">
          <n-select class="mt-10 ml-12 w-4xl" clearable placeholder="职位类型" v-model:value="type_value2" :options="type2" />
          <n-select class="mt-10 ml-12 w-4xl" clearable placeholder="工作经验" v-model:value="exp_value" :options="exps" />
          <n-select class="mt-10 ml-12 w-4xl" clearable placeholder="薪资待遇" v-model:value="salary_value" :options="salaries" />
          <n-select class="mt-10 ml-12 w-4xl" clearable placeholder="学历要求" v-model:value="edu_value" :options="edus" />
        </div>
      </n-card>
    </div>
    <div v-for="(job, index) in jobList" :key="index">
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
    <n-pagination
      class="mt-15"
      v-if="totalJobs > 0"
      v-model:page="currentPage"
      :page-count="Math.ceil(totalJobs / pageSize)"
      @update:page="performSearch"
      simple
    />
  </AppPage>
</template>

<style scoped>
.underline {
  text-decoration: underline;
  text-decoration-skip-ink: auto; /* 这将使下划线避开字母的降部，从而增加与文字的距离 */
  text-underline-offset: 8px; /* 这是增加下划线与文字之间垂直距离的方法 */
}

</style>
