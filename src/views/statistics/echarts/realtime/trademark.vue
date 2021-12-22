<template>
  <el-row :gutter="12" class="el-row">
    <el-col :span="24" class="el-card">

      <div id="tmRepeatChart" style="width:100%;height:340px;" />

    </el-col>
  </el-row>
</template>


<script>
import echarts from 'echarts'
import api from '@/api/realtime/realtime'
export default {


  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()
  },

  data () {
    return {
      limit:7,
      xData:[],
      yData:[],
      max:1000000.00,
      min:1
    }
  },
  props:{
    today:''
  },
  methods: {
    initData(xData ){
      if( xData&&xData.length>0){
        this.min= xData[0]
        this.max= xData[xData.length-1]
      }
    },

    // 加载banner列表数据
    init() {
      this.setChartData()
      api.getProductStatsByTrademark(this.today,this.limit).then(response => {
        this.xData =response.xData
        this.yData =response.yData
        this.initData(this.xData )
        this.setChartData()
      }).catch( response => {
        console.log('失败'+response)
        // Vue.$message.error('服务器错误，请稍后再试')
        //reject(response)
      })
    },

    setChartData() {
      const option = {
        title: {
          text: '品牌销售排行',
          subtext:this.dateRange
        } ,
        yAxis: {
          type: 'category',
          data: this.yData
        },
        xAxis: {
          type: 'value'
        },
        series: [{
          data: this.xData,
          type: 'bar'
        }],
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: this.min,
          max: this.max,
          text: [this.max, this.min],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#FFD2D2',   '#930000']
          }
        }

      };
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('tmRepeatChart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

