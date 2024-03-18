<script setup>
import { AppPage, CommonPage } from '@/components/index.js'
import JobCard from '@/components/common/JobCard.vue'

defineOptions({ name: 'zhaopinHistory' })

</script>

<template>
<CommonPage title="招聘历史" show-footer>
    <div style="width: 1000px">
      <n-card class="mt-10 mr-10" title="">
        <n-input-group>
          <n-input round size="large" placeholder="请输入职位名称进行搜索">
            <template #prefix>
              <n-icon i-fe:search />
            </template>
          </n-input>
          <n-button type="primary" round size="large">
            搜索
          </n-button>
        </n-input-group>


      </n-card>
    </div>
    <job-card></job-card>
    <job-card></job-card>
    <job-card></job-card>
    <job-card></job-card>


  </CommonPage>
</template>

<style scoped>
.underline {
  text-decoration: underline;
  text-decoration-skip-ink: auto; /* 这将使下划线避开字母的降部，从而增加与文字的距离 */
  text-underline-offset: 8px; /* 这是增加下划线与文字之间垂直距离的方法 */
}

</style>
