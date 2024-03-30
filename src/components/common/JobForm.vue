<script setup>
import { sleep } from '@/utils'
import { ref } from 'vue'
const types2 = ref([
  {
    value: 'C++', label: 'C++'
  },
  {
    value: 'Java', label: 'Java'
  },
  {
    value: 'Python', label: 'Python'
  },
  {
    value: '软件工程师', label: '软件工程师'
  },
  {
    value: '前端', label: '前端'
  },
  {
    value: '网络/系统安全', label: '网络/系统安全'
  },
  {
    value: '运维/技术支持', label: '运维/技术支持'
  },
  {
    value: '教师', label: '教师'
  },
  {
    value: '算法', label: '算法'
  },
  {
    value: '测试', label: '测试'
  },
  {
    value: '硬件', label: '硬件'
  },
  {
    value: '销售', label: '销售'
  },
  {
    value: '电气', label: '电气'
  },
  {
    value: '实施', label: '实施'
  },
  {
    value: '移动端', label: '移动端'
  },
  {
    value: '数据', label: '数据'
  },
  {
    value: '后端', label: '后端'
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

<template>
  <n-form>
    <div class="flex">
      <n-form-item class="w-50%" label="职位名称">
        <n-input v-model:value="formState.ZhiWeiName"/>
      </n-form-item>
      <n-form-item class="w-50% ml-15" label="职位类别">
        <n-select class="ml-12" clearable placeholder="职位类型" v-model:value="type_value2" multiple :options="types2" />
      </n-form-item>
    </div>
    <n-form-item label="职位描述">
      <n-input v-model:value="formState.job_description" type="textarea"/>
    </n-form-item>

    <div class="flex">
      <n-form-item class="w-33%" label="最低学历要求">
        <n-select v-model:value="formState.job_lowestXueLi" :options="options"/>
      </n-form-item>

      <n-form-item class="w-33% ml-15" label="最低工作年限要求">
        <n-select clearable placeholder="工作经验" v-model:value="exp_value" multiple :options="exp_options" />
      </n-form-item>

      <n-form-item class="w-33% ml-15" label="职业类型">
        <n-radio-group v-model:value="formState.job_type" name="radiogroup">
          <n-space>
            <n-radio v-for="song in songs" :key="song.value" :value="song.value">
              {{ song.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>

    </div>
    <n-form-item label="公司名称">
      <n-input v-model:value="formState.GongSiName"/>
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
      <n-input class="ml-15" v-model:value="formState.job_address_detail" placeholder="输入详细地址"/>
    </n-form-item>
    <div class="flex">
      <n-form-item class="w-65%" label="工资上下限（单位：K）">
        <n-space vertical>
          <n-slider v-model:value="formState.salary_range" range :step="1"/>
          <n-space>
            <n-input-number v-model:value="formState.salary_range[0]" size="small"/>
            <n-input-number v-model:value="formState.salary_range[1]" size="small"/>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item class="w-35% ml-10" label="工资种类">
        <n-space vertical>
          <n-radio-group class="mt-20" v-model:value="formState.salary_type" name="radiobuttongroup1">
            <n-radio-button
              v-for="song in songs2"
              :key="song.value"
              :value="song.value"
              :label="song.label"
            />
          </n-radio-group>
        </n-space>
      </n-form-item>
    </div>
  </n-form>
</template>

<style scoped>

</style>
