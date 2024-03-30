<script setup>

import JobCard from '@/components/common/JobCard.vue'
import { NButton, NRate } from 'naive-ui'
import SeekerCard from '@/components/common/SeekerCard.vue'
const edu_options = ref([
  {
    value: "大专", label: "大专"
  },
  {
    value: "本科", label: "本科"
  },
  {
    value: "硕士", label: "硕士"
  },
  {
    value: "博士", label: "博士"
  },
])


const school_options = ref([
  {
    value: "双一流", label: "双一流"
  },
  {
    value: "211", label: "211"
  },
  {
    value: "985", label: "985"
  }
])

const exp_options = ref([
  {
    value: "应届生", label: "应届生"
  },
  {
    value: "经验不限", label: "经验不限"
  },
  {
    value: "1年以内", label: "1年以内"
  },
  {
    value: "1-3年", label: "1-3年"
  },
  {
    value: "3-5年", label: "3-5年"
  },
  {
    value: "5-10年", label: "5-10年"
  },
  {
    value: "10年以上", label: "10年以上"
  },
])

</script>

<template>
  <div style="width: 900px">
    <n-card class="mt-10 mr-10" embedded hoverable title="">
      <div class="flex justify-center mt-15">
        <n-alert type="info" :bordered="false">
          由职位信息自动生成推荐人选，可进行筛选和反馈，也可修改职位信息重新推荐！
        </n-alert>
      </div>

      <h3 class="mt-14 ml-12 color-primary underline">学历</h3>

      <n-radio-group class="mt-10 ml-12" size="small" v-model:value="type_value1" default-value="">
        <n-radio-button
          v-for="edu in edu_options"
          :key="edu.value"
          :value="edu.value"
          :label="edu.label"
        >
        </n-radio-button>
      </n-radio-group>


      <h3 class="mt-14 ml-12 color-primary underline">学校</h3>
      <n-radio-group class="mt-10 ml-12" size="small" v-model:value="type_value1" default-value="">
        <n-radio-button
          v-for="school in school_options"
          :key="school.value"
          :value="school.value"
          :label="school.label"
        >
        </n-radio-button>
      </n-radio-group>



      <h3 class="mt-14 ml-12 color-primary underline">工作经验</h3>

      <n-radio-group class="mt-10 ml-12" size="small" v-model:value="type_value1" default-value="">
        <n-radio-button
          v-for="exp in exp_options"
          :key="exp.value"
          :value="exp.value"
          :label="exp.label"
        >
        </n-radio-button>
      </n-radio-group>
    </n-card>

      <seeker-card></seeker-card>
      <seeker-card></seeker-card>
      <seeker-card></seeker-card>
      <seeker-card></seeker-card>
      <seeker-card></seeker-card>
      <seeker-card></seeker-card>

  </div>

  <div class="flex mt-15">
    <n-card title="推荐反馈" size="small">
      <n-alert type="info" title="该推荐结果是否令您满意？">
        <n-rate size="small" /><n-button class="ml-10" type="info" size="tiny">提交反馈</n-button>
      </n-alert>
    </n-card>
  </div>
</template>

<style scoped>
.underline {
  text-decoration: underline;
  text-decoration-skip-ink: auto; /* 这将使下划线避开字母的降部，从而增加与文字的距离 */
  text-underline-offset: 8px; /* 这是增加下划线与文字之间垂直距离的方法 */
}
</style>
