<script setup>

import { NButton, NRate } from 'naive-ui'
import SeekerCard from '@/components/common/SeekerCard.vue'
import api from './api.js'
import { ref } from 'vue'
const route = useRoute()
const jobId = ref(parseInt(route.params.id, 10))

const seekerList = ref([
  {
    id: 2,
    avatar: '',
    resumeIntegrity: 0,
    userId: 0,
    realName: '',
    gender: 0,
    age: 0,
    dateOfBirth: '',
    city: '',
    address: '',
    userPhone: '',
    email: '',
    qqNumber: '',
    wechat: '',
    skillTag: '',
    awardTag: '',
    personalityTag: '',
    advantage: '',
    workExperienceYear: 0,
    englishTag: '',
    createTime: '',
    updateTime: '',
    educationExperiences: [
      {
        schoolName: '',
        majorName: '',
        gpa: '',
        beginYear: '',
        endYear: '',
        activity: '',
        educationType: 2,
        ranking: '',
        schoolType: '',
      }
    ]
  }
]);

const performSearch = async () => {
  $message.loading('生成推荐结果中，请稍候...', { key: 'access', duration: 200000 })
  try {
    const response = await api.seekerrec(parseInt(route.params.id, 10))
    seekerList.value = response.data
    console.log(seekerList.value);
    $message.success('成功生成推荐结果，请查看', { key: 'access' })
  } catch (error) {
    $message.destroy('access')
    console.error('Error', error);
  }
};

onMounted(()=>{
  performSearch()
})

const rate = ref(0)
const feedback = ()=>{
  rate.value = 0;
  $message.success('反馈成功，感谢您的支持！')
}


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
    value: "985", label: "985"
  },
  {
    value: "211", label: "211"
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
  <div class="button-container">
    <n-button size="tiny" type="success">换一批推荐</n-button>
  </div>
  <div style="width: 900px">
    <n-card class="mt-10 mr-10" embedded hoverable title="">
      <div class="flex justify-center mt-15">
        <n-alert type="info" :bordered="false">
          由职位信息自动生成推荐人选，可进行反馈并换一批推荐，也可修改职位信息重新推荐！
        </n-alert>
      </div>
    </n-card>

    <template v-for="seeker in seekerList" :key="seeker.id" v-if="seekerList.length>0">
      <seeker-card
        :recruitment-id="jobId"
        :id="seeker.id"
        :user-id="seeker.userId"
        :real-name="seeker.realName"
        :avatar="seeker.avatar"
        :gender="seeker.gender"
        :age="seeker.age"
        :date-of-birth="seeker.dateOfBirth"
        :city="seeker.city"
        :address="seeker.address"
        :user-phone="seeker.userPhone"
        :email="seeker.email"
        :qq-number="seeker.qqNumber"
        :wechat="seeker.wechat"
        :skill-tag="seeker.skillTag"
        :award-tag="seeker.awardTag"
        :personality-tag="seeker.personalityTag"
        :advantage="seeker.advantage"
        :work-experience-year="seeker.workExperienceYear"
        :english-tag="seeker.englishTag"
        :education-experiences="seeker.educationExperiences"
      />
    </template>

  </div>

  <div class="flex mt-15">
    <n-card title="推荐反馈" size="small">
      <n-alert type="info" title="该推荐结果是否令您满意？">
        <n-rate size="small" v-model:value="rate"/><n-button class="ml-10" type="info" size="tiny" @click="feedback">提交反馈</n-button>
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
.button-container {
  text-align: right;
  margin-bottom: 10px; /* 根据需要调整间隔 */
}

</style>
