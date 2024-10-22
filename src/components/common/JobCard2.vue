<script setup>
import { ref, defineProps, computed } from 'vue';
import JobDetailCard from '@/components/common/JobDetailCard.vue'
import api from './api.js'

const title = ref("网络工程师")
const exp = ref('3年以上')
const edu = ref('大专')
const city = ref('北京')
const type1 = ref('全职')
const zhaopinzhe = ref('刘女士')
const company = ref('汉博利特（北京）信息技术有限公司')
const address = ref('北京通州区金融街园中园6号院53号楼')
const skills = ref(['网络安全', '调试', 'VPN'])
const knowledges = ref(['云计算', '计算机', 'VPN'])
const characters = ref(['积极', '学习能力', '沟通', '分析', '团队', '合作', '抗压', '热情'])
const isApplied = ref(false)
const show = ref(false)

const props = defineProps({
  id: Number,
  title: String,
  exp: Number,
  edu: Number,
  city: String,
  type1: Number,
  company: String,
  address: String,
  skills: String,
  characters: String,
  industry: Number,
  salaryLower: String,
  salaryUpper: String,
  salaryUnit: String,
});

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

const edus = ref([
  { value: 0, label: "学历不限" },
  { value: 1, label: "大专" },
  { value: 2, label: "本科" },
  { value: 3, label: "硕士" },
  { value: 4, label: "博士" },
]);


const handleOpenJobCard = async (id)=>{
  try {
    const response = await api.getJobById(id)
    console.log("hi"+response.data)
    // 假设response.data是一个包含职位信息的对象
    const row = response.data
    show.value = !show.value
    // 使用解构赋值将row中的值赋给job
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
  } catch (error) {
    console.error('Error:', error);
  }
}

const job = {
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
};


// 定义计算属性来根据 value 值返回 label
const getLabel = (value, array) => {
  const item = array.find(item => item.value === value);
  return item ? item.label : '未知';
};

const renderExp = computed(() => {
  return getLabel(props.exp, exps.value);
});

const renderType = computed(() => {
  return getLabel(props.type1, types1);
});

const renderEdu = computed(() => {
  return getLabel(props.edu, edus.value);
});

const renderIndustry = computed(() => {
  return getLabel(props.industry, type2);
});

// 分割字符串并转为数组
const splitSkills = ref(props.skills ? String(props.skills).split(',') : []);
const splitCharacters = ref(props.characters ? String(props.characters).split(',') : []);
</script>

<template>
  <div class="flex" style="width: 1000px">
    <n-card :header-style="{ fontSize: '20px' }" :title="props.title" size="small" class="mt-20 w-[100%]" embedded hoverable @click="handleOpenJobCard(props.id)">
      <n-space align="center" class="mb-12">
        <div class="items-center">
          <span class="text-18 color-error">{{ props.salaryLower }}-{{ props.salaryUpper }}K·{{ props.salaryUnit }}薪</span>
          <span class="text-18 ml-12">
            <n-tag :bordered="false">{{ renderExp }}</n-tag>
          </span>
          <span class="text-18 ml-12">
            <n-tag :bordered="false">{{ renderEdu }}</n-tag>
          </span>
          <span class="text-18 ml-12">
            <n-tag :bordered="false" type="info">{{ renderType }}</n-tag>
          </span>
          <span class="text-18 ml-12">
            <n-tag v-show="props.city" :bordered="false" type="success">{{ props.city }}</n-tag>
          </span>
        </div>
      </n-space>

      <n-space align="center" class="mb-12">
        <div class="items-center">
          <n-tag class="mr-4" round size="small" type="primary">
            {{ renderIndustry }}
          </n-tag>
          <n-tag v-for="skill in splitSkills" :key="skill" :bordered="false" class="mr-4 mt-4" round size="small" type="info">
            {{ skill }}
          </n-tag>
          <n-tag v-for="character in splitCharacters" :key="character" :bordered="false" class="mr-4" round size="small" type="error">
            {{ character }}
          </n-tag>
        </div>
      </n-space>

      <n-space align="center">
        <img alt="" object-contain size="45" src="/src/assets/images/logo.png" />
        <div class="ml-5">
          <div class="items-center">
            <span class="text-16 mr-12">{{ props.company }}</span>
            <p class="opacity-60">{{ props.address }}</p>
          </div>
        </div>
      </n-space>
    </n-card>

    <n-drawer v-model:show="show" :width="760" show-mask="true">
      <n-drawer-content :native-scrollbar="false">
        <job-detail-card
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
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped>

</style>
