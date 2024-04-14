<script setup>
import { sleep } from '@/utils'
import { computed, defineProps, ref } from 'vue'
import api from './api.js'

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
  { label: "暂无分类", value: 12 }
];

const options = ref([
  { value: 0, label: "不限" },
  { value: 1, label: "大专" },
  { value: 2, label: "本科" },
  { value: 3, label: "硕士" },
  { value: 4, label: "博士" },
])

const loading = ref(false)

const exps = ref([
  {
    value: 0, label: "应届生"
  },
  {
    value: 1, label: "经验不限"
  },
  {
    value: 2, label: "1年以内"
  },
  {
    value: 3, label: "1-3年"
  },
  {
    value: 4, label: "3-5年"
  },
  {
    value: 5, label: "5-10年"
  },
  {
    value: 6, label: "10年以上"
  },
])

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
  description: String,
  characters: String,
  industry: Number,
  salaryLower: String,
  salaryUpper: String,
  salaryUnit: String,
  link: String,
});

const formData = ref({
  id: props.id,
  jobName: props.title,
  userId: props.userId,
  educationType: props.edu,
  city: props.city,
  workTimeType: props.exp,
  jobType: props.type1,
  companyName: props.company,
  jobAddress: props.address,
  jobSkills: props.skills,
  jobDescription: props.description,
  jobPersonality: props.characters,
  industryId: props.industry,
  salaryLower: props.salaryLower,
  salaryUpper: props.salaryUpper,
  salaryUnit: props.salaryUnit,
  link: props.link,
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

const songs = ref([
  {
    value: 1,
    label: "实习"
  },
  {
    value: 0,
    label: "全职"
  },
])

function notify(type) {
  $notification[type]({
    content: '更新成功',
    meta: '更新成功',
    duration: 2500,
    keepAliveOnHover: true,
  })
}

const submitForm = async () => {
  const d = $dialog.warning({
    content: '确定更新？',
    title: '提示',
    positiveText: '确定',
    negativeText: '取消',
    async onPositiveClick() {
      try {
        d.loading = true
        const response = await api.update(formData.value);
        $message.success('更新成功')
        // 使用 setTimeout 延迟1秒后刷新页面
        d.loading = false;
        setTimeout(() => {
          history.go(0); // 刷新当前页面
        }, 1000); // 延迟1秒
      } catch (error) {
        d.loading = false
        $message.error('更新失败')
      }
    },
  })
};

</script>




<template>
  <div class="button-container float-right">
    <n-button size="tiny" @click="submitForm" type="warning">提交修改</n-button>
  </div>
  <br>
  <n-form class="mt-15">
    <div class="flex">
      <n-form-item class="w-50%" label="职位名称（必填）" :rule="{ required: true }">
        <n-input v-model:value="formData.jobName"/>
      </n-form-item>

      <n-form-item class="w-50% ml-15" label="职位类别（必填）" :rule="{ required: true }">
        <n-select class="ml-12" clearable placeholder="职位类别" v-model:value="formData.industryId" :options="type2" />
      </n-form-item>
    </div>

    <div class="flex">
      <n-form-item class="w-33%" label="最低学历要求">
        <n-select v-model:value="formData.educationType" placeholder="学历要求" :options="options"/>
      </n-form-item>

      <n-form-item class="w-33% ml-15" label="最低工作年限要求">
        <n-select clearable placeholder="工作经验" v-model:value="formData.workTimeType" :options="exps" />
      </n-form-item>

      <n-form-item class="w-33% ml-15" label="是否实习（必填）" :rule="{ required: true }">
        <n-radio-group v-model:value="formData.jobType" name="radiogroup">
          <n-space>
            <n-radio v-for="song in songs" :key="song.value" :value="song.value">
              {{ song.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
    </div>

    <div class="flex">
      <n-form-item class="w-70%" label="工资上下限（单位：K）（必填）" :rule="{ required: true }">
        <n-space vertical>
          <n-space>
            <n-input-number v-model:value="formData.salaryLower" size="small" :min="0" :max="100" placeholder="下限"/>
            <n-input-number v-model:value="formData.salaryUpper" size="small" :min="0" :max="100" placeholder="上限"/>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item class="w-30% ml-10" label="薪数">
        <n-input-number v-model:value="formData.salaryUnit" size="small" :min="12" placeholder="薪数，默认12"/>
      </n-form-item>
    </div>

    <n-form-item label="职位描述（必填）" :rule="{ required: true }" class="w-760">
      <n-input v-model:value="formData.jobDescription" type="textarea"
               maxlength="1000" show-count clearable
               :autosize="{ minRows: 6 }"
      />
    </n-form-item>

    <n-form-item label="公司名称">
      <n-input v-model:value="formData.companyName"/>
    </n-form-item>

    <n-form-item label="原始链接">
      <n-input v-model:value="formData.link"/>
    </n-form-item>

    <n-form-item label="岗位地址">
      <n-input v-model:value="formData.city" placeholder="输入城市名"/>
      <n-input class="ml-15" v-model:value="formData.jobAddress" placeholder="输入详细地址"/>
    </n-form-item>

  </n-form>
</template>

<style scoped>
.button-container {
  text-align: right;
  margin-bottom: 10px; /* 根据需要调整间隔 */
}
</style>
