<template>
  <CommonPage title="职位管理">
    <MeCrud
      ref="$table"
      :is-pagination="true"
      :columns="columns"
      v-model:query-items="queryItems"
      :get-data="api.read"
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
          placeholder="请选择职位大类"
          :options="type2"
        />
      </MeQueryItem>
    </MeCrud>
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
import { ref } from 'vue'
import { useUserStore } from '@/store/index.js'

defineOptions({ name: 'JobUpload' })

const { copy, copied } = useClipboard()

const $table = ref(null)

/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})


const columns = [
  { title: '职位id', key: 'id', width: 80, ellipsis: { tooltip: true } },
  { title: '职位名称', key: 'jobName', width: 200, ellipsis: { tooltip: true } },
  {
    title: '职位类别',
    key: 'jobType',
    width: 330,
    ellipsis: { tooltip: true },
    render(row) {
      const category = type2.find(cat => cat.value === row.industryId);
      return category ? category.label : '暂无分类';
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
    title: '创建时间',
    key: 'createTime',
    width: 250,
    render(row) {
      return h('span', formatDateTime(row['createTime']))
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
            onClick: () => handleOpenRolesSet(row),
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
  initForm: {  },
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
  {
    value: "不限",
    label: "不限"
  },
  {
    value: "大专",
    label: "大专"
  },
  {
    value: "本科",
    label: "本科"
  },
  {
    value: "硕士",
    label: "硕士"
  },
  {
    value: "博士",
    label: "博士"
  },
])
const formState = ref({
  ZhiWeiName: '',//职位名称
  GongSiName: '',//公司名称
  job_description: '',//职位详情
  job_lowestXueLi: '',//最低学历要求
  SuYangKeyWorlds: ['热心', '爱学习'],//素养关键词
  job_skills: '',//职业技术栈
  job_type: '',//职业类型实习或全职
  job_address: '',//岗位地址
  job_address_detail: '',//详细地址
  salary_range: [50, 70],
  exp:3,
  zhaopinzhe:'老杨',
  salary_type: 0,//工资种类
})

const submitForm = () => {
  console.log(formState.value)
}

const loading = ref(false)

const songs = ref([
  {
    value: "实习",
    label: "实习"
  },
  {
    value: "全职",
    label: "全职"
  },

].map((s) => {
  s.value = s.value.toLowerCase();
  return s;
}))

const value2 = ref(null);

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
  },
].map((s) => {
  s.value = s.value.toLowerCase();
  return s;
});

const selectStack = (stack) => {
  value.value = stack;
};
//生成穿梭框的假数据
const techStacks = ['JavaScript', 'Vue', 'React', 'Angular', 'Python', 'Django', 'Flask', 'Java', 'Spring', 'Ruby', 'Rails'];

const createOptions = () => {
  return techStacks.map((tech, i) => ({
    label: tech,
    value: i
  }));
}

const options_skills = createOptions();



const provinces = ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "海南省", "四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省", "台湾省", "内蒙古自治区", "广西壮族自治区", "西藏自治区", "宁夏回族自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区"];

function getOptions() {
  const options = provinces.map(province => ({
    value: province,
    label: province,
    children: getCityOptions(province)
  }));
  return options;
}

function getCityOptions(province) {
  const fakeCities = ["城市1", "城市2", "城市3"];
  return fakeCities.map(city => ({
    value: city,
    label: city
  }));
}

const checkStrategyIsChild = ref(true);
const showPath = ref(true);
const hoverTrigger = ref(false);
const filterable = ref(false);
const value = ref(null);
const options2 = getOptions();

function handleUpdateValue(value, option) {
  console.log(value, option);
}

async function handleLogin() {
  loading.value = true
  $message.loading('登录中...', {key: 'login'})
  await sleep(2000)
  $message.error('登录失败', {key: 'login'})
  await sleep(500)
  $message.loading('正在尝试重新登录...', {key: 'login'})
  await sleep(2000)
  $message.success('登录成功', {key: 'login'})
  loading.value = false
}

function handleMultiMessage() {
  $message.error(['用户名不能为空！', '密码不能为空！', '密码必须大于6位！'])
}

function notify(type) {
  $notification[type]({
    content: '说点啥呢',
    meta: '想不出来',
    duration: 2500,
    keepAliveOnHover: true,
  })
}

const exps = ref([
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
