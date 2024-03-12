<script>
import * as echarts from "echarts";
import china from './echarts最新中国地图jsjson数据文件/json/china.json'
export default {
  name: "HelloWorld",
  props: {
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    echarts.registerMap('china', china);
    let option = {
      series: [
        {
          type: "map",
          map: 'china', // 引入地图数据
          name: "在招职位",
          data: [
              { "name": "北京", "value": 43760 },
              { "name": "天津", "value": 16737 },
              { "name": "上海", "value": 47218 },
              { "name": "重庆", "value": 30145 },
              { "name": "河北", "value": 43944 },
              { "name": "河南", "value": 59132 },
              { "name": "云南", "value": 30021 },
              { "name": "辽宁", "value": 30209 },
              { "name": "黑龙江", "value": 15883 },
              { "name": "湖南", "value": 50012 },
              { "name": "安徽", "value": 47050 },
              { "name": "山东", "value": 92069 },
              { "name": "新疆", "value": 19125 },
              { "name": "江苏", "value": 128222 },
              { "name": "浙江", "value": 82553 },
              { "name": "江西", "value": 32200 },
              { "name": "湖北", "value": 55803 },
              { "name": "广西", "value": 27202 },
              { "name": "甘肃", "value": 11863 },
              { "name": "山西", "value": 25698 },
              { "name": "内蒙古", "value": 24627 },
              { "name": "陕西", "value": 33786 },
              { "name": "吉林", "value": 13531 },
              { "name": "福建", "value": 54355 },
              { "name": "贵州", "value": 20913 },
              { "name": "广东", "value": 135673 },
              { "name": "青海", "value": 3799 },
              { "name": "西藏", "value": 2392 },
              { "name": "四川", "value": 60132 },
              { "name": "宁夏", "value": 5314 },
              { "name": "海南", "value": 7551 },
              { "name": "台湾", "value": 56000 },
              { "name": "香港", "value": 40000 },
              { "name": "澳门", "value": 8000 }
          ],
        },
      ],
      tooltip: {
        trigger: "item",
      },
      visualMap: {
        left: "right",
        min: 0,
        max: 70000,
        inRange: {
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        text: ["High", "Low"],
        calculable: true,
      },
    };
    myChart.setOption(option);
  },
};
</script>

<template>
  <div id="main" style="width: 485px; height: 485px;"></div>
</template>

<style scoped>

</style>
