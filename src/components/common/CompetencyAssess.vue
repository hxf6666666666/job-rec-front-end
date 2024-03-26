<template>
  <div class="flex mt-15">
    <n-card class="w-100%" embedded hoverable size="small" title="期望职位类型">
      <n-select class="w-30%" v-model:value="type_value2" :options="types2" clearable placeholder="职位类型" />
      <n-divider></n-divider>
      <n-alert type="info" title="职位简介" :bordered="false">
        前端工程师是负责开发网站或Web应用程序用户界面的专业人员。<br>
        他们利用HTML、CSS和JavaScript等技术，将网站的设计转化为用户可以与之交互的实际界面。<br>
        前端工程师需要关注用户体验、页面性能优化、跨浏览器兼容性等方面，以确保网站在不同设备上都能良好地运行。<br>
        他们通常与设计师、后端工程师和产品经理等团队成员合作，共同完成项目的开发与维护工作。
      </n-alert>
    </n-card>
  </div>
  <div class="flex mt-15">
    <n-card class="w-20% items-center" embedded hoverable size="small" title="综合得分">
      <n-progress type="circle" :percentage="88" color="#FF8C00" />
    </n-card>
    <n-card class="ml-25 w-20% items-center" embedded hoverable size="small" title="学历匹配度">
      <n-progress type="circle" :percentage="100" color="#C78C00" />
    </n-card>
    <n-card class="ml-25 w-20% items-center" embedded hoverable size="small" title="专业匹配度">
      <n-progress type="circle" :percentage="100" color="#3CB371" />
    </n-card>
    <n-card class="ml-25 w-20% items-center" embedded hoverable size="small" title="技能得分">
      <n-progress type="circle" :percentage="81" />
    </n-card>
    <n-card class="ml-25 w-20% items-center" embedded hoverable size="small" title="素养得分">
      <n-progress type="circle" :percentage="89" color="#C71585"/>
    </n-card>
  </div>
  <div class="flex mt-15">
    <n-card hoverable size="small" title="评价明细">
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        default-expand-all
        size="small"
      />
    </n-card>
  </div>
  <div class="flex mt-15">
    <n-card hoverable size="small" title="提升建议" embedded>
      <n-alert type="info" :bordered="false">
        以下内容由AI大模型根据简历内容及能力评价结果自动生成，仅供参考！
      </n-alert>
      <n-divider></n-divider>
      <n-alert class="mt-10" type="success" :bordered="false">
        熟练掌握了HTML、CSS、JavaScript等基础技术，为前端开发打下了坚实的基础。
      </n-alert>
      <n-alert class="mt-10" type="success" :bordered="false">
        具备良好的团队合作能力和沟通能力，能够有效地与团队成员合作，推动项目的顺利进行。
      </n-alert>
      <n-alert class="mt-10" type="error" :bordered="false">
        尽管已熟悉React.js等主流框架，但缺乏对其他前端框架的了解，建议扩展技术视野，学习更多前端框架。
      </n-alert>
      <n-alert class="mt-10" type="error" :bordered="false">
        缺乏对前端工程化和性能优化的深入了解，建议深入学习Webpack、Babel等工具，并掌握性能优化的最佳实践。
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
    <n-card class="w-100%" size="small" title="职位图谱">
      <KnowledgeGraph></KnowledgeGraph>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import KnowledgeGraph from '@/components/common/KnowledgeGraph.vue'
import { h, defineComponent } from "vue";
import { NTag, NButton,NRate } from "naive-ui";



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

const createColumns = () => {
  return [
    {
      title: "#",
      key: "key",
      render: (_, index) => {
        return `${index + 1}`;
      }
    },
    {
      title: "评分项",
      key: "type"
    },
    {
      title: "参考标准",
      key: "name",
      render(row) {
        // 根据类型设置标签颜色
        const tagColor = row.type.includes("技能") ? "info" : (row.type.includes("素养") ? "primary" : "warning");

        // 将标签数组分成多个子数组，每个子数组最多包含3个标签
        const chunkedTags = row.name.reduce((result, tagKey, index, array) => {
          if (index % 3 === 0) {
            result.push(array.slice(index, index + 3));
          }
          return result;
        }, []);

        // 创建标签的渲染函数
        const renderTags = (tags) => {
          return tags.map((tagKey) => {
            return h(
              NTag,
              {
                style: {
                  marginRight: "6px",
                  marginTop: "3px"
                },
                type: tagColor,
                bordered: false
              },
              {
                default: () => tagKey
              }
            );
          });
        };
        // 渲染所有标签行
        return chunkedTags.map((tags, index) => {
          // 使用br元素来换行
          return h('div', { key: index }, [renderTags(tags), h('br')]);
        });
      }
    },
    {
      title: "重要程度",
      key: "importance",
      render(row) {
        return h(
          NRate,
          {
            readonly: true,
            defaultValue: row.importance.toString()
          }
        )
      }
    },
    {
      title: "匹配结果",
      key: "tags",
      render(row) {
        const tags = row.tags.map((tagKey) => {
          const tagColor = tagKey.includes("不匹配") ? "error" : "success";
          return h(
            NTag,
            {
              style: {
                marginRight: "6px"
              },
              type: tagColor,
              bordered: false
            },
            {
              default: () => tagKey
            }
          );
        });
        return tags;
      }
    },
  ];
};

const createData = () => [
  {
    key: 0,
    type: "学历",
    name: ["本科及以上"],
    importance: 5,
    tags: ["匹配"],
  },
  {
    key: 1,
    type: "专业",
    name: ["计算机科学与技术","软件工程","人工智能","数据科学与大数据技术","医学信息工程"],
    importance: 4,
    tags: ["匹配"],
  },
  {
    key: 2,
    type: "技能",
    name: ["Java"],
    importance: 4,
    tags: ["匹配"],
  },
  {
    key: 3,
    type: "技能",
    name: ["HTTP"],
    importance: 3,
    tags: ["匹配"],
  },
  {
    key: 4,
    type: "技能",
    name: ["MySQL"],
    importance: 4,
    tags: ["匹配"],
  },
  {
    key: 5,
    type: "技能",
    name: ["SpringBoot"],
    importance: 4,
    tags: ["不匹配"],
  },
  {
    key: 6,
    type: "素养",
    name: ["认真"],
    importance: 1,
    tags: ["不匹配"],
  },
  {
    key: 7,
    type: "素养",
    name: ["爱学习"],
    importance: 2,
    tags: ["匹配"],
  },
];
const data =  createData();
const columns = createColumns();

</script>

<style scoped>

</style>
