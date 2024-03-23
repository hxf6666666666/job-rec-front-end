<template>
  <div class="flex mt-15">
    <n-card class="w-100%" embedded hoverable size="large" title="期望职位类型">
      <n-select v-model:value="type_value2" :options="types2" clearable placeholder="职位类型" />
    </n-card>
  </div>
  <div class="flex mt-15" title="职位图谱">
    <n-card class="w-100%" size="large">
      <KnowledgeGraph></KnowledgeGraph>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import KnowledgeGraph from '@/components/common/KnowledgeGraph.vue'

const types2 = ref([
  { value: 'C++', label: 'C++' },
  { value: 'Java', label: 'Java' },
  { value: 'Python', label: 'Python' },
  { value: '软件工程师', label: '软件工程师' },
  { value: '前端', label: '前端' },
  { value: '网络/系统安全', label: '网络/系统安全' },
  { value: '运维/技术支持', label: '运维/技术支持' },
  { value: '教师', label: '教师' },
  { value: '算法', label: '算法' },
  { value: '测试', label: '测试' },
  { value: '硬件', label: '硬件' },
  { value: '销售', label: '销售' },
  { value: '电气', label: '电气' },
  { value: '实施', label: '实施' },
  { value: '移动端', label: '移动端' },
  { value: '数据', label: '数据' },
  { value: '后端', label: '后端' }
])
const type_value2 = ref([])


</script>

<style scoped>

</style>
