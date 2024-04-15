<script setup>
import { ref, reactive, defineProps, computed } from 'vue';
import api from '@/components/common/api.js'
import { useUserStore } from '@/store/index.js'
const userStore = useUserStore()
// 定义组件的 props
const props = defineProps({
  id: Number,
  avatar: String,
  resumeIntegrity: Number,
  userId: Number,
  realName: String,
  gender: Number,
  age: Number,
  dateOfBirth: String,
  city: String,
  address: String,
  userPhone: String,
  email: String,
  qqNumber: String,
  wechat: String,
  skillTag: String,
  awardTag: String,
  personalityTag: String,
  advantage: String,
  workExperienceYear: Number,
  englishTag: String,
  createTime: String,
  updateTime: String,
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

// 将 props 转为响应式对象
const employee = reactive({
  id: props.id,
  avatar: props.avatar || "", // 如果 props.avatar 未提供，则使用空字符串
  resumeIntegrity: props.resumeIntegrity || 0.5, // 如果 props.resumeIntegrity 未提供，则默认为 0
  realName: props.realName || "",
  gender: props.gender,
  age: props.age || 0,
  dateOfBirth: props.dateOfBirth || "",
  city: props.city || "",
  address: props.address || "",
  userPhone: props.userPhone || "",
  email: props.email || "",
  qqNumber: props.qqNumber || "",
  wechat: props.wechat || "",
  skillTag: props.skillTag || "",
  awardTag: props.awardTag || "",
  personalityTag: props.personalityTag || "",
  advantage: props.advantage || "",
  workExperienceYear: props.workExperienceYear,
  englishTag: props.englishTag || "",
  userId: userStore.userId,
  educationExperiences: props.educationExperiences || [
    {
      schoolName: "",
      majorName: "",
      gpa: "",
      beginYear: "",
      endYear: "",
      activity: "",
      educationType: 2,
      ranking: "",
      schoolType: "",
    }
  ]
});

// 定义表单提交函数
const onSubmit = () => {
  // 这里可以处理表单提交逻辑，例如更新 employee 对象
  console.log("表单提交");
};

// 定义表单重置函数
const onReset = () => {
  // 这里可以处理表单重置逻辑，例如清空表单数据
  console.log("表单重置");
};

const generalOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

const educationTypeOptions = [
  { value: 1, label: "大专" },
  { value: 2, label: "本科" },
  { value: 3, label: "硕士" },
  { value: 4, label: "博士" },
]

// 分割字符串并转为数组
const splitSkills = ref(props.skillTag ? String(props.skillTag).split(',') : []);
const splitCharacters = ref(props.personalityTag ? String(props.personalityTag).split(',') : []);
const splitAwards = ref(props.awardTag ? String(props.awardTag).split(',') : []);

// 计算属性，将数组拼接为逗号分隔的字符串
const joinedSkills = computed(() => splitSkills.value.join(','));
const joinedCharacters = computed(() => splitCharacters.value.join(','));
const joinedAwards = computed(() => splitAwards.value.join(','));

const submitForm = async () => {
  const d = $dialog.warning({
    content: '确定更新？',
    title: '提示',
    positiveText: '确定',
    negativeText: '取消',
    async onPositiveClick() {
      try {
        d.loading = true
        // 构造要上传的员工信息对象
        const data = {
          id: employee.id,
          avatar: employee.avatar,
          resumeIntegrity: employee.resumeIntegrity,
          userId: props.userId,
          realName: employee.realName,
          gender: employee.gender,
          age: employee.age,
          dateOfBirth: employee.dateOfBirth,
          city: employee.city,
          address: employee.address,
          userPhone: employee.userPhone,
          email: employee.email,
          qqNumber: employee.qqNumber,
          wechat: employee.wechat,
          skillTag: joinedSkills.value, // 使用拼接后的技能标签字符串
          awardTag: joinedAwards.value, // 使用拼接后的奖项标签字符串
          personalityTag: joinedCharacters.value, // 使用拼接后的素养标签字符串
          advantage: employee.advantage,
          workExperienceYear: employee.workExperienceYear,
          englishTag: employee.englishTag,
          educationExperiences: employee.educationExperiences,
          userId: employee.userId
        };
        console.log(data)
        const response = await api.uploadEmployee(useUserStore().userId, data);
        $message.success('更新成功')
        d.loading = false

        // 使用 setTimeout 延迟1秒后刷新页面
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

const handleUpdateValue = (value) => {
  $message.info(value);
}



</script>

<template>
  <n-card class="mt-5 w-720px" embedded hoverable>
    <n-space vertical>
      <div class="button-container">
        <n-button size="tiny" class="mb-14" @click="submitForm" type="warning">提交修改</n-button>
      </div>
      <n-form
        :model="employee"
        :label-width="160"
        :style="{ maxWidth: '640px' }"
        label-placement="left"
        @submit="onSubmit"
      >
        <n-form-item label="真实姓名" path="realName">
          <n-input v-model:value="employee.realName" placeholder="请输入姓名" />
        </n-form-item>
        <n-form-item label="性别" path="gender">
          <n-select v-model:value="employee.gender" :options="generalOptions" placeholder="选择性别" />
        </n-form-item>
        <n-form-item label="出生日期" path="dateOfBirth">
          <n-input v-model:value="employee.dateOfBirth" clearable />
        </n-form-item>
        <n-form-item label="所在城市" path="city">
          <n-input v-model:value="employee.city" placeholder="请输入城市" />
        </n-form-item>
        <n-form-item label="详细地址" path="address">
          <n-input v-model:value="employee.address" placeholder="请输入详细地址" />
        </n-form-item>
        <n-form-item label="电话号码" path="userPhone">
          <n-input v-model:value="employee.userPhone" placeholder="请输入电话号码" />
        </n-form-item>
        <n-form-item label="电子邮箱" path="email">
          <n-input v-model:value="employee.email" placeholder="请输入邮箱地址" />
        </n-form-item>
        <n-form-item label="QQ 号码" path="qqNumber">
          <n-input v-model:value="employee.qqNumber" placeholder="请输入 QQ 号码" />
        </n-form-item>
        <n-form-item label="微信号" path="wechat">
          <n-input v-model:value="employee.wechat" placeholder="请输入微信号" />
        </n-form-item>

        <n-divider></n-divider>


        <!-- 教育经历表单项 -->
        <n-form-item label="学校名称" path="educationExperiences.schoolName">
          <n-input v-model:value="employee.educationExperiences[0].schoolName" placeholder="请输入学校名称" />
        </n-form-item>

        <n-form-item label="学校类型" path="educationExperiences.schoolType">
          <n-input v-model:value="employee.educationExperiences[0].schoolType" placeholder="请输入学校类型" />
        </n-form-item>

        <n-form-item label="入学年份" path="educationExperiences.beginYear">
        <n-input v-model:value="employee.educationExperiences[0].beginYear" type="year" placeholder="请输入入学年份" />
        </n-form-item>

        <n-form-item label="毕业年份" path="educationExperiences.endYear">
          <n-input v-model:value="employee.educationExperiences[0].endYear" type="year" placeholder="请输入毕业年份" />
        </n-form-item>

        <n-form-item label="专业名称" path="educationExperiences.majorName">
          <n-input v-model:value="employee.educationExperiences[0].majorName" placeholder="请输入专业名称" />
        </n-form-item>

        <n-form-item label="GPA" path="educationExperiences.gpa">
          <n-input v-model:value="employee.educationExperiences[0].gpa" placeholder="请输入GPA" />
        </n-form-item>

        <n-form-item label="排名" path="educationExperiences.ranking">
          <n-input v-model:value="employee.educationExperiences[0].ranking" placeholder="请输入排名" />
        </n-form-item>


        <n-form-item label="主修课程" path="educationExperiences.activity">
          <n-input v-model:value="employee.educationExperiences[0].activity" type="textarea"
                   maxlength="1000" show-count clearable
                   :autosize="{ minRows: 3 }" placeholder="请输入主修课程" />
        </n-form-item>

        <n-form-item label="教育类型" path="educationExperiences.educationType">
          <n-select v-model:value="employee.educationExperiences[0].educationType" :options="educationTypeOptions" placeholder="请选择教育类型" />
        </n-form-item>


        <n-divider></n-divider>

        <n-form-item label="技能标签" path="skillTag">
          <n-dynamic-tags v-model:value="splitSkills" type="info" />
        </n-form-item>
        <n-form-item label="素养标签" path="personalityTag">
          <n-dynamic-tags v-model:value="splitCharacters" type="error" />
        </n-form-item>
        <n-form-item label="所获奖项" path="awardTag">
          <n-dynamic-tags v-model:value="splitAwards" type="success" />
        </n-form-item>

        <n-divider></n-divider>

        <n-form-item label="英语水平" path="englishTag">
          <n-input v-model:value="employee.englishTag" placeholder="请输入英语水平" />
        </n-form-item>

        <n-form-item label="工作经验年限" path="workExperienceYear">
          <n-input v-model:value="employee.workExperienceYear" placeholder="请输入工作经验年限" />
        </n-form-item>

<!--        <n-form-item label="自我评价" path="advantage">-->
<!--          <n-input v-model:modelValue="employee.advantage" type="textarea" />-->
<!--        </n-form-item>-->

        <n-divider></n-divider>
        <n-form-item label="开放隐私信息" path="workExperienceYear">
          <n-switch class="ml-20">
            <template #checked>
              <i class="i-fe:eye"></i>
            </template>
            <template #unchecked>
              <i class="i-fe:eye-off"></i>
            </template>
          </n-switch>
        </n-form-item>


      </n-form>
    </n-space>
  </n-card>
</template>

<style scoped>
.button-container {
  text-align: right;
  margin-bottom: 10px; /* 根据需要调整间隔 */
}
</style>
