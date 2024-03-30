<template xmlns:i-fe="http://www.w3.org/1999/xhtml">
  <AppPage show-footer>
    <div class="flex">
      <n-card class="min-w-200 w-40%" hoverable>
        <div class="flex items-center">
          <n-avatar round :size="60" :src="userStore.userAvatar" class="flex-shrink-0" />
          <div class="ml-20 flex-col">
            <span class="text-20">
              Hello, {{ userStore.userNickname }}
            </span>
            <span class="mt-4 opacity-80">当前角色：{{ userStore.userRole }}</span>
          </div>
        </div>

        <p class="mt-28 text-14 opacity-80">欢迎使用基于知识图谱的大学生就业能力评价和职位推荐系统！</p>
      </n-card>
      <n-card class="ml-12 w-15% items-center" hoverable size="large" title="🔩在招职位">
        <n-statistic label="" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="8761" />
        </n-statistic>
      </n-card>
      <n-card class="ml-12 w-15% items-center" hoverable size="large" title="📑简历数量">
        <n-statistic label="" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="1761" />
        </n-statistic>
      </n-card>
      <n-card class="ml-12 w-15% items-center" hoverable size="large" title="⭐岗位类型">
        <n-statistic label="" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="17" />
        </n-statistic>
      </n-card>
      <n-card class="ml-12 w-15% items-center" hoverable size="large" title="🏙️城市数量">
        <n-statistic label="" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="143" />
        </n-statistic>
      </n-card>
    </div>

    <div class="mt-12 flex">
      <n-card class="w-50%" hoverable segmented title="🗺️城市热度">
        <template #header-extra>
          <span class="opacity-90 text-highlight">👏 看看全国哪些地方在招职位最多吧</span>
        </template>
        <VChart :option="word_option"  :init-options="{ height: 270 }" autoresize />
      </n-card>
      <n-card class="ml-12 w-50%" hoverable segmented title="🛠️热门技能要求">
        <VChart :option="word_option2"  :init-options="{ height: 270 }" autoresize />
      </n-card>
    </div>

    <div class="mt-12 flex">
      <n-card class="w-33%" hoverable title="🧑‍🎓求职者学历分布" size="small">
        <VChart :option="educationOption" :init-options="{ height: 200 }" autoresize />
      </n-card>
      <n-card class="ml-12 w-33%" hoverable title="🧑‍🔧求职者专业分布" size="small">
        <VChart :option="majorOption" :init-options="{ height: 200 }" autoresize />
      </n-card>
      <n-card class="ml-12 w-33%" hoverable title="💰职位薪资分布" size="small">
        <VChart :option="salaryFunnelOption" :init-options="{ height: 200 }" autoresize />
      </n-card>
    </div>

    <div class="mt-12 flex">
      <n-card class="w-50%" hoverable title="📈职位简历趋势" size="small">
        <VChart :option="trendOption2" :init-options="{ height: 280 }" autoresize />
      </n-card>
      <n-card class="ml-12 w-50%" hoverable title="🔥热门职位类别" size="small">
        <VChart :option="trendOption" :init-options="{ height: 280 }" autoresize />
      </n-card>
    </div>

  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components'
import { BarChart, LineChart, MapChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { AppPage } from '@/components/index.js'
import { FunnelChart } from 'echarts/charts';
import 'echarts-wordcloud';


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
  MapChart,
  FunnelChart
])

const word_option  = {
  series: [{
    type: 'wordCloud',
    shape: 'circle',
    keepAspect: false,
    // maskImage: maskImage,
    width: '100%',
    height: '100%',
    right: null,
    bottom: null,
    sizeRange: [12, 100],
    rotationRange: [-45, 45],
    rotationStep: 45,
    gridSize: 8,
    drawOutOfBound: false,
    layoutAnimation: true,
    textStyle: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      color: function () {
        return 'rgb(' + [
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160)
        ].join(',') + ')';
      }
    },
    emphasis: {
      // focus: 'self',
      textStyle: {
        textShadowBlur: 3,
        textShadowColor: '#333'
      }
    },
    //data属性中的value值却大，权重就却大，展示字体就却大
    data: [
      { name: '泰安', value: 952 },
      { name: '上海', value: 837 },
      { name: '广州', value: 754 },
      { name: '深圳', value: 680 },
      { name: '天津', value: 510 },
      { name: '成都', value: 485 },
      { name: '武汉', value: 462 },
      { name: '杭州', value: 439 },
      { name: '重庆', value: 424 },
      { name: '西安', value: 402 },
      { name: '苏州', value: 387 },
      { name: '南京', value: 366 },
      { name: '郑州', value: 349 },
      { name: '长沙', value: 338 },
      { name: '沈阳', value: 312 },
      { name: '青岛', value: 301 },
      { name: '大连', value: 290 },
      { name: '东莞', value: 285 },
      { name: '宁波', value: 278 },
      { name: '厦门', value: 271 },
      { name: '北京', value: 265 }
    ]
  }]
}

