<script setup>
import { useUserStore } from '@/store/index.js'
import JobDetailCard from '@/components/common/JobDetailCard.vue'
import ResumeCard from '@/components/common/ResumeCard.vue'
const userStore = useUserStore()

const props = defineProps({
  avatar: {
    type: String,
    default: ""
  },
  realName: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    required: true
    // 1: 男性, 2: 女性
  },
  age: {
    type: Number,
    default: 0
  },
  dateOfBirth: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  userPhone: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  qqNumber: {
    type: String,
    default: ""
  },
  wechat: {
    type: String,
    default: ""
  },
  skillTag: {
    type: String,
    default: ""
  },
  awardTag: {
    type: String,
    default: ""
  },
  personalityTag: {
    type: String,
    default: ""
  },
  advantage: {
    type: String,
    default: ""
  },
  workExperienceYear: {
    type: String,
    default: 0
  },
  englishTag: {
    type: String,
    default: ""
  },
  createTime: {
    type: String,
    default: ""
  },
  updateTime: {
    type: String,
    default: ""
  },
  educationExperiences: {
    type: Array,
    default: () => [
      {
        schoolName: "",
        majorName: "",
        gpa: "",
        beginYear: null,
        endYear: null
      }
    ]
  }
});

onMounted(()=>{
})



const awards = computed(()=>{
  return props.awardTag ? String(props.awardTag).split(',') : []
});

const skills = computed(()=>{
  return props.skillTag ? String(props.skillTag).split(',') : []
});

const suyangs = computed(()=>{
  return props.personalityTag ? String(props.personalityTag).split(',') : []
});

const vImg = ref('data:image/png;base64,'+ props.avatar)

// 计算属性：根据 educationType 返回对应的学历文字描述
const formattedEducationType = computed(() => {
  const educationType = props.educationExperiences[0]?.educationType || 0; // 获取第一个教育经历的学历类型
  switch (educationType) {
    case 1:
      return '专科'; // 对应学历类型 1
    case 2:
      return '本科'; // 对应学历类型 2
    case 3:
      return '硕士'; // 对应学历类型 3
    case 4:
      return '博士'; // 对应学历类型 4
    default:
      return '未知'; // 其他未知类型
  }
});
const isApplied = ref(false)
const show = ref(false)

</script>

<template>
  <n-card id="resume" title=" " class="mt-15" size="small" embedded hoverable @click="show=!show">
    <template #header-extra>
      <n-button size="tiny" :type="isApplied ? 'error' : 'info'" @click.stop="isApplied = !isApplied" class="mr-12">
        {{ isApplied ? '取消' : '发放offer' }}
      </n-button>
      <div @click.stop>
        <n-rate size="large" count="1" clearable/>
      </div>
    </template>
    <div class="flex">
      <div class="w-16%">
        <n-avatar fallback-src="https://q2.itc.cn/q_70/images03/20240312/519714591a8241b884f21e37b54d4319.jpeg"
                 round :size="100" :src="vImg" object-fit="fill" class=" mt-15 ml-15" />
      </div>


      <div class="w-84% mt-15">

        <div>
          <span class="text-23" style="font-family: 微软雅黑; font-weight: bold">{{ props.realName }}</span>
          <span v-if="props.educationExperiences[0].schoolName" class="ml-15">
            <n-tag :bordered="false" size="small" type="primary">
              {{ props.educationExperiences[0].schoolName }}
            </n-tag>
          </span>

          <span v-if="props.educationExperiences[0].majorName" class="ml-10">
            <n-tag :bordered="false" size="small" type="default">
              {{ props.educationExperiences[0].majorName }}
            </n-tag>
          </span>

          <span v-if="props.englishTag.includes('4')&&!englishTag.includes('6')" class="ml-10">
            <n-tag :bordered="false" size="small" type="info">
              CET4
            </n-tag>
          </span>

          <span v-if="englishTag.includes('6')" class="ml-10">
            <n-tag :bordered="false" size="small" type="info">
              CET6
            </n-tag>
          </span>

        </div>

        <div class="mt-10">

          <span v-if="skillTag.length>100&&skillTag.length<=150" class="mr-10">
            <n-tag :bordered="false" size="medium" type="info">
              <template #icon>
              <i class="i-fe:airplay?mask"></i>
              </template>
              技能达标
            </n-tag>
          </span>

          <span v-if="skillTag.length>150" class="mr-10">
            <n-tag :bordered="false" size="medium" type="info">
              <template #icon>
              <i class="i-fe:airplay?mask"></i>
              </template>
              技能精湛
            </n-tag>
          </span>

          <span v-if="awardTag.length>50" class="mr-10">
            <n-tag :bordered="false" size="medium" type="warning">
              <template #icon>
              <i class="i-fe:pen-tool"></i>
            </template>
              奖项丰富
            </n-tag>
          </span>

          <span v-if="educationExperiences[0].gpa>4" class="mr-10">
          <n-tag :bordered="false" size="medium" type="error">
            <template #icon>
              <i class="i-fe:book"></i>
            </template>
            成绩优异
          </n-tag>
          </span>

        </div>
        <div class="mt-10">

        <span v-if="educationExperiences.length>1">
          <n-tag :bordered="false" size="small" type="success" class="mr-10">
            研究生学历
          </n-tag>
        </span>

          <span class="mr-10" v-if="educationExperiences[0].schoolType!=null&&educationExperiences[0].schoolType.includes('985')">
          <n-tag :bordered="false" size="small" type="warning">
            985院校
          </n-tag>
          </span>

          <span class="mr-10" v-if="educationExperiences[0].schoolType!=null&&educationExperiences[0].schoolType.includes('211')">
          <n-tag :bordered="false" size="small" type="warning">
            211院校
          </n-tag>
          </span>

        </div>

        <div class="mt-15">
          <n-tag v-for="skill in skills" :key="skill" class="mr-5 mb-5" type="info" size="small">
            {{ skill }}
          </n-tag>
          <n-tag v-for="suyang in suyangs" :key="suyang" class="mr-5 mb-5" type="error" size="small">
            {{ suyang }}
          </n-tag>
        </div>
        <div class="mt-10">
          <span class="text-14 opacity-70"><i class="i-fe:phone mr-6"></i>{{ props.userPhone.length==0?'暂无':props.userPhone }}</span>
          <span class="text-14 ml-12 opacity-70"><i class="i-fe:mail mr-6"></i>{{ props.email.length==0?'暂无':props.email }}</span>
          <span class="text-14 ml-12 opacity-70"><i class="i-fe:book?mask mr-6"></i>{{ props.workExperienceYear }}年经验</span>
        </div>
      </div>
    </div>
  </n-card>
  <n-drawer v-model:show="show" :width="760" show-mask="true">
    <n-drawer-content :native-scrollbar="false">
      <resume-card
        :avatar="props.avatar"
        :real-name="props.realName"
        :gender="props.gender"
        :age="props.age"
        :date-of-birth="props.dateOfBirth"
        :city="props.city"
        :address="props.address"
        :user-phone="props.userPhone"
        :email="props.email"
        :qq-number="props.qqNumber"
        :wechat="props.wechat"
        :skill-tag="props.skillTag"
        :award-tag="props.awardTag"
        :personality-tag="props.personalityTag"
        :advantage="props.advantage"
        :work-experience-year="props.workExperienceYear"
        :english-tag="props.englishTag"
        :create-time="props.createTime"
        :update-time="props.updateTime"
        :education-experiences="props.educationExperiences"
      />
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
