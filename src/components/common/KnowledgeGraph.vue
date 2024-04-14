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
  { name: '技能' },
  { name: '职位类别' },
  { name: '素养' }
]
// 技能列表
const skills = [
  'C++', '计算机', '数据库', 'C', 'Java', 'Linux', '算法', 'Spring', 'SQL', '软件工程', '设计模式', '数据结构',
  'Android', '调试', 'UI', 'APP', 'SDK', '面向对象', '动画',
  'CSS', 'Vue', 'JavaScript', 'Web', 'HTML', 'HTML5', 'React', 'CSS3', 'JS', '小程序', 'Python', 'Shell', '部署', '英语', '办公软件', 'VPN', 'CCIE', '项目管理', 'Cisco', '网络协议', '网络通信',
  'AI', '3D', 'Matlab', '控制', 'TensorFlow', 'NLP', 'pytorch', 'OpenCV', '数据分析', 'SLAM', '大数据', 'CUDA', 'OpenGL',
  '销售', '营销', 'PPT', '客服', '项目经验', '微信', '物联网', 'Oracle', 'Excel',
  'Hadoop', 'Spark', '机器人', '语言', '硬件', 'PS', '网络安全', '自动化', 'office', '安装', '电路', '通信', 'CAD', '监控', '操作系统', '优化', '嵌入式', 'ARM'
];

// 素养列表
const qualities = [
   '逻辑', '严谨', '沟通', '团队', '细致', '分析', '创新', '勤奋', '积极', '抗压', '敬业', '亲和力','执行力','总结','合作','热情','学习能力',
];

// 创建技能和素养节点
const skillNodes = skills.map((skill, index) => ({
  id: index + 1, // 技能节点ID从1开始
  name: skill,
  category: 0 // 技能类别
}));

const qualityNodes = qualities.map((quality, index) => ({
  id: skills.length + index + 1, // 素养节点ID在技能节点之后
  name: quality,
  category: 2 // 素养类别
}));

// 创建职位类别节点
const jobCategoryNodes = [
  { id: skills.length + qualities.length + 1, name: '后端开发/Java/C/C++/PHP/Python/C#/Golang/全栈', category: 1 },
  { id: skills.length + qualities.length + 2, name: '移动开发工程师', category: 1 },
  { id: skills.length + qualities.length + 3, name: '前端开发工程师', category: 1 },
  { id: skills.length + qualities.length + 4, name: '测试工程师/软件测试', category: 1 },
  { id: skills.length + qualities.length + 5, name: '运维/技术支持', category: 1 },
  { id: skills.length + qualities.length + 6, name: '人工智能/算法', category: 1 },
  { id: skills.length + qualities.length + 7, name: '销售技术支持', category: 1 },
  { id: skills.length + qualities.length + 8, name: '大数据/数据分析/数据', category: 1 },
  { id: skills.length + qualities.length + 9, name: 'IT培训', category: 1 },
  { id: skills.length + qualities.length + 10, name: '软件工程师', category: 1 },
  { id: skills.length + qualities.length + 11, name: '硬件/电子/电气', category: 1 },
];

// 合并节点列表
const nodes = [...skillNodes, ...qualityNodes, ...jobCategoryNodes];

