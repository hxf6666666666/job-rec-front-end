<template>
  <CommonPage title="职位发布">
    <template #action>
      <n-button type="info" @click="handleAdd()">
        <i class="i-material-symbols:add mr-4 text-18" />
        发布新职位
      </n-button>
    </template>

    <div class="flex justify-center mb-15">
      <n-alert type="info" :bordered="false">
        点击“发布新职位”即可发布职位，系统自动完成职位解析！
      </n-alert>
    </div>

    <MeCrud
      ref="$table"
      :is-pagination="true"
      :columns="columns"
      v-model:query-items="queryItems"
      :get-data="api.read"
      :remote="true"
    >
      <MeQueryItem label="职位名称" :label-width="80">
        <n-input
          v-model:value="queryItems.jobName"
          type="text"
          placeholder="请输入职位名称"
          clearable
        />
      </MeQueryItem>

      <MeQueryItem label="职位类别" :label-width="80">
        <n-select
          v-model:value="queryItems.industryId"
          clearable
          :options="type2"
        />
      </MeQueryItem>
    </MeCrud>

    <MeModal ref="modalRef">
      <n-scrollbar style="max-height: 490px">
        <n-alert type="info">必填项填完才可以发布成功哦！</n-alert>
        <n-form class="mt-15">
          <div class="flex">
            <n-form-item class="w-50%" label="职位名称（必填）" :rule="{ required: true }">
              <n-input v-model:value="modalForm.jobName"/>
            </n-form-item>

            <n-form-item class="w-50% ml-15" label="职位类别（必填）" :rule="{ required: true }">
              <n-select class="ml-12" clearable placeholder="职位类别" v-model:value="modalForm.industryId" :options="type2" />
            </n-form-item>
          </div>

          <div class="flex">
            <n-form-item class="w-33%" label="最低学历要求">
              <n-select v-model:value="modalForm.educationType" placeholder="学历要求" :options="options"/>
            </n-form-item>

            <n-form-item class="w-33% ml-15" label="最低工作年限要求">
              <n-select clearable placeholder="工作经验" v-model:value="modalForm.workTimeType" :options="exps" />
            </n-form-item>

            <n-form-item class="w-33% ml-15" label="是否实习（必填）" :rule="{ required: true }">
              <n-radio-group v-model:value="modalForm.jobType" name="radiogroup">
                <n-space>
                  <n-radio v-for="song in songs" :key="song.value" :value="song.value">
                    {{ song.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
          </div>

          <div class="flex">
            <n-form-item class="w-65%" label="工资上下限（单位：K）（必填）" :rule="{ required: true }">
              <n-space vertical>
                <n-space>
                  <n-input-number v-model:value="modalForm.salaryLower" size="small" :min="0" :max="100" placeholder="下限"/>
                  <n-input-number v-model:value="modalForm.salaryUpper" size="small" :min="0" :max="100" placeholder="上限"/>
                </n-space>
              </n-space>
            </n-form-item>
            <n-form-item class="w-35% ml-10" label="薪数">
              <n-input-number v-model:value="modalForm.salaryUnit" size="small" :min="12" placeholder="薪数，默认12"/>
            </n-form-item>
          </div>

          <n-form-item label="职位描述（必填）" :rule="{ required: true }">
            <n-input v-model:value="modalForm.jobDescription" type="textarea"
                     maxlength="1000" show-count clearable
                     :autosize="{ minRows: 6 }"
            />
          </n-form-item>

          <n-form-item label="公司名称">
            <n-input v-model:value="modalForm.companyName"/>
          </n-form-item>

          <n-form-item label="原始链接">
            <n-input v-model:value="modalForm.link"/>
          </n-form-item>

          <n-form-item label="岗位地址">
            <n-input v-model:value="modalForm.city" placeholder="输入城市名"/>
            <n-input class="ml-15" v-model:value="modalForm.jobAddress" placeholder="输入详细地址"/>
          </n-form-item>

        </n-form>
      </n-scrollbar>
    </MeModal>

    <n-drawer v-model:show="show" :width="760" show-mask="true">
      <n-drawer-content class="m-0" :native-scrollbar="false">
        <job-detail-card
          :title="job.title"
          :exp="job.exp"
          :edu="job.edu"
          :city="job.city"
          :type1="job.type1"
          :industry="job.industry"
          :company="job.company"
          :address="job.address"
          :skills="job.skills"
          :description="job.description"
          :characters="job.characters"
          :salaryLower="job.salaryLower"
          :salaryUpper="job.salaryUpper"
          :salaryUnit="job.salaryUnit">
        </job-detail-card>
      </n-drawer-content>
    </n-drawer>

  </CommonPage>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import { CommonPage, MeModal } from '@/components/index.js'
import { NButton, NTag } from 'naive-ui'
import { formatDateTime, sleep } from '@/utils'
import { MeCrud, MeQueryItem } from '@/components'
import { useCrud } from '@/composables'
import api from './api'
import { defineProps, ref } from 'vue'
import { useUserStore } from '@/store/index.js'
import JobDetailCard from '@/components/common/JobDetailCard.vue'
import { RouterLink } from 'vue-router'


defineOptions({ name: 'JobUpload' })

const { copy, copied } = useClipboard()

const $table = ref(null)

/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const show = ref(false)
const handleOpenJobCard = (row)=>{
  show.value = !show.value
  // 使用解构赋值将row中的值赋给job
  job.title = row.jobName;
  job.exp = row.workTimeType;
  job.edu = row.educationType;
  job.city = row.city;
  job.type1 = row.jobType;
  job.company = row.companyName;
  job.address = row.jobAddress;
  job.skills = row.jobSkills;
  job.description = row.jobDescription;
  job.characters = row.jobPersonality;
  job.industry = row.industryId;
  job.salaryLower = row.salaryLower;
  job.salaryUpper = row.salaryUpper;
  job.salaryUnit = row.salaryUnit;
  job.link = row.link;
}
const job = {
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
};


const columns = [
  { title: '职位id', key: 'id', width: 60, ellipsis: { tooltip: true } },
  {
    title: '职位名称',
    key: 'jobName',
    width: 220,
    ellipsis: { tooltip: true },
    render(row) {
      return h('span', { style: 'font-weight: bold' }, row.jobName);
    }
  },
  {
    title: '职位类别',
    key: 'jobType',
    width: 330,
    ellipsis: { tooltip: true },
    render(row) {
      const category = type2.find(cat => cat.value === row.industryId);
      const label = category ? category.label : '暂无分类';
      return h(
        NTag,
        {
          type: 'primary',
          size: 'small',
          round: true
        },
        label
      );
    }
  },
  {
    title: '职位薪资',
    key: 'jobSalary',
    width: 120,
    ellipsis: { tooltip: true },
    render(row) {
      const { salaryLower, salaryUpper, salaryUnit } = row;
      const salaryString = `${salaryLower}-${salaryUpper}K·${salaryUnit}薪`;
      return h('span', {
        style: `color: red;`, // 设置红色字体样式
      }, salaryString);
    }
  },
  {
    title: '发布时间',
    key: 'createTime',
    width: 180,
    render(row) {
      return h('span', formatDateTime(row['createTime']))
    },
    sortOrder: false,
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
          RouterLink,
          {
            to: `/jobDetail/${row.id}`, // 使用动态参数row.id构建职位详情页面的路由
          },
          [
            h(
              NButton,
              {
                size: 'tiny',
                type: 'info',
                style: 'margin-left: 12px;',
              },
              {
                default: () => '招人',
                icon: () => h('i', { class: 'i-fe:users text-14' }),
              }
            ),
          ]
        ),
        h(
          NButton,
          {
            size: 'tiny',
            type: 'success',
            style: 'margin-left: 12px;',
            onClick: () => handleOpenJobCard(row),
          },
          {
            default: () => '查看',
            icon: () => h('i', { class: 'i-carbon:view text-14' }),
          }
        ),
      ].filter(Boolean);
    },
  },
]

watch(copied, (val) => {
  val && $message.success('已复制到剪切板')
})

const userStore = useUserStore()


const {
  modalRef,
  modalFormRef,
  modalForm,
  modalAction,
  handleAdd,
  handleDelete,
  handleSave,
} = useCrud({
  name: '职位',
  initForm: { userId: userStore.userId  },
  doCreate: api.create,
  doDelete: api.delete,
  refresh: () => $table.value?.handleSearch(),
})

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

let songs2 = [
  {
    value: "12",
    label: "12薪"
  },
  {
    value: "13",
    label: "13薪"
  },
  {
    value: "14",
    label: "14薪"
  },
  {
    value: "15",
    label: "15薪"
  }
];


//生成穿梭框的假数据
const techStacks = ['JavaScript', 'Vue', 'React', 'Angular', 'Python', 'Django', 'Flask', 'Java', 'Spring', 'Ruby', 'Rails'];

const createOptions = () => {
  return techStacks.map((tech, i) => ({
    label: tech,
    value: i
  }));
}

const checkStrategyIsChild = ref(true);
const showPath = ref(true);
const hoverTrigger = ref(false);
const filterable = ref(false);
const value = ref(null);


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

</script>
