<script setup>
import JobCard from '@/components/common/JobCard.vue'
import { NButton, NRate } from 'naive-ui'

const city_value = ref('全国')
const type_value1 = ref('不限')
const type_value2 = ref([])
const edu_value = ref([])
const salary_value = ref([])
const exp_value = ref([])
const edus = ref([
  {
    value: '大专',
    label: '大专'
  },
  {
    value: '本科',
    label: '本科'
  },
  {
    value: '硕士',
    label: '硕士'
  },
  {
    value: '博士',
    label: '博士'
  }
])
const salaries = ref([
  {
    value: '3K以下',
    label: '3K以下'
  },
  {
    value: '3-5K',
    label: '3-5K'
  },
  {
    value: '5-10K',
    label: '5-10K'
  },
  {
    value: '10-20K',
    label: '10-20K'
  },
  {
    value: '20-50K',
    label: '20-50K'
  },
  {
    value: '50K以上',
    label: '50K以上'
  }
])
const exps = ref([
  {
    value: '在校生',
    label: '在校生'
  },
  {
    value: '应届生',
    label: '应届生'
  },
  {
    value: '经验不限',
    label: '经验不限'
  },
  {
    value: '1年以内',
    label: '1年以内'
  },
  {
    value: '1-3年',
    label: '1-3年'
  },
  {
    value: '3-5年',
    label: '3-5年'
  },
  {
    value: '5-10年',
    label: '5-10年'
  },
  {
    value: '10年以上',
    label: '10年以上'
  }
])

const types2 = ref([
  {
    value: 'C++',
    label: 'C++'
  },
  {
    value: 'Java',
    label: 'Java'
  },
  {
    value: 'Python',
    label: 'Python'
  },
  {
    value: '软件工程师',
    label: '软件工程师'
  },
  {
    value: '前端',
    label: '前端'
  },
  {
    value: '网络/系统安全',
    label: '网络/系统安全'
  },
  {
    value: '运维/技术支持',
    label: '运维/技术支持'
  },
  {
    value: '教师',
    label: '教师'
  },
  {
    value: '算法',
    label: '算法'
  },
  {
    value: '测试',
    label: '测试'
  },
  {
    value: '硬件',
    label: '硬件'
  },
  {
    value: '销售',
    label: '销售'
  },
  {
    value: '电气',
    label: '电气'
  }, {
    value: '实施',
    label: '实施'
  },
  {
    value: '移动端',
    label: '移动端'
  },
  {
    value: '数据',
    label: '数据'
  },
  {
    value: '后端',
    label: '后端'
  }
])

const types1 = ref([
  {
    value: '不限',
    label: '不限'
  },
  {
    value: '全职',
    label: '全职'
  },
  {
    value: '实习',
    label: '实习'
  }
])

const cities = ref([
  {
    value: '全国',
    label: '全国'
  },
  {
    value: '北京',
    label: '北京'
  },
  {
    value: '上海',
    label: '上海'
  },
  {
    value: '广州',
    label: '广州'
  },
  {
    value: '重庆',
    label: '重庆'
  },
  {
    value: '深圳',
    label: '深圳'
  },
  {
    value: '天津',
    label: '天津'
  },
  {
    value: '武汉',
    label: '武汉'
  },
  {
    value: '成都',
    label: '成都'
  },
  {
    value: '杭州',
    label: '杭州'
  },
  {
    value: '南京',
    label: '南京'
  },
  {
    value: '西安',
    label: '西安'
  },
  {
    value: '青岛',
    label: '青岛'
  },
  {
    value: '郑州',
    label: '郑州'
  },
  {
    value: '苏州',
    label: '苏州'
  },
  {
    value: '其他城市',
    label: '其他城市'
  }
])
</script>

<template>
  <div style="width: 1000px">
    <n-card class="mt-10 mr-10" embedded hoverable title="">
      <div class="flex justify-center mt-15">
        <n-alert type="info" :bordered="false">
          由简历信息自动生成推荐职位，可进行筛选和反馈，也可修改简历重新推荐！
        </n-alert>
      </div>
      <h3 class="mt-14 ml-12 color-primary underline">求职类型</h3>
      <n-radio-group v-model:value="type_value1" class="mt-10 ml-12" default-value="" size="small">
        <n-radio-button
          v-for="type in types1"
          :key="type.value"
          :label="type.label"
          :value="type.value"
        >
        </n-radio-button>
      </n-radio-group>

      <h3 class="mt-14 ml-12 color-primary underline">城市和区域</h3>

      <n-radio-group v-model:value="city_value" class="mt-10 ml-12" default-value="" size="small">
        <n-radio-button
          v-for="city in cities"
          :key="city.value"
          :label="city.label"
          :value="city.value"
        >
        </n-radio-button>
      </n-radio-group>

      <h3 class="mt-14 ml-12 color-primary underline">更多筛选条件</h3>
      <div class="flex">
        <n-select v-model:value="type_value2" :options="types2" class="mt-10 ml-12 w-4xl" clearable multiple
                  placeholder="职位类型" />
        <n-select v-model:value="exp_value" :options="exps" class="mt-10 ml-12 w-4xl" clearable multiple
                  placeholder="工作经验" />
        <n-select v-model:value="salary_value" :options="salaries" class="mt-10 ml-12 w-4xl" clearable
                  placeholder="薪资待遇" />
        <n-select v-model:value="edu_value" :options="edus" class="mt-10 ml-12 w-4xl" clearable multiple
                  placeholder="学历要求" />
      </div>
    </n-card>
  </div>
  <job-card></job-card>
  <job-card></job-card>
  <job-card></job-card>
  <job-card></job-card>
  <job-card></job-card>
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
