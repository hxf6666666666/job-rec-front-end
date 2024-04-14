<template>
  <div class="w-880">

    <div class="flex mt-15">
      <n-card class="w-20% items-center" embedded hoverable size="small" title="综合得分">
        <n-progress type="circle" :percentage="overallScore" color="#FF8C00" />
      </n-card>
      <n-card class="w-80% ml-25" embedded hoverable size="small">
        <div class="explanation-text">{{ explanationOverall }}</div>
      </n-card>
    </div>

    <div class="flex mt-15">
      <n-card class="w-20% items-center" embedded hoverable size="small" title="学历得分">
        <n-progress type="circle" :percentage="educationMatch" color="#C78C00" />
      </n-card>
      <n-card class="w-80% ml-25" embedded hoverable size="small">
        <div class="explanation-text">{{ explanationEducation }}</div>
      </n-card>
    </div>

    <div class="flex mt-15">
      <n-card class="w-20% items-center" embedded hoverable size="small" title="专业匹配度">
        <n-progress type="circle" :percentage="majorMatch" color="#3CB371" />
      </n-card>
      <n-card class="w-80% ml-25" embedded hoverable size="small">
        <div class="explanation-text">{{ explanationMajor }}</div>
      </n-card>
    </div>

    <div class="flex mt-15">
      <n-card class="w-20% items-center" embedded hoverable size="small" title="技能匹配度">
        <n-progress type="circle" :percentage="skillScore" />
      </n-card>
      <n-card class="w-80% ml-25" embedded hoverable size="small">
        <div class="explanation-text">{{ explanationSkill }}</div>
        <div class="mt-10">
          <n-divider></n-divider>
          <span class="mr-10">匹配技能：</span>
          <n-tag v-for="skill in matchedSkills" :key="skill" class="mr-6 mb-6" type="info">{{ skill }}</n-tag>
          <n-divider></n-divider>
          <span class="mr-10">未匹配技能：</span>
          <n-tag v-for="skill in unmatchedSkills" :key="skill" class="mr-6 mb-6" >{{ skill }}</n-tag>
        </div>
      </n-card>
    </div>

    <div class="flex mt-15">
      <n-card class="w-20% items-center" embedded hoverable size="small" title="素养得分">
        <n-progress type="circle" :percentage="personalityScore" color="#C71585"/>
      </n-card>
      <n-card class="w-80% ml-25" embedded hoverable size="small">
        <div class="explanation-text">{{ explanationPersonality }}</div>
        <div class="mt-10">
          <n-divider></n-divider>
          <span class="mr-10">匹配素养：</span>
          <n-tag v-for="trait in matchedTraits" :key="trait" class="mr-6 mb-6" type="error">{{ trait }}</n-tag>
          <n-divider></n-divider>
          <span class="mr-10">未匹配素养：</span>
          <n-tag v-for="trait in unmatchedTraits" :key="trait" class="mr-6 mb-6" >{{ trait }}</n-tag>
        </div>
      </n-card>
    </div>
    <div>




    </div>
    <div class="flex mt-15">

    </div>
    <div class="flex mt-15">
      <n-card hoverable size="small" title="提升建议" embedded>
        <n-alert type="info" :bordered="false">
          以下内容由AI根据简历内容结合知识图谱自动生成，仅供参考！
        </n-alert>
        <n-divider></n-divider>

        <!-- 渲染优点列表 -->
        <n-alert v-for="(pro, index) in advantages" :key="index" class="mt-10" type="success" :bordered="false">
          {{ pro }}
        </n-alert>

        <!-- 渲染建议列表 -->
        <n-alert v-for="(con, index) in suggestions" :key="index" class="mt-10" type="warning" :bordered="false">
          {{ con }}
        </n-alert>
      </n-card>
    </div>

    <div class="flex mt-15">
      <n-card title="评价反馈" size="small">
        <n-alert type="info" title="该评价结果是否令您满意？">
          <n-rate size="small" /><n-button class="ml-10" type="info" size="tiny">提交反馈</n-button>
        </n-alert>
      </n-card>
    </div>

    <div class="flex mt-15">
      <n-card class="w-100%" size="small" title="职位大类图谱">
        <KnowledgeGraph></KnowledgeGraph>
      </n-card>
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import KnowledgeGraph from '@/components/common/KnowledgeGraph.vue'
import { h, defineComponent } from "vue";
import { NTag, NButton,NRate } from "naive-ui";



// 定义响应式变量
const props = defineProps({
  overallScore: Number,
  educationMatch: Number,
  majorMatch: Number,
  skillScore: Number,
  personalityScore: Number,
  explanationOverall: String,
  explanationEducation: String,
  explanationMajor: String,
  explanationSkill: String,
  explanationPersonality: String,
  matchedSkills: Array,
  unmatchedSkills: Array,
  matchedTraits: Array,
  unmatchedTraits: Array,
  advantages: Array,
  suggestions: Array
});

// 处理默认值
const {
  overallScore = 88,
  educationMatch = 100,
  majorMatch = 100,
  skillScore = 81,
  personalityScore = 89,
  explanationOverall = "这是综合得分的解释说明。",
  explanationEducation = "这是学历匹配度的解释说明。",
  explanationMajor = "这是专业匹配度的解释说明。",
  explanationSkill = "这是技能得分的解释说明。",
  explanationPersonality = "这是素养得分的解释说明。",
  matchedSkills = ref(['Java', 'Python', 'JavaScript', 'HTML', 'CSS']),
  unmatchedSkills = ref(['C++', 'Ruby', 'PHP', 'Swift']),
  matchedTraits = ref(['合作', '沟通能力', '责任心', '领导力']),
  unmatchedTraits = ref(['学习能力', '适应能力', '创新能力', '决策能力']),
  advantages = [
    "熟练掌握了HTML、CSS、JavaScript等基础技术，为前端开发打下了坚实的基础。",
    "具备良好的团队合作能力和沟通能力，能够有效地与团队成员合作，推动项目的顺利进行。"
  ],
  suggestions = [
    "尽管已熟悉React.js等主流框架，但缺乏对其他前端框架的了解，建议扩展技术视野，学习更多前端框架。",
    "缺乏对前端工程化和性能优化的深入了解，建议深入学习Webpack、Babel等工具，并掌握性能优化的最佳实践。"
  ]
} = props;






</script>

<style scoped>
/* 居左对齐的解释说明文字样式 */
.explanation-text {
  text-align: left;
  font-size: large;
}
</style>