const word_option2  = {
  series: [{
    type: 'wordCloud',
    shape: 'circle',
    keepAspect: false,
    // maskImage: maskImage,
    width: '100%',
    height: '100%',
    right: null,
    bottom: null,
    sizeRange: [12, 100],
    rotationRange: [-45, 45],
    rotationStep: 45,
    gridSize: 8,
    drawOutOfBound: false,
    layoutAnimation: true,
    textStyle: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      color: function () {
        return 'rgb(' + [
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160)
        ].join(',') + ')';
      }
    },
    emphasis: {
      // focus: 'self',
      textStyle: {
        textShadowBlur: 3,
        textShadowColor: '#333'
      }
    },
    //data属性中的value值却大，权重就却大，展示字体就却大
    data: [
      { name: 'JavaScript', value: 952 },
      { name: 'HTML', value: 837 },
      { name: 'CSS', value: 754 },
      { name: 'React', value: 680 },
      { name: 'Node.js', value: 510 },
      { name: 'Vue.js', value: 485 },
      { name: '数据挖掘', value: 462 },
      { name: 'Python', value: 439 },
      { name: 'Java', value: 424 },
      { name: 'TypeScript', value: 402 },
      { name: 'Django', value: 387 },
      { name: 'Spring', value: 366 },
      { name: 'Express', value: 349 },
      { name: '云计算', value: 338 },
      { name: 'PHP', value: 312 },
      { name: 'C#', value: 301 },
      { name: 'Ruby', value: 290 },
      { name: '大数据', value: 285 },
      { name: 'Swift', value: 278 },
      { name: 'Kotlin', value: 271 },
      { name: 'Go', value: 265 },
      { name: 'Rust', value: 250 },
      { name: 'SQL', value: 235 },
      { name: 'NoSQL', value: 220 },
      { name: 'MongoDB', value: 205 },
      { name: '人工智能', value: 190 },
      { name: 'MySQL', value: 175 },
      { name: 'Redis', value: 160 },
      { name: 'Docker', value: 145 },
      { name: '机器学习', value: 130 },
      { name: 'AWS', value: 115 },
      { name: 'Azure', value: 100 },
      { name: 'Git', value: 85 }
    ]
  }]
}


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
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  legend: {
    left: '5%', // 修改为 left
    data: ['在招职位数'],
  },
  yAxis: [ // 修改为 yAxis
    {
      type: 'category', // 修改为 category
      data: ['C++', 'Java', 'Python', '软件', '前端', '网络安全', '运维', '教师', '算法', '测试', '硬件', '其他'].reverse(),
      axisLabel: {
        interval: 0, // 显示所有类别文字
      },
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  xAxis: [ // 修改为 xAxis
    {
      type: 'value', // 修改为 value
      min: 0,
      max: 500,
      interval: 50,
      axisLabel: {
        formatter: '{value}',
      },
    },
  ],
  series: [
    {
      name: '在招职位数',
      xAxisIndex: 0, // 修改为 xAxisIndex
      type: 'bar',
      data: [40, 72, 110, 115, 121, 175, 180, 201, 260, 398, 423, 455],
      label: {
        show: true,
        position: 'right' // 将标签显示在条形图右侧
      }
    },
  ],
}

const message = $message

const educationOption = {
  tooltip: {
    trigger: 'item',
    position: ['60%', '80%'],
    formatter: '{b}: {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 10,
    data: ['大专', '本科', '硕士', '博士'],
  },
  series: [
    {
      name: '学历分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 335, name: '本科' },
        { value: 310, name: '硕士' },
        { value: 234, name: '博士' },
        { value: 135, name: '大专' },
      ],
    },
  ],
};

const salaryFunnelOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}%'
  },
  series: [
    {
      name: '薪资分布',
      type: 'funnel',
      left: 1,
      top: 1,
      bottom: 1,
      right: 1,
      width: '100%',
      min: 0,
      max: 50,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      label: {
        show: true,
        position: 'outside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 2,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [
        { value: 10, name: '3K以下', itemStyle: { color: '#FFA500' } },
        { value: 20, name: '3-5K', itemStyle: { color: '#87CEEB' } },
        { value: 30, name: '5-10K', itemStyle: { color: 'rgba(70,187,112,0.91)' } },
        { value: 25, name: '10-20K', itemStyle: { color: 'rgb(218,91,151)' } },
        { value: 8, name: '20-50K', itemStyle: { color: '#9370DB' } },
        { value: 5, name: '50K以上', itemStyle: { color: '#FFD700' } }
      ]
    }
  ]
};

const majorOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '7%',
    right: '7%',
    top: '7%',
    bottom: '6%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: 200,
    interval: 40,
  },
  yAxis: {
    type: 'category',
    data: ['其他', '信息安全', '人工智能', '大数据', '网络工程', '软件工程', '计算机科学与技术']
  },
  series: [
    {
      name: '专业分布',
      type: 'bar',
      data: [50, 60, 70, 80, 150, 160, 170],
      itemStyle: {
        color: 'rgba(70,187,112,0.91)' // 设置条形图颜色
      },
      label: {
        show: true,
        position: 'right' // 将标签显示在条形图右侧
      }
    }
  ]
};

const trendOption2 = {
  color: ['#335cff', '#a528c9', 'rgba(46,211,107,0.91)'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['职位发布数', '简历投递数', '简历通过数']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['本月', '1个月前', '2个月前', '3个月前', '4个月前', '5个月前', '6个月前', '7个月前', '8个月前', '9个月前', '10个月前', '11个月前'].reverse()
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '职位发布数',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 232, 101, 164, 90, 340, 250, 120, 232, 101, 164, 90]
    },
    {
      name: '简历投递数',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 232, 301, 334, 390, 330, 320, 232, 301, 334, 390, 330]
    },
    {
      name: '简历通过数',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(46,211,107,0.91)'
          },
          {
            offset: 1,
            color: 'rgba(70,187,112,0.91)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 132, 201, 134, 190, 230, 220, 132, 201, 134, 190, 230]
    }
  ]
};

</script>

<style>

</style>
