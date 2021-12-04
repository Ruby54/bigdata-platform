<template>
  <div class="app-container calendar-list-container">
    <div style="margin-bottom: 15px;" class="block">
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>&nbsp;&nbsp;
      <el-input placeholder="选择"   style="width: 140px" clearable
                @keyup.enter.native="getList"/>&nbsp;&nbsp;
      <el-button type="primary" size="medium" icon="el-icon-search" @click="getList" style="width: 100px;">查询</el-button>
    </div>
    <div id="spuGMVChart" style="width:100%;height:340px;" />



    <!--
        &lt;!&ndash;由listLoading决定是否加载&ndash;&gt;
        <el-table stripe :data="list" v-loading="listLoading" element-loading-text="Loading..." border fit highlight-current-row
                  style="width: 100%" @selection-change="handleSelectionChange">

        </el-table>
    -->

  </div>

</template>

<script>
import order from '@/api/statistics/order'
import echarts from 'echarts'


export default {

  name: 'recordChart',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      query:{
        startTime:"",
        endTIme :""
      },
      value2:"",
      xData:this.xData,
      yData:this.yData,
      max:1000,
      min:1,
      countData:""
    };
  },
  mounted(){
    this.setChartData();
  },
  methods: {
    initData(xData ){
      if( xData&&xData.length>0){
        this.min= xData[0]

        this.max= xData[xData.length-1]
      }
    },
    // 获得Tasktag列表
    getList() {
      this.query.startTime =this.value2[0];
      this.query.endTime =this.value2[1];
      order.getOrderUserData(this.query).then(response => {
        this.xData = response.xData
        console.log()
        this.yData = response.yData
        this.initData(this.xData )

        this.setChartData()
      }).catch( response => {
        console.log('失败'+response)
        // Vue.$message.error('服务器错误，请稍后再试')
        //reject(response)
      })
    },
  //   drawChart() {
  //     // 基于准备好的dom，初始化echarts实例
  //     let myChart = this.$echarts.init(document.getElementById("main"));
  //     // 指定图表的配置项和数据
  //     let option = {
  //       title: {
  //         text: "ECharts 入门示例"
  //       },
  //       tooltip: {},
  //       legend: {
  //         data: ["销量"]
  //       },
  //       xAxis: {
  //         data: this.countData.yData
  //       },
  //       yAxis: {},
  //       series: [
  //         {
  //           name: "销量",
  //           type: "bar",
  //           data: this.countData.xData
  //         }
  //       ]
  //     };
  //     // 使用刚指定的配置项和数据显示图表。
  //     myChart.setOption(option);
  //   }
  // },
  // mounted() {
  //   this.drawChart();
  // }
    setChartData() {
      const option = {
        title: {
          text: '订单用户数'
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
            color: ['#67BF7F',   '#007F54']
          }
        }

      };
      // 基于准备好的dom，初始化echarts实例
      var myChart =  this.$echarts.init(document.getElementById('spuGMVChart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
