<script setup>
import { useUserStore } from '@/store/index.js'

const title = ref("网络工程师")
const exp = ref('1-3年')
const edu = ref('本科')
const city = ref('北京')
const type1 = ref('全职')
const zhaopinzhe = ref('刘女士')
const company = ref('汉博利特（北京）信息技术有限公司')
const address = ref('北京通州区金融街园中园6号院53号楼')

const knowledges = ref(['云计算', 'VPN'])
const skills = ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Node.js']
const characters = ref(['学习能力', '沟通', '合作', '抗压'])
const majors = ref(['计算机科学与技术','软件工程','医学信息工程','人工智能','自动化'])


</script>

<template>
  <n-card id="job-detail" class="mt-5 w-720px" embedded hoverable>
        <div class="mb-12 text-23" style="font-family: 华文中宋; font-weight: bold">C++开发工程师</div>
        <n-space align="center" class="mb-12">
          <div class="items-center">
            <span class="text-18 color-error">7-12K</span>
            <span class="text-18 ml-12">
                  <n-tag :bordered="false">
                    {{ exp }}
                  </n-tag>
                </span>
            <span class="text-18 ml-12">
                  <n-tag :bordered="false">
                    {{ edu }}
                  </n-tag>
                </span>
            <span class="text-18 ml-12">
                  <n-tag :bordered="false" type="success">
                    {{ city }}
                  </n-tag>
                </span>
            <span class="text-18 ml-12">
                  <n-tag :bordered="false" type="info">
                    {{ type1 }}
                  </n-tag>
                 </span>
          </div>
        </n-space>

        <n-space align="center" class="mb-12">
          <div class="items-center">
            <n-tag v-for="skill in skills" :bordered="false" class="mr-4" round size="small" type="success">
              {{ skill }}
            </n-tag>
            <n-tag v-for="knowledge in knowledges" :bordered="false" class="mr-4" round size="small" type="warning">
              {{ knowledge }}
            </n-tag>
            <n-tag v-for="character in characters" :bordered="false" class="mr-4" round size="small" type="error">
              {{ character }}
            </n-tag>
          </div>
        </n-space>

        <n-space align="center">
          <img alt="" object-contain size="45" src="/src/assets/images/logo.png" />
          <div class="ml-20">
            <div class="items-center">
              <span class="text-16 mr-12">{{ company }}</span>
              <span class="text-14">{{ zhaopinzhe }}</span>
              <p class="opacity-60">{{ address }}</p>
            </div>
          </div>
        </n-space>


    <n-divider></n-divider>
    <div class="mt-15 ml-12">
      <span class="title text-20 font-extrabold">基本信息</span>
    </div>


    <div class="flex mb-15">
      <div class="w-[50%]">
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">所开薪资:</span><span class="text-14 ml-12 font-extrabold color-red">7-12K</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">经验要求:</span><span class="text-14 ml-12 font-extrabold">1-3年</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">最低学历要求:</span><span class="text-14 ml-12 font-extrabold">本科</span>
        </div>
      </div>
      <div class="w-[50%]">
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">职位类别:</span><span class="text-14 ml-12 font-extrabold">全职</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">城市:</span><span class="text-14 ml-12 font-extrabold">北京</span>
        </div>
        <div class="ml-15 mt-10">
          <span class="text-14 opacity-80">职位类别:</span><span class="text-14 ml-12 font-extrabold">后端</span>
        </div>
      </div>
    </div>

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">职位描述</span>
    </div>

    <div>
      <n-space class="mt-18">
        <div class="ml-15">
          <div class="mt-7 flex text-15">
            岗位职责：<br>
            1.负责公司电力系统自动化软件项目和产品的需求调研、分析；<br>
            2.编写相应的技术文档，完成相关模块的设计、功能实现及测试。<br>
            3.严格按公司规定的流程、标准及规范进行代码编写；<br>
            4.积极负责进行单元测试，配合完成逻辑测试，性能调优，bug修改，完善功能；<br>
            5.相关产品的说明书、介绍文档、安装文档等各类文档的编写。<br><br>
            任职要求：<br>
            1.本科及以上学历，自动化、通信、电子、信息工程、计算机等相关专业；<br>
            2.熟悉电力、新能源等相关知识，至少二年以上C++研发经验；<br>
            3.熟练使用oracle、Mysql、Mongodb等数据库；<br>
            4.熟悉使用变电站综合自动化、配网自动化系统者优先考虑。
          </div>
        </div>
      </n-space>
    </div>

    <div class="ml-12 mt-15">
      <span class="title text-20 font-extrabold">专业标签</span>
    </div>

    <div class="mt-15">
      <div class="mt-15">
        <n-tag v-for="major in majors" :key="major" class="ml-12 mt-4" type="success">
          {{ major }}
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
        <n-tag v-for="suyang in characters" :key="suyang" class="ml-12 mt-4" type="error">
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
