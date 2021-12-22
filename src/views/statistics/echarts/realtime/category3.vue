<template>
  <el-row :gutter="12" class="el-row">
    <el-col :span="24" class="el-card">
      <div id="categoryChart" style="width: 100%; height: 500px" />
    </el-col>
  </el-row>
</template>


<script>
import echarts from "echarts";
import api from "@/api/realtime/realtime";
export default {
  // 生命周期函数：内存准备完毕，页面渲染成功
  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()
  },
  data() {
    return {
      cData: [
        // {"children":[{"children":[{"name":"米面杂粮","value":53}],"name":"粮油调味","value":53}],"name":"食品饮料、保健食品"},{"children":[{"children":[{"name":"手机","value":227}],"name":"手机通讯","value":227}],"name":"手机"},{"children":[{"children":[{"name":"平板电视","value":81}],"name":"大 家 电","value":81}],"name":"家用电器"},{"children":[{"children":[{"name":"香水","value":26},{"name":"唇部","value":95}],"name":"香水彩妆","value":121}],"name":"个护化妆"},
      ],
    };
  },

  props:{
    today:''
  },
  methods: {

    // 加载banner列表数据
    init() {
      this.setChartData()
      api.getProductStatsGroupByCategory3(this.today).then((response) => {
        this.cData = response.data;
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
          text: "品类的销售额占比",
          subtext: this.dateRange,
          left: "left",
        },
        tooltip: {//提示框，可以在全局也可以在
          trigger: 'item',  //提示框的样式
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          color:'#000', //提示框的背景色
          textStyle:{ //提示的字体样式
            color:"black",
          }
        },
        legend: {  //图例
          orient: 'vertical',  //图例的布局，竖直    horizontal为水平
          x: 'right',//图例显示在右边
          data:['平板电脑','手机','香水','唇部'],
          textStyle:{    //图例文字的样式
            color:'#333',  //文字颜色
            fontSize:12    //文字大小
          }
        },
        series: [
          {
            name:'访问来源',
            type:'pie', //环形图的type和饼图相同
            radius: ['50%', '70%'],//饼图的半径，第一个为内半径，第二个为外半径
            avoidLabelOverlap: false,
            //
            color:['#D1FBEF','#F9D858','#4CD0DD','#DF86F0'],
            label: {
              normal: {  //正常的样式
                show: true,
                position: 'left'
              },
              emphasis: { //选中时候的样式
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },  //提示文字
            labelLine: {
              normal: {
                show: false
              }
            },
            data:this.cData
          }
        ]
      };
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("categoryChart"));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

