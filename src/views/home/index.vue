<template xmlns:i-fe="http://www.w3.org/1999/xhtml">
  <AppPage show-footer>
    <div class="flex">
      <n-card class="min-w-200 w-40%">
        <div class="flex items-center">
          <n-avatar round :size="60" :src="userStore.avatar" class="flex-shrink-0" />
          <div class="ml-20 flex-col">
            <span class="text-20">
              Hello, {{ userStore.nickName ?? userStore.username }}
            </span>
            <span class="mt-4 opacity-80">当前角色：{{ userStore.currentRole?.name }}</span>
          </div>
        </div>

        <p class="mt-28 text-14 opacity-60">欢迎使用基于知识图谱的大学生就业能力评价和职位推荐系统！</p>
      </n-card>
      <n-card class="ml-12 w-15% items-center" size="large" title="🔩在招职位">
        <n-statistic label="" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="8761" />
        </n-statistic>
      </n-card>
      <n-card class="ml-12 w-15% items-center" size="large" title="📑简历数量">
        <n-statistic label="" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="1761" />
        </n-statistic>
      </n-card>
      <n-card class="ml-12 w-15% items-center" size="large" title="⭐岗位类型">
        <n-statistic label="" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="17" />
        </n-statistic>
      </n-card>
      <n-card class="ml-12 w-15% items-center" size="large" title="🏙️城市数量">
        <n-statistic label="" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="143" />
        </n-statistic>
      </n-card>
    </div>
    <div class="mt-12 flex">
      <n-card class="w-50%" title="🗺️职位热力地图" segmented>
        <template #header-extra>
          <span class="opacity-90 text-highlight">👏 看看全国哪些地方在招职位最多吧</span>
        </template>
        <china-map></china-map>


      </n-card>

      <n-card class="ml-12 w-50%" title="🛠️ 热门技能要求" segmented>
        <VChart :option="skillOption" autoresize />
      </n-card>
    </div>

    <n-card class="mt-12" title="⚡️ 趋势" segmented>
      <VChart :option="trendOption" :init-options="{ height: 400 }" autoresize />
    </n-card>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import * as echarts from 'echarts/core'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { ToolboxComponent } from 'echarts/components';
import { VisualMapComponent } from 'echarts/components';
import { MapChart } from 'echarts/charts';
import ChinaMap from '@/views/home/ChinaMap.vue'

const userStore = useUserStore()

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
  ToolboxComponent,
  VisualMapComponent,
  MapChart
])

const trendOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    top: '5%',
    data: ['star', 'fork'],
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 3000,
      interval: 500,
      axisLabel: {
        formatter: '{value}',
      },
    },
    {
      type: 'value',
      min: 0,
      max: 500,
      interval: 100,
      axisLabel: {
        formatter: '{value}',
      },
    },
  ],
  series: [
    {
      name: 'star',
      type: 'line',
      data: [200, 320, 520, 550, 600, 805, 888, 950, 1300, 2503, 2702, 2712],
    },
    {
      name: 'fork',
      yAxisIndex: 1,
      type: 'bar',
      data: [40, 72, 110, 115, 121, 175, 180, 201, 260, 398, 423, 455],
    },
  ],
}

const skillOption = {
  tooltip: {
    trigger: 'item',
    formatter({ name, value }) {
      return `${name} ${value}%`
    },
  },
  legend: {
    left: 'center',
  },
  series: [
    {
      type: 'pie',
      radius: ['25%', '65%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 36,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 18.5, name: 'Vue' },
        { value: 10, name: 'Java' },
        { value: 10, name: 'C++' },
        { value: 37, name: 'JavaScript' },
        { value: 6.5, name: 'CSS' },
        { value: 6.2, name: 'HTML' },
        { value: 1.8, name: 'Other' },
      ],
    },
  ],
}

const message = $message


</script>

<style>

</style>
