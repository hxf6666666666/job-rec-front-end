<script setup>
import {ref} from "vue";

const formState = ref({
  ZhiWeiName: 'loyal slave',//职位名称
  GongSiName: 'UpFlow 506',//公司名称
  job_description: '来了就遵守忠诚宣言吧，每个人都有棉花摘，每个人都能找到意义',//职位详情
  job_lowestXueLi: '不限',//最低学历要求
  exp:3,
  zhaopinzhe:'老杨',
  SuYangKeyWorlds: ['抗压', '爱老杨','爱建模','带人来','团队','上流'],//素养关键词
  job_skills: ['数学建模','计算机','中医药','医学信息学','卫生统计学','软件工程'],//职业技术栈
  job_type: '全职',//职业类型实习或全职
  job_address: '江苏省南京市',//岗位地址
  job_address_detail: '仙林大道138号南京中医药大学 B6-506',//详细地址
  salary_range: [50, 70],

  salary_type: 0,//工资种类
})
const title = ref("网络工程师")
const exp = ref('3年以上')
const edu = ref('大专')
const city = ref('北京')
const type1 = ref('全职')
const zhaopinzhe = ref('刘女士')
const company = ref('汉博利特（北京）信息技术有限公司')
const address = ref('北京通州区金融街园中园6号院53号楼')
const skills = ref(['网络安全','调试','VPN'])
const knowledges = ref(['云计算','计算机','VPN'])
const characters = ref(['积极','学习能力','沟通','分析','团队','合作','抗压','热情'])
</script>

<template>
  <div class="flex" style="width: 1000px">
    <n-card class="mt-20 w-[100%]" :title="formState.ZhiWeiName">
      <template #header-extra>
        <n-button type="primary">
          <i class="i-fe:message-circle mr-4" />
          查看招聘情况
        </n-button>
      </template>
      <n-list hoverable clickable>
        <n-list-item>
          <n-space align="center" class="mb-12">
            <div class="items-center">
              <span class="text-18 color-error">{{`${formState.salary_range[0]}-${formState.salary_range[1]}K`}}</span>
              <span class="text-18 ml-12">
                  <n-tag :bordered="false">
                    {{ formState.exp+'年及以上工作经历'}}
                  </n-tag>
                </span>
              <span class="text-18 ml-12">
                  <n-tag :bordered="false">
                    {{ formState.job_lowestXueLi }}
                  </n-tag>
                </span>
              <span class="text-18 ml-12">
                  <n-tag :bordered="false" type="success">
                    {{ formState.job_address }}
                  </n-tag>
                </span>
              <span class="text-18 ml-12">
                  <n-tag :bordered="false" type="info">
                    {{ formState.job_type }}
                  </n-tag>
                 </span>
            </div>
          </n-space>

          <n-space align="center" class="mb-12">
            <div class="items-center">
              <n-tag v-for="skill in formState.job_skills" class="mr-4" :bordered="false" round size="small" type="success">
                {{ skill }}
              </n-tag>
              <n-tag v-for="character in formState.SuYangKeyWorlds" class="mr-4" :bordered="false" round size="small" type="error">
                {{ character }}
              </n-tag>
            </div>
          </n-space>

          <n-space align="center" >
            <img object-contain size="80" src="/src/assets/images/ywg.jpg"  alt=""/>
            <div class="ml-20">
              <div class="items-center">
                <span class="text-16 mr-12">{{ formState.GongSiName }}</span>
                <span class="text-14">{{ formState.zhaopinzhe }}</span>
                <p class="opacity-60">{{ formState.job_address+formState.job_address_detail }}</p>
              </div>
            </div>
          </n-space>
        </n-list-item>
      </n-list>
    </n-card>
  </div>
</template>

<style scoped>

</style>
