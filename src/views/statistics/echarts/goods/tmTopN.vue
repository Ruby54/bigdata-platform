<template>

  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card">
      请选择：<el-select v-model="category1" placeholder="请选择" class="dialog-input"  @change="getCategory2">
      <el-option v-for="(item,index) in category1Options" :key="item.index" :label="item.name" :value="item.lable"/>
    </el-select>
      <el-select v-model="category2" placeholder="请选择" class="dialog-input" @change="getCategory3">
        <el-option v-for="(item,index) in category2Options" :key="item.index" :label="item.name" :value="item.lable"/>
      </el-select>
      <el-select v-model="category3" placeholder="请选择" class="dialog-input" @change="getTmTopNData">
        <el-option v-for="(item,index) in category3Options" :key="item.index" :label="item.name" :value="item.lable"/>
      </el-select>
          <!--<select v-model="FormData.CityId" v-on:change="getCounty">-->
            <!--<option v-for="a in cityItem" :value="a.CId">{{a.CName}}</option>-->
          <!--</select>- -->
          <!--<select v-model="FormData.CountyId">-->
            <!--<option v-for="a in countyItem" :value="a.CId">{{a.CName}}</option>-->
          <!--</select>-->
    <div id="tmChart" style="width:100%;height:340px;" />
    </el-col>
  </el-row>
 
</template>


<script>
import echarts from 'echarts'
import api from '@/api/goods/goods'
export default {
 

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()

    this.getCategory1()

  },

  data () {
    return {
      recentDays:this.$parent.recentDays,
      dateRange: this.$parent.dateRange,
      curDate: this.$parent.curDate,
      showNum:7,
      xData:[],
      yData:[ ],
      max:1000,
      min:1,
      category1:"",
      category2:"",
      category3:"",
      selectItem: [],//部门
      category1Options: [],//一级分类
      category2Options: [],//二级分类
      category3Options: []//三级分类
    }
  },

  methods: {
    getParent(){
      this.curDate= this.$parent.curDate,
        this.dateRange=this.$parent.dateRange
    },
    //一级分类
    getCategory1() {
      api.getCategory1(this.curDate).then(response => {
        console.log("----------------"+response.result)
        this.category1Options = response.result;
      })
    },
    //二级分类
    getCategory2() {
      console.log(this.category1)
      api.getCategory2(this.curDate,this.category1).then(response => {
        this.category2Options = response.result;
      })
    },
    //三级级分类
    getCategory3() {
      this.countyItem = [];
      api.getCategory3(this.curDate,this.category1,this.category2).then(response => {
        this.category3Options = response.result;
      })
    },
    getTmTopNData(){
      api.getTmTopNData(this.curDate,this.category1,this.category2,this.category3).then(response => {
        this.xData = response.xData
        this.yData = response.yData
        this.initData(this.xData )
        this.setChartData()

      }).catch( response => {
        console.log('失败'+response)
        // Vue.$message.error('服务器错误，请稍后再试')
        //reject(response)
      })
    },
    initData(xData ){
        if( xData&&xData.length>0){
           this.min= xData[0]  
           this.max= xData[xData.length-1] 
        }
    },
    // 加载banner列表数据
    init() {
      this.getParent()
      this.setChartData()

    },

    setChartData() {
      const option = {
    title: {
        text: '分类商品购物车存量Top',
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
            color: ['#94AAD6', '#103667']
        }
    }
 
};
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('tmChart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

