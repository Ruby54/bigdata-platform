<template>
  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card">
  <div>
    <div id="pagePathChart" style="width:100%;height:280px;" />
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

  data () {
    return {
      recentDays:this.$parent.recentDays,
      dateRange: this.$parent.dateRange,
      curDate:this.$parent.curDate,
      nodeData:[]
    }
  },

  methods: {

     getParent(){
       this.curDate=this.$parent.curDate,
         this.recentDays=this.$parent.recentDays,
         this.dateRange=this.$parent.dateRange
     },
    init() {
      this.getParent()
      api.getPagePathData(this.recentDays,this.curDate).then(response => {
        this.nodeData = response.nodeData
        this.linksData = response.linksData
 
        this.setChartData()
      }).catch( response => {
          console.log('失败'+response)
         this.setChartData()
        })
    },

    setChartData() {
      const option = {
       title: {
        text: '页面流向图',
        subtext:this.dateRange 
      },
       series: {
        type: 'sankey',
        layout: 'none',
        emphasis: {
            focus: 'adjacency'
        },
        data: this.nodeData,
        links: this.linksData
    }
};
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('pagePathChart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

