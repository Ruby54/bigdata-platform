<template>
  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card">
          <div id="chart" ref="chart" class="chart" style="width:100%;height:280px;" />
      </el-col>
    </el-row>
</template>

<script>
import echarts from 'echarts'
import api from '@/api/realtime/realtime'

export default {
  data() {
    return {
      second: 5,
      hr: [], // x轴数据
      yUv:"",
      yPv:"",
      yNew:"",
      dauUv: [], // y轴数据
      dauPv: [], // y轴数据
      dauNew: [] // y轴数据

    }
  },
  props:{
    today:''
  },
  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    console.log('list created......')

  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()
  },

  methods: {

    getHourListData(hourCountJson){
      let countArr=[]

      for (var hrTime of this.hr) {

        let ct=  hourCountJson[hrTime]
        if(ct&&ct>0){
          countArr.push(ct)
        }else{
          countArr.push(0)
        }
      }
      return countArr

    },
    // 加载数据
    init(){
      api.getMidStatsGroupbyHourNewFlag(this.today).then(response => {
        console.log("---------"+response.data.series[0].data)
        this.hr=response.data.categories
        this.dauUv =this.getHourListData( response.data.series[0].data)
        this.dauPv =this.getHourListData( response.data.series[1].data)
        this.dauNew = this.getHourListData(response.data.series[2].data)
        this.yUv = response.data.series[0].name
        this.yPv = response.data.series[1].name
        this.yNew = response.data.series[2].name
        this.setChartData()
      }).catch( response => {
        this.setChartData()
      })
    },

    setChartData() {
      var option = {
        title: {
          text: '最近当日日活访问情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.yUv,this.yPv,this.yNew]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.hr
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.yUv,
            type: 'line',
            smooth: true ,
            stack: this.yUv,
            data: this.dauUv
          },
          {
            name: this.yPv,
            type: 'line',
            smooth: true ,
            stack: this.yPv,
            data: this.dauPv
          },
          {
            name: this.yNew,
            type: 'line',
            smooth: true ,
            stack: this.yNew,
            data: this.dauNew
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
<style>
.trend-overview-date {
  height: 30px;
  line-height:30px;
  font-size: 14px;
  color: #5d5d61;
  font-family: Arial;
}
.trend-overview-number {
  height: 40px;
  margin: 10px 0;
  font-size: 42px;
  font-weight: 700;
  color: #323437;
}
</style>
