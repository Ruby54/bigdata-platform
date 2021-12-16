<template>
  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card">
      <div>
        <div id="pagePathChart" style="width:100%;height:400px;"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  import api from '@/api/visit/visit'

  export default {

    // 生命周期函数：内存准备完毕，页面尚未渲染
    created() {
      console.log('list created......')
      // this.init()
    },

    // 生命周期函数：内存准备完毕，页面渲染成功
    mounted() {
      this.init()
    },

    data() {
      return {
        recentDays: this.$parent.recentDays,
        dateRange: this.$parent.dateRange,
        curDate: this.$parent.curDate,
        nodeData: []
      }
    },

    methods: {

      getParent() {
        this.curDate = this.$parent.curDate,
          this.recentDays = this.$parent.recentDays,
          this.dateRange = this.$parent.dateRange
      },
      init() {
        this.getParent()
        api.getPagePathData(this.recentDays, this.curDate).then(response => {
          this.nodeData = response.nodeData
          this.linksData = response.linksData

          this.setChartData()
        }).catch(response => {
          console.log('失败' + response)
          this.setChartData()
        })
      },

      setChartData() {
        const option = {
          color: ['#fc853e', '#28cad8', '#9564bf', '#bd407e', '#e5a214'],
          title: {
            text: '用户路径分析',
            subtext: this.dateRange
          },
          series: {
            type: 'sankey',
            layout: 'none',
            emphasis: {
              focus: 'adjacency'
            },
            data: this.nodeData,
            links: this.linksData,
            normal: {
              // （3） 类似柱状图定义多个颜色，利用函数返回不同的颜色值
              //		结果同上，全变成黑色了
              color: function(param) {
                var colorList = ['#89aae6', '#177cb0', '#5a79ba', '#98a6dd', '#8b6eaf', '#67afc8']
                return colorList[param.dataIndex]
              }
            }


          }
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pagePathChart'))

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      }
    }
  }
</script>

