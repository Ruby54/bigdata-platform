<template>
  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card">
    <div id="categoryChart" style="width: 100%; height: 500px" />
    </el-col>
  </el-row>
</template>


<script>
import echarts from "echarts";
import api from "@/api/goods/goods";
export default {
  // 生命周期函数：内存准备完毕，页面渲染成功
  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()
  },
  data() {
    return {
      recentDays:this.$parent.recentDays,
      dateRange: this.$parent.dateRange,
      curDate: this.$parent.curDate,
      cData: [
       // {"children":[{"children":[{"name":"米面杂粮","value":53}],"name":"粮油调味","value":53}],"name":"食品饮料、保健食品"},{"children":[{"children":[{"name":"手机","value":227}],"name":"手机通讯","value":227}],"name":"手机"},{"children":[{"children":[{"name":"平板电视","value":81}],"name":"大 家 电","value":81}],"name":"家用电器"},{"children":[{"children":[{"name":"香水","value":26},{"name":"唇部","value":95}],"name":"香水彩妆","value":121}],"name":"个护化妆"},
      ],
    };
  },

  methods: {
    getParent(){
      this.recentDays=this.$parent.recentDays,
        this.dateRange=this.$parent.dateRange ,
        this.curDate=this.$parent.curDate
    },
    // 加载banner列表数据
    init() {
      this.getParent()
      this.setChartData()
      api.getCateTradeStats(this.recentDays,this.curDate).then((response) => {
        this.cData = response;
        this.setChartData();
        })
        .catch((response) => {
          console.log("失败" + response);
          // Vue.$message.error('服务器错误，请稍后再试')
          //reject(response)
        });
    },
    setChartData() {
      const option = {
        title: {
          text: "品类下单数分布",
          subtext: this.dateRange,
          left: "left",
        },
         tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
              var value = (params.value + "").split(".");
              value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
              return  params.name + ": " + value;
            },
          },
        series: {
          type: "sunburst",
          // emphasis: {
          //     focus: 'ancestor'
          // },
          data: this.cData,
          radius: [0, "90%"],
          label: {
            rotate: "radial",
          },
        },
        visualMap: {
          left: "right",
          min: 1,
          max: 1000,
          inRange: {
            color: [
               "#A9A9A9",
              "#6495ED",
              "#4169E1",
              "#483D8B",
              "#191970",
            ],
          },
          text: ["High", "Low"], // 文本，默认为数值文本
          calculable: true,
        },
      };
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("categoryChart"));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

