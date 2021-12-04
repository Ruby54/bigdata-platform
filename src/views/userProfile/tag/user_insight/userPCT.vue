<template>
 
 
      <div id="userPCTChart" style="width:100%;height:500px;" />
 
 
</template>


<script>
import echarts from 'echarts'
import api from '@/api/statistics/api'
export default {

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    // this.init()
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()
  },

  data () {
    return {
      curDate:'',
      xData:  ['05/11','05/12','05/13','05/14','05/15','05/16'],
      yData:[100,230,500,134,550,400  ]
    }
  },

  methods: {

    // 加载banner列表数据
     getParent(){
        this.curDate=this.$parent.$parent.$parent.curDate
    },
    init() {
      this.getParent()
      // api.getUserPaidData(this.recentDays,this.curDate).then(response => {
      //  console.log(response.xData) 
      //  console.log(response.yData) 
      //     this.xData = response.xData
      //     this.yData = response.yData
 
      //   this.setChartData()
      // }).catch( response => {
      //     console.log('失败'+response)
      //     // Vue.$message.error('服务器错误，请稍后再试')
      //     //reject(response)
      //   })
    },

    setChartData() {
     const option = {
        title: {
          text: '客单价变化',
          subtext:this.dateRange
        },
        xAxis: {
          type: 'category',
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.yData,
          type: 'line'
        }]
      }
 
 
      // 基于准备好的dom，初始化echarts实例
      var userPCTChart = echarts.init(document.getElementById('userPCTChart'))

      // 使用刚指定的配置项和数据显示图表。
      userPCTChart.setOption(option)
    }
  }
}
</script>

