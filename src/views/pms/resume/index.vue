<template>
  <CommonPage>
    <MeCrud
      ref="$table"
      :is-pagination="true"
      :columns="columns"
      v-model:query-items="queryItems"
      :get-data="api.read"
    >
      <MeQueryItem label="文件名称" :label-width="80">
        <n-input
          v-model:value="queryItems.fileName"
          type="text"
          placeholder="请输入文件名称"
          clearable
        />
      </MeQueryItem>
    </MeCrud>
    <n-drawer v-model:show="show" :width="760" show-mask="true">
      <n-drawer-content class="m-0" :native-scrollbar="false">
        <resume-card
          :work-experience-year="employee.workExperienceYear"
          :gender="employee.gender"
          :id="employee.id"
          :date-of-birth="employee.dateOfBirth"
          :avatar="employee.avatar"
          :resume-integrity="employee.resumeIntegrity"
          :realName="employee.realName"
          :age="employee.age"
          :city="employee.city"
          :address="employee.address"
          :userPhone="employee.userPhone"
          :email="employee.email"
          :qqNumber="employee.qqNumber"
          :wechat="employee.wechat"
          :skillTag="employee.skillTag"
          :awardTag="employee.awardTag"
          :personalityTag="employee.personalityTag"
          :advantage="employee.advantage"
          :workExperience="employee.workExperienceYear"
          :englishTag="employee.englishTag"
          :createTime="employee.createTime"
          :updateTime="employee.updateTime"
          :educationExperiences="employee.educationExperiences"/>
      </n-drawer-content>
    </n-drawer>
  </CommonPage>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import { CommonPage } from '@/components/index.js'
import { NButton, NTag } from 'naive-ui'
import { formatDateTime, request } from '@/utils'
import { MeCrud, MeQueryItem } from '@/components'
import { useCrud } from '@/composables'
import api from './api'
import JobDetailCard from '@/components/common/JobDetailCard.vue'
import ResumeCard from '@/components/common/ResumeCard.vue'
import api2 from '@/views/demo/CVDetail/api.js'


const handleOpenResumeCard = async (row)=>{
  show.value = !show.value
  try {
    const response2 = await api2.getResumeById(row.id)
    console.log(response2.data)
    const response1 = await api.getName(response2.data.employeeId)


    console.log(response1.data)
    // 更新 employee 对象的属性
    employee.id = response1.data.id;
    employee.realName = response1.data.realName;
    employee.gender = response1.data.gender;
    employee.dateOfBirth = response1.data.dateOfBirth;
    employee.avatar = response1.data.avatar;
    employee.resumeIntegrity = response1.data.resumeIntegrity;
    employee.age = response1.data.age;
    employee.city = response1.data.city;
    employee.address = response1.data.address;
    employee.userPhone = response1.data.userPhone;
    employee.email = response1.data.email;
    employee.qqNumber = response1.data.qqNumber;
    employee.wechat = response1.data.wechat;
    employee.skillTag = response1.data.skillTag;
    employee.awardTag = response1.data.awardTag;
    employee.personalityTag = response1.data.personalityTag;
    employee.advantage = response1.data.advantage;
    employee.workExperienceYear = response1.data.workExperienceYear;
    employee.englishTag = response1.data.englishTag;
    employee.createTime = response1.data.createTime;
    employee.updateTime = response1.data.updateTime;
    employee.educationExperiences = response1.data.educationExperiences;
  }catch (e){
    console.log(e)
  }


}

const employee = reactive({
  id: 2,
  avatar: "",
  resumeIntegrity: 0,
  userId: 0,
  realName: "",
  gender: 0,
  age: 0,
  dateOfBirth: "",
  city: "",
  address: "",
  userPhone: "",
  email: "",
  qqNumber: "",
  wechat: "",
  skillTag: "",
  awardTag: "",
  personalityTag: "",
  advantage: "",
  workExperienceYear: 0,
  englishTag: "",
  createTime: "",
  updateTime: "",
  educationExperiences: [
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

defineOptions({ name: 'ResumeMgt' })

const { copy, copied } = useClipboard()


const $table = ref(null)

/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const show = ref(false)

const columns = [
  { title: '文件名称', key: 'fileName', width: 280, ellipsis: { tooltip: true } },
  {
    title: '文件大小',
    key: 'fileSize',
    width: 120,
    ellipsis: { tooltip: true },
    render(row) {
      const fileSizeInMB = row.fileSize / (1024 * 1024); // 将字节转换为 MB
      return fileSizeInMB.toFixed(2) + ' MB'; // 保留两位小数并添加单位 MB
    },
  },
  {
    title: '创建时间',
    key: 'uploadTime',
    width: 280,
    render(row) {
      return h('span', formatDateTime(row['uploadTime']))
    },
  },
  {
    title: '上传者ID',
    key: 'employeeId',
    width: 180,
    ellipsis: { tooltip: true },
    render(row) {
      return h('span', row.employeeId);
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 310,
    hideInExcel: true,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'tiny',
            type: 'error',
            onClick: () => handleDelete(row.id),
          },
          {
            default: () => '删除',
            icon: () => h('i', { class: 'i-material-symbols:delete-outline text-14' }),
          }
        ),
        h(
          NButton,
          {
            size: 'tiny',
            type: 'success',
            style: 'margin-left: 12px;',
            onClick: () => handleOpenResumeCard(row),
          },
          {
            default: () => '查看',
            icon: () => h('i', { class: 'i-carbon:view text-14' }),
          }
        ),
      ];
    },
  },
]

watch(copied, (val) => {
  val && $message.success('已复制到剪切板')
})

const {
  modalRef,
  handleDelete,
} = useCrud({
  name: '简历',
  initForm: {  },
  doDelete: api.delete,
  refresh: () => $table.value?.handleSearch(),
})
</script>