// 定义职位类别及其对应的重要技能要求和素养要求
const jobCategorySkills = {
  '后端开发/Java/C/C++/PHP/Python/C#/Golang/全栈': [
    'C++', '计算机', '数据库', 'C', '优化', 'Java', 'Linux', '算法', 'Spring', 'SQL', '软件工程', '设计模式', '数据结构'
  ],
  '移动开发工程师': [
    'Android', '设计模式', '调试', '通信', 'UI', 'APP', '数据结构', '算法', 'C', '数据库', 'Java', 'SDK', 'app', '面向对象', '动画'
  ],
  '前端开发工程师': [
    '前端', '开发', '优化', 'CSS', 'Vue', 'JavaScript', 'Web', 'HTML', 'js', 'vue', 'HTML5', 'React', 'web', 'CSS3', 'UI', '小程序', 'JS'
  ],
  '测试工程师/软件测试': [
    '自动化', '数据库', '优化', 'Python', '调试', 'Linux', 'app', 'C', 'C++', 'SQL', 'Java', '操作系统', 'web', '软件工程', '部署', '英语', 'Shell'
  ],
  '运维/技术支持': [
    '安装', '调试', 'IP', '网络安全', '监控', '通信', '操作系统', 'TCP', '硬件', '部署', 'Linux', '数据库', '办公软件', 'VPN', 'CCIE', '项目管理', 'Cisco', '网络协议', '网络通信'
  ],
  '人工智能/算法': [
    '算法', 'C++', 'Python', 'C语言', '自动化', 'AI', 'Linux', '部署', '数据结构', '3D', 'Matlab', '控制', '机器人', 'TensorFlow', 'NLP', 'pytorch', 'OpenCV', '数据分析', 'Pytorch', 'Tensorflow', 'SLAM', '大数据', 'PyTorch', 'tensorflow', '导航', 'MATLAB', 'GPU', 'CUDA', 'matlab', 'OpenGL'
  ],
  '销售技术支持': [
    '销售', '计算机', '营销', '自动化', '办公软件', '通信', 'PPT', '数据分析', '案例', 'Word', '客服', '大数据', '项目经验', 'word', '软件工程', '微信', '物联网', 'office', 'Oracle', 'Excel'
  ],
  '大数据/数据分析/数据': [
    '计算机', '开发', '数据库', '大数据', '算法', 'SQL', '数据分析', '优化', 'Python', 'C++', 'Hadoop', 'Spark'
  ],
  'IT培训': [
    '计算机', '数据库', 'C语言', '办公软件', '机器人', '开发', '语言', '硬件', 'PS', 'python', 'Python', '安装', 'C++', '网络安全', '自动化', 'office'
  ],
  '软件工程师': [
    'C++', '计算机', 'C', '调试', '自动化', '算法', '数据库', '优化', 'Linux', '嵌入式', '操作系统', '软件工程', 'SQL', '数据结构', 'ARM', 'TCP', 'Python', '英语', 'Java', 'DSP', 'QT', 'MCU', '开发环境'
  ],
  '硬件/电子/电气': [
    '调试', '自动化', '硬件', '计算机', '开发', '安装', '电路', '通信', 'CAD', '办公软件', '监控', '控制', '操作系统', '优化', '英语', '嵌入式', 'ARM'
  ],
  // 可根据需要补充其他职位类别及其对应的技能要求
};

// 定义素养要求
const jobCategoryQualities = {
  '后端开发/Java/C/C++/PHP/Python/C#/Golang/全栈': ['学习能力', '逻辑', '严谨'],
  '移动开发工程师': ['分析', '团队', '沟通', '学习能力'],
  '前端开发工程师': ['学习能力', '总结'],
  '测试工程师/软件测试': ['学习能力', '细致'],
  '运维/技术支持': ['沟通', '严谨'],
  '人工智能/算法': ['分析', '创新', '勤奋'],
  '销售技术支持': ['沟通', '积极', '勤奋', '抗压', '敬业', '亲和力'],
  '大数据/数据分析/数据': ['分析', '合作'],
  'IT培训': ['亲和力', '创新', '热情'],
  '软件工程师': ['学习能力', '逻辑', '严谨'],
  '硬件/电子/电气': ['勤奋', '严谨', '执行力'],
  // 可根据需要补充其他职位类别及其对应的素养要求
};

// 创建边
const edges = [
  ...jobCategorySkills[jobCategoryNodes[0].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[0].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[0].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[0].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),

  ...jobCategorySkills[jobCategoryNodes[1].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[1].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[1].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[1].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),

  ...jobCategorySkills[jobCategoryNodes[2].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[2].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[2].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[2].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),
  ...jobCategorySkills[jobCategoryNodes[3].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[3].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[3].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[3].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),
  ...jobCategorySkills[jobCategoryNodes[4].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[4].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[4].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[4].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),
  ...jobCategorySkills[jobCategoryNodes[5].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[5].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[5].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[5].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),
  ...jobCategorySkills[jobCategoryNodes[6].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[6].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[6].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[6].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),
  ...jobCategorySkills[jobCategoryNodes[7].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[7].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[7].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[7].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),
  ...jobCategorySkills[jobCategoryNodes[8].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[8].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[8].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[8].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),

  ...jobCategorySkills[jobCategoryNodes[9].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[9].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[9].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[9].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  })),

  ...jobCategorySkills[jobCategoryNodes[10].name].flatMap((skill, index) => ({
    source: jobCategoryNodes[10].id - 1,
    target: skills.indexOf(skill),
    relationship: '重要技能'
  })),
  ...jobCategoryQualities[jobCategoryNodes[10].name].flatMap((quality, index) => ({
    source: jobCategoryNodes[10].id - 1,
    target: skills.length + qualities.indexOf(quality),
    relationship: '所需素养'
  }))
];

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
  color: ['#0098d9', '#e6b600', '#c12e34'],
  textStyle: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  legend: {
    data: ['技能', '职位类别', '素养',]
  },
  series: [{
    type: 'graph',
    layout: 'force', // 力导图
    animation: false,
    symbolSize: 50,
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
      edgeLength: 200, // 连线的长度
      repulsion: 1000, // 子节点之间的间距
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
    },
    // 设置初始缩放比例
    zoom: 0.4, // 初始缩放比例，可以根据需要调整
    roam: 'scale' // 开启鼠标缩放和平移漫游
  }]
}

</script>

<style>
/* 在这里可以添加样式 */
</style>
