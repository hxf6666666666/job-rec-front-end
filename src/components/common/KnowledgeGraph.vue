<template>
  <!-- VChart组件，通过option属性传递图表配置 -->
  <VChart :init-options="{ height: 680, width: 800 }" :option="option" autoresize></VChart>
</template>

<script setup>
// 导入vue-echarts组件
import * as echarts from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components'
import { BarChart, GraphChart, LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

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
  GraphChart
])


// 定义图表的配置项，你可以在此处设置你的图表配置
const categories = [
  { name: '实习或全职' },
  { name: '技能' },
  { name: '职位名称' },
  { name: '素养' },
  { name: '公司' },
  { name: '职位id' },
  { name: '职位类别' },
  { name: '薪资' },
  { name: '学历' },
  { name: '城市' },
  { name: '知识' }
]
// 生成模拟节点数据
const nodes = [
  { id: 1, name: '全职', category: 0 }, // 实习或全职
  { id: 21, name: 'C++', category: 1 }, // 技能
  { id: 22, name: 'Java', category: 1 }, // 技能
  { id: 23, name: 'Python', category: 1 }, // 技能
  { id: 3, name: '运维工程师', category: 2 }, // 职位名称
  { id: 4, name: '管理', category: 3 }, // 素养
  { id: 5, name: '武汉赢月网络科技有限公司', category: 4 }, // 公司
  { id: 6, name: '职位4', category: 5 }, // 职位id
  { id: 7, name: '运维/技术支持', category: 6 }, // 职位类别
  { id: 8, name: '2-3K', category: 7 }, // 薪资
  { id: 9, name: '大专', category: 8 }, // 学历
  { id: 10, name: '武汉', category: 9 }, // 城市
  { id: 11, name: '操作系统', category: 10 } // 知识
]

// 生成模拟边数据
const edges = [
  { source: 7, target: 0, relationship: '' },
  { source: 7, target: 1, relationship: '' },
  { source: 7, target: 2, relationship: '' },
  { source: 7, target: 3, relationship: '' },
  { source: 7, target: 4, relationship: '' },
  { source: 7, target: 5, relationship: '' },
  { source: 7, target: 6, relationship: '' },
  { source: 7, target: 8, relationship: '' },
  { source: 7, target: 9, relationship: '' },
  { source: 7, target: 10, relationship: '' },
  { source: 7, target: 11, relationship: '' },
  { source: 7, target: 12, relationship: '' }
]


// 将生成的模拟数据组合成一个对象
const data = {
  nodes: nodes,
  edges: edges
}

const option = {
  // 图表配置
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    enterable: true, // 鼠标是否可进入提示框浮层中
    formatter: function(params) {
      if (params.dataType === 'node') {
        // 如果是节点，显示节点名称和类别信息
        const node = params.data
        const category = categories[node.category].name
        return `${node.name}<br/>类别: ${category}`
      } else if (params.dataType === 'edge') {
        // 如果是边，显示关系信息
        const edge = params.data
        return `${edge.source} -> ${edge.target}<br/>关系: ${edge.relationship}`
      } else {
        return '' // 其他情况为空字符串
      }
    }
  },
  color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8', '#cda819', '#32a487', '#827d34', '#5e5e5e', '#e56360'],
  textStyle: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  legend: {
    data: ['实习或全职', '技能', '职位名称', '素养', '公司', '职位id', '职位类别', '薪资', '学历', '城市', '知识']
  },
  series: [{
    type: 'graph',
    layout: 'force', // 力导图
    animation: false,
    symbolSize: 60,
    label: {
      normal: {
        show: true,
        position: 'top',
        textStyle: {
          fontSize: 15
        }
      }
    },
    labelLayout: {
      hideOverlap: true
    },
    draggable: true,
    roam: true,
    focusNodeAdjacency: true,
    force: {
      edgeLength: 250, // 连线的长度
      repulsion: 200, // 子节点之间的间距
      gravity: 0.04
    },
    categories: categories,
    data: data.nodes, // 假设data.nodes是你的节点数据
    edges: data.edges, // 假设data.edges是你的边数据

    edgeSymbol: ['', 'arrow'],
    edgeSymbolSize: [6, 6],
    edgeLabel: {
      normal: {
        show: false,
        formatter: function(x) {
          return x.data.relationship
        },
        textStyle: {
          fontSize: 10
        }
      }
    },
    lineStyle: {
      normal: {
        width: 2,
        color: '#4b565b'
      }
    }
  }]
}

</script>

<style>
/* 在这里可以添加样式 */
</style>
