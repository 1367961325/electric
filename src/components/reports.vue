<template>
  <div class="good">
    <div class="good_head">
      <div id="main"></div>
    </div>
  </div>
</template>

<script>
import { math } from "../http/axios.js";
import * as echarts from "echarts";
export default {
  props: {},
  data() {
    return {
      data:{},
    };
  },
  methods: {},
  components: {},
  mounted() {
    math().then((res) => {
      console.log(res);
      this.data=res;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "用户来源",
        },
        tooltip: {},
        xAxis:res.data.xAxis,
        yAxis: res.data.yAxis,
        legend:res.data.legend,
        series: res.data.series
      });
    });
  },
};
</script>

<style scoped lang="less">
.good {
  background-color: #fff;
  padding: 20px 20px 22px 20px;
  margin-bottom: 80px;
  margin-right: 2px;
  border-bottom: 1px solid #cbcdd1;
  border-left: 1px solid #e6e9ed;
  border-radius: 3px;
  .good_head {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    #main {
      width: 90%;
      height: 400px;
    }
  }
}
</style>
