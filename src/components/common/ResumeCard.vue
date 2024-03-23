<script setup>
import { useUserStore } from '@/store/index.js'

const userStore = useUserStore()

const awards = [
  '数学建模挑战赛一等奖',
  '计算机设计大赛一等奖',
  '人民奖学金',
  '大学生创新创业大赛三等奖',
  '蓝桥杯全国软件和信息技术专业人才大赛三等奖',
  '江苏省普通高等学校第十七届高等数学竞赛二等奖',
  '院级优秀干部'
]
const skills = ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Node.js']
const suyangs = ['团队合作', '沟通能力', '解决问题的能力', '自我管理', '适应性强']

</script>

<template>
  <n-card id="resume" class="mt-5 w-720px" embedded hoverable>
    <div class="flex">
      <div class="w-20%">
        <n-avatar :size="90" :src="userStore.userAvatar" class="mt-15 ml-15" round />
      </div>
      <div class="w-60% mt-15">
        <div>
          <span class="text-23" style="font-family: 华文中宋; font-weight: bold">{{ userStore.userNickname }}</span>
          <span class="ml-10">
          <n-tag :bordered="false" size="small" type="info">
            英语能力良好
          </n-tag>
        </span>
          <span class="ml-10">
          <n-tag :bordered="false" size="small" type="info">
            技术达标
          </n-tag>
        </span>
        </div>
        <div class="mt-10">
        <span>
          <n-tag :bordered="false" size="medium" type="success">
            <template #icon>
              <i class="i-fe:pen-tool"></i>
            </template>
            硕士学历
          </n-tag>
        </span>
          <span class="ml-10">
          <n-tag :bordered="false" size="medium" type="error">
            <template #icon>
              <i class="i-fe:book"></i>
            </template>
            成绩优异
          </n-tag>
        </span>
          <span class="ml-10">
          <n-tag :bordered="false" size="medium" type="warning">
            <template #icon>
              <i class="i-fe:airplay?mask"></i>
            </template>
            项目多
          </n-tag>
        </span>
        </div>
        <div class="mt-10">
          <span class="text-14 opacity-70"><i class="i-fe:phone mr-6"></i>15552510062</span>
          <span class="text-14 ml-12 opacity-70"><i class="i-fe:mail mr-6"></i>635663114@qq.com</span>
          <span class="text-14 ml-12 opacity-70"><i class="i-fe:book?mask mr-6"></i>0年经验</span>
        </div>
      </div>
      <div class="w-20% mt-84">
        <n-progress
          :height="12"
          :percentage="80" processing
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
          <span class="text-14 opacity-80">姓名:</span><span class="text-14 ml-12 font-extrabold">魏中信</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">性别:</span><span class="text-14 ml-12 font-extrabold">男</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">出生年月:</span><span class="text-14 ml-12 font-extrabold">2003-02</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">QQ:</span><span class="text-14 ml-12 font-extrabold">123456789</span>
        </div>
      </div>
      <div class="w-[50%]">
        <div class="ml-15 mt-15">
          <span class="text-14 opacity-80">地址:</span><span
          class="text-14 ml-12 font-extrabold">江苏省南京市栖霞区仙林大道138号</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">电话:</span><span class="text-14 ml-12 font-extrabold">123456789</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">邮箱:</span><span class="text-14 ml-12 font-extrabold">0987654321@njucm.edu.cn</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">微信:</span><span class="text-14 ml-12 font-extrabold">1987654321</span>
        </div>
      </div>
    </div>

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">教育经历</span>
    </div>

    <div>
      <n-space class="mt-18">
        <div class="ml-15">
          <div class="flex text-16">
            <span class="text-[#09b2fdff] font-extrabold">南京中医药大学</span>
            <!--            <span class="ml-12"><n-tag :bordered="false" type="error" size="small">985院校</n-tag></span>-->
            <!--            <span class="ml-12"><n-tag :bordered="false" type="info" size="small">211院校</n-tag></span>-->
            <span class="ml-12"><n-tag :bordered="false" size="small" type="success">双一流院校</n-tag></span>
          </div>
          <div class="mt-15 flex text-15">
            <span class="opacity-60">2021-2025</span>
            <span class="ml-12 font-extrabold">信息管理与信息系统</span>
            <span class="ml-12 font-extrabold">本科</span>
            <span class="ml-12">GPA: 4.7</span>
          </div>
          <div class="mt-7 flex text-15">
            主修课程：概率论与数理统计，数字图像处理，计算机网络，数据结构，离散数学，线性代数，数据挖掘，操作系统，高等数学
          </div>
        </div>
      </n-space>
      <n-space class="mt-18">
        <div class="ml-15">
          <div class="flex text-16">
            <span class="text-[#09b2fdff] font-extrabold">南京大学</span>
            <span class="ml-12"><n-tag :bordered="false" size="small" type="error">985院校</n-tag></span>
            <span class="ml-12"><n-tag :bordered="false" size="small" type="info">211院校</n-tag></span>
            <span class="ml-12"><n-tag :bordered="false" size="small" type="success">双一流院校</n-tag></span>
          </div>
          <div class="mt-15 flex text-15">
            <span class="opacity-60">2025-2027</span>
            <span class="ml-12 font-extrabold">计算机科学与技术</span>
            <span class="ml-12 font-extrabold">硕士</span>
          </div>
          <div class="mt-7 flex text-15">
            主修课程：数据库原理与应用，数据结构，程序设计，操作系统
          </div>
        </div>
      </n-space>
    </div>

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">所获奖项</span>
    </div>

    <div class="mt-15">
      <div class="mt-15">
        <n-tag v-for="award in awards" :key="award" class="ml-12 mt-4" type="success">
          {{ award }}
        </n-tag>
      </div>
    </div>

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">技能标签</span>
    </div>

    <div class="mt-15">
      <div class="mt-15">
        <n-tag v-for="skill in skills" :key="skill" class="ml-12 mt-4" type="info">
          {{ skill }}
        </n-tag>
      </div>
    </div>


    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">素养标签</span>
    </div>

    <div class="mt-15">
      <div class="mt-15">
        <n-tag v-for="suyang in suyangs" :key="suyang" class="ml-12 mt-4" type="error">
          {{ suyang }}
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
