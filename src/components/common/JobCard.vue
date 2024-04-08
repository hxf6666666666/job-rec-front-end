<script setup>
import { ref, defineProps, computed } from 'vue';
import JobDetailCard from '@/components/common/JobDetailCard.vue';

const props = defineProps({
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


const isApplied = ref(false);
const show = ref(false);

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
const splitSkills = props.skills ? props.skills.split(',') : [];
const splitCharacters = props.characters ? props.characters.split(',') : [];
</script>

<template>
  <div class="flex" style="width: 1000px">
    <n-card :title="props.title" size="small" class="mt-20 w-[100%]" embedded hoverable @click="handleOpenJobCard">
      <template #header-extra>
        <n-button size="tiny" :type="isApplied ? 'error' : 'success'" @click.stop="isApplied = !isApplied" class="mr-12">
          {{ isApplied ? '取消' : '投递' }}
        </n-button>
        <div @click.stop>
          <n-rate size="large" count="1" clearable/>
        </div>
      </template>
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
        <div class="ml-20">
          <div class="items-center">
            <span class="text-16 mr-12">{{ props.company }}</span>
            <p class="opacity-60">{{ props.address }}</p>
          </div>
        </div>
      </n-space>
    </n-card>

    <n-drawer v-model:show="show" :width="760" show-mask="true">
      <n-drawer-content :native-scrollbar="false">
        <job-detail-card></job-detail-card>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped>
/* 样式可以根据需要添加 */
</style>
