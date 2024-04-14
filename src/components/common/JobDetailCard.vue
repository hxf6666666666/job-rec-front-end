<script setup>
import { computed, defineProps, ref } from 'vue'
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

const props = defineProps({
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
});

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
const splitSkills = computed(()=>{
  return props.skills ? String(props.skills).split(',') : []
});
const splitCharacters = computed(()=>{
  return props.characters ? String(props.characters).split(',') : []
});

const majors = ref(['计算机科学与技术','软件工程','医学信息工程','人工智能','自动化'])


</script>

<template>
  <n-card id="job-detail" class="mt-5 w-720px" embedded hoverable>
    <div class="mb-12 text-23" style="font-family: 微软雅黑; font-weight: bold">{{ props.title }}</div>
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
              <span class="text-16 mr-12">{{ company }}</span>
              <p class="opacity-60">{{ address }}</p>
            </div>
          </div>
        </n-space>


    <n-divider></n-divider>
    <div class="mt-15 ml-12">
      <span class="title text-20 font-extrabold">基本信息</span>
    </div>


    <div class="flex mb-15">
      <div class="w-[50%]">
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">所开薪资:</span><span class="text-14 ml-12 font-extrabold color-red">{{ props.salaryLower }}-{{ props.salaryUpper }}K·{{ props.salaryUnit }}薪</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">经验要求:</span><span class="text-14 ml-12 font-extrabold">{{ renderExp }}</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">最低学历要求:</span><span class="text-14 ml-12 font-extrabold">{{ renderEdu }}</span>
        </div>
      </div>
      <div class="w-[50%]">
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">职位类别:</span><span class="text-14 ml-12 font-extrabold">{{ renderType }}</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">城市:</span><span class="text-14 ml-12 font-extrabold">{{ props.city }}</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">职位类别:</span><span class="text-14 ml-12 font-extrabold">{{ renderIndustry }}</span>
        </div>
      </div>
    </div>

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">职位描述</span>
    </div>

    <div>
      <n-space class="mt-18">
        <div class="ml-15">
          <div class="mt-7 flex text-15">
            {{ props.description }}
          </div>
        </div>
      </n-space>
    </div>

<!--    <div class="ml-12 mt-15">-->
<!--      <span class="title text-20 font-extrabold">AI说职位</span>-->
<!--    </div>-->
<!--    <div class="mt-15">-->
<!--      <div class="mt-15">-->
<!--        <n-tag v-for="major in majors" :key="major" class="ml-12 mt-4" type="success">-->
<!--          {{ major }}-->
<!--        </n-tag>-->
<!--      </div>-->
<!--    </div>-->

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">技能标签</span>
    </div>

    <div class="mt-15">
      <div class="mt-15">
        <n-tag v-for="skill in splitSkills" :key="skill" class="ml-12 mt-4" type="info">
          {{ skill }}
        </n-tag>
      </div>
    </div>


    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">素养标签</span>
    </div>

    <div class="mt-15">
      <div class="mt-15">
        <n-tag v-for="suyang in splitCharacters" :key="suyang" class="ml-12 mt-4" type="error">
          {{ suyang }}
        </n-tag>
      </div>
    </div>

  </n-card>
</template>

<style scoped>
.title {
  font-size: 20px;
  margin-bottom: 10px;
  position: relative; /* 为伪元素定位做准备 */
}

.title::after {
  content: ""; /* 伪元素需要content属性 */
  position: absolute; /* 绝对定位 */
  left: 0;
  bottom: -10px; /* 调整到span下方 */
  width: 100%; /* 宽度与span相同 */
  height: 4px; /* 高度根据需要调整 */
  background-image: url('src/assets/images/line.png'); /* 替换为你的图片URL */
  background-repeat: repeat-x;
  background-size: 100% 100%; /* 背景图片大小填满整个伪元素 */
}
</style>
