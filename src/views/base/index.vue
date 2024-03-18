<template>
  <CommonPage title="职位发布" show-footer>
    <div class="flex">
      <n-card class="w-50%" title="招聘信息填写">
        <n-form>
          <n-form-item label="职位名称">
            <n-input v-model:value="formState.ZhiWeiName"/>
          </n-form-item>
          <n-form-item label="公司名称">
            <n-input v-model:value="formState.GongSiName"/>
          </n-form-item>
          <n-form-item label="职位详情">
            <n-input v-model:value="formState.job_description" type="textarea"/>
          </n-form-item>
          <n-form-item label="最低学历要求">
            <n-select class="mt-10 " v-model:value="formState.job_lowestXueLi" :options="options"/>
          </n-form-item>
          <n-form-item label="素养关键词">
            <n-dynamic-tags v-model:value="formState.SuYangKeyWorlds"/>
          </n-form-item>
          <n-form-item label="职业技术栈">
            <n-space vertical>
              <n-transfer
                  ref="transfer"
                  v-model:value="formState.job_skills"
                  virtual-scroll
                  :options="options_skills"
                  source-filterable
              />
            </n-space>
          </n-form-item>

          <n-form-item label="职业类型">
            <n-radio-group v-model:value="formState.job_type" name="radiogroup">
              <n-space>
                <n-radio v-for="song in songs" :key="song.value" :value="song.value">
                  {{ song.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="岗位地址">

            <n-space vertical  placeholder="输入详细地址">
              <n-cascader
                  v-model:value="formState.job_address"
                  placeholder="请选择省份和城市"
                  :expand-trigger="hoverTrigger ? 'hover' : 'click'"
                  :options="options2"
                  :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
                  :show-path="showPath"
                  :filterable="filterable"
                  @update:value="handleUpdateValue"
              />
            </n-space>
            <n-input v-model:value="formState.job_address_detail" placeholder="输入详细地址"/>
          </n-form-item>

          <n-form-item label="工资上下限（单位：K）">
            <n-space vertical>
              <n-slider v-model:value="formState.salary_range" range :step="1"/>
              <n-space>
                <n-input-number v-model:value="formState.salary_range[0]" size="small"/>
                <n-input-number v-model:value="formState.salary_range[1]" size="small"/>
              </n-space>
            </n-space>
          </n-form-item>
          <n-form-item label="工资种类">
            <n-space vertical>
              <n-radio-group v-model:value="formState.salary_type" name="radiobuttongroup1">
                <n-radio-button
                    v-for="song in songs2"
                    :key="song.value"
                    :value="song.value"
                    :label="song.label"
                />
              </n-radio-group>
            </n-space>
          </n-form-item>
          <n-button type="primary" @click="submitForm">提交</n-button>
        </n-form>
      </n-card>
    </div>
  </CommonPage>
</template>

<script setup>
import {sleep} from '@/utils'
import {ref} from 'vue'
defineOptions({ name: 'BaseComponents' })

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
const handleDelete = function () {
  $dialog.confirm({
    content: '确认删除？',
    confirm() {
      $message.success('删除成功')
    },
    cancel() {
      $message.warning('已取消')
    },
  })
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
</script>