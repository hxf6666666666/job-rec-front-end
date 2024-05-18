<script setup>
import { useUserStore } from '@/store/index.js'
import api from '@/views/demo/CVDetail/api.js'
const userStore = useUserStore()

const props = defineProps({
  avatar: {
    type: String,
    default: ""
  },
  resumeIntegrity: {
    type: Number,
    default: 0.5
  },
  id: {
    type:Number,
  },
  userId: {
    type: Number,
    default: 0
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

onMounted(async ()=>{
  if(props.id==null){
    $message.info('用户还未上传简历，无法解析简历！')
  }
  vImg.value = 'data:image/png;base64,'+ props.avatar
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
  if(props.educationExperiences==null) return ''
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


</script>

<template>
  <n-card class="mt-5 w-720px" embedded hoverable>
    <div class="flex">
      <div class="w-20%">
        <n-avatar fallback-src="https://5b0988e595225.cdn.sohucs.com/images/20171114/bc48840fb6904dd4bd8f6a8af8178af4.png"
                  :size="100" :src="vImg" object-fit="fill" class="h-130 mt-15 ml-15" />
      </div>


      <div class="w-60% mt-15">

        <div>
          <span class="text-23" style="font-family: 微软雅黑; font-weight: bold">{{ props.realName }}</span>
          <span v-if="props.educationExperiences!=null&&props.educationExperiences[0].schoolName" class="ml-15">
            <n-tag :bordered="false" size="small" type="primary">
              {{ props.educationExperiences[0].schoolName }}
            </n-tag>
          </span>

          <span v-if="props.educationExperiences!=null&&props.educationExperiences[0].majorName" class="ml-10">
            <n-tag :bordered="false" size="small" type="default">
              {{ props.educationExperiences[0].majorName }}
            </n-tag>
          </span>

          <span v-if="props.englishTag!=null&&props.englishTag.includes('4')&&!englishTag.includes('6')" class="ml-10">
            <n-tag :bordered="false" size="small" type="info">
              CET4
            </n-tag>
          </span>

          <span v-if="props.englishTag!=null&&englishTag.includes('6')" class="ml-10">
            <n-tag :bordered="false" size="small" type="info">
              CET6
            </n-tag>
          </span>

        </div>

        <div class="mt-10">

          <span v-if="skillTag!=null&&skillTag.length>100&&skillTag.length<=150" class="mr-10">
            <n-tag :bordered="false" size="medium" type="info">
              <template #icon>
              <i class="i-fe:airplay?mask"></i>
              </template>
              技能达标
            </n-tag>
          </span>

          <span v-if="skillTag!=null&&skillTag.length>150" class="mr-10">
            <n-tag :bordered="false" size="medium" type="info">
              <template #icon>
              <i class="i-fe:airplay?mask"></i>
              </template>
              技能精湛
            </n-tag>
          </span>

          <span v-if="awardTag!=null&&awardTag.length>50" class="mr-10">
            <n-tag :bordered="false" size="medium" type="warning">
              <template #icon>
              <i class="i-fe:pen-tool"></i>
            </template>
              奖项丰富
            </n-tag>
          </span>

          <span v-if="props.educationExperiences!=null&&props.educationExperiences[0].gpa>4" class="mr-10">
          <n-tag :bordered="false" size="medium" type="error">
            <template #icon>
              <i class="i-fe:book"></i>
            </template>
            成绩优异
          </n-tag>
          </span>

        </div>
        <div class="mt-10">

        <span v-if="props.educationExperiences!=null&&props.educationExperiences.length>1">
          <n-tag :bordered="false" size="small" type="success" class="mr-10">
            研究生学历
          </n-tag>
        </span>

          <span class="mr-10" v-if="props.educationExperiences!=null&&props.educationExperiences[0].schoolType!=null&&props.educationExperiences[0].schoolType.includes('985')">
          <n-tag :bordered="false" size="small" type="warning">
            985院校
          </n-tag>
          </span>

          <span class="mr-10" v-if="props.educationExperiences!=null&&props.educationExperiences[0].schoolType!=null&&props.educationExperiences[0].schoolType.includes('211')">
          <n-tag :bordered="false" size="small" type="warning">
            211院校
          </n-tag>
          </span>

        </div>
        <div class="mt-10">
          <span class="text-14 opacity-70"><i class="i-fe:phone mr-6"></i>{{ props.userPhone!=null?'暂无':props.userPhone }}</span>
          <span class="text-14 ml-12 opacity-70"><i class="i-fe:mail mr-6"></i>{{ props.email!=null?'暂无':props.email }}</span>
          <span class="text-14 ml-12 opacity-70"><i class="i-fe:book?mask mr-6"></i>{{ props.workExperienceYear }}年经验</span>
        </div>
      </div>

      <div class="w-20% mt-84">
        <n-progress
          :height="12"
          :percentage="Math.ceil(props.resumeIntegrity * 100)" processing
          type="line">
        </n-progress>
        <span class="text-14 ml-12">简历完善度</span>
      </div>

    </div>
    <n-divider></n-divider>
    <div class="mt-15 ml-12">
      <span class="title text-20 font-extrabold">基本信息</span>
    </div>


    <div class="flex mb-15">
      <div class="w-[50%]">
        <div class="ml-15 mt-15">
          <span class="text-14 opacity-80">姓名:</span><span class="text-14 ml-12 font-extrabold">{{ props.realName }}</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">性别:</span><span class="text-14 ml-12 font-extrabold">{{ props.gender==null?'未知':(props.gender==0?'女':'男') }}</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">出生年月:</span><span class="text-14 ml-12 font-extrabold">{{ props.dateOfBirth!=null?'暂无':props.dateOfBirth }}</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">QQ:</span><span class="text-14 ml-12 font-extrabold">{{ props.qqNumber!=null?'暂无':props.qqNumber }}</span>
        </div>
      </div>
      <div class="w-[50%]">
        <div class="ml-15 mt-15">
          <span class="text-14 opacity-80">地址:</span><span
          class="text-14 ml-12 font-extrabold">{{ props.address!=null?'暂无':props.address }}</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">电话:</span><span class="text-14 ml-12 font-extrabold">{{ props.userPhone!=null?'暂无':props.userPhone }}</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">邮箱:</span><span class="text-14 ml-12 font-extrabold">{{ props.email!=null?'暂无':props.email }}</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">微信:</span><span class="text-14 ml-12 font-extrabold">{{ props.wechat!=null?'暂无':props.wechat }}</span>
        </div>
      </div>
    </div>

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">教育经历</span>
    </div>

    <div v-if="props.educationExperiences!=null">
      <n-space class="mt-18">
        <div class="ml-15">
          <div class="flex text-16">
            <span class="text-[#09b2fdff] font-extrabold" v-if="props.educationExperiences!=null">{{ props.educationExperiences[0].schoolName }}</span>
            <span class="ml-12"><n-tag v-if="props.educationExperiences!=null&&educationExperiences[0].schoolType!=null&&educationExperiences[0].schoolType.includes('985')" :bordered="false" type="error" size="small">985院校</n-tag></span>
            <span class="ml-12"><n-tag v-if="props.educationExperiences!=null&&educationExperiences[0].schoolType!=null&&educationExperiences[0].schoolType.includes('211')" :bordered="false" type="info" size="small">211院校</n-tag></span>
          </div>
          <div class="mt-15 flex text-15">
            <span class="opacity-60" v-if="props.educationExperiences!=null">{{ props.educationExperiences[0].beginYear }}-{{ props.educationExperiences[0].endYear }}</span>
            <span class="ml-12 font-extrabold" v-if="props.educationExperiences!=null">{{ props.educationExperiences[0].majorName }}</span>
            <span class="ml-12 font-extrabold">{{ formattedEducationType }}</span>
            <span class="ml-12" v-if="props.educationExperiences!=null">GPA : {{ props.educationExperiences[0].gpa }}</span>
          </div>
          <div class="mt-7 flex text-15" v-if="props.educationExperiences!=null">
            主修课程：{{ props.educationExperiences[0].activity }}
          </div>
        </div>
      </n-space>
    </div>

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">技能标签</span>
    </div>

    <div class="mt-15">
      <div class="mt-15">
        <n-tag v-for="skill in skills" :key="skill" class="ml-12 mt-6" type="info">
          {{ skill }}
        </n-tag>
      </div>
    </div>


    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">素养标签</span>
    </div>

    <div class="mt-15">
      <div class="mt-15">
        <n-tag v-for="suyang in suyangs" :key="suyang" class="ml-12 mt-6" type="error">
          {{ suyang }}
        </n-tag>
      </div>
    </div>

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">所获奖项</span>
    </div>

    <div class="mt-15">
      <div class="mt-15">
        <n-tag v-for="award in awards" :key="award" class="ml-12 mt-6" type="success">
          {{ award }}
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
