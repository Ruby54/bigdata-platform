<template>
  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card">
      <div align="center" style="width:100%;height:400px" ref="categoryChart">
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import echarts from "echarts";
  import api from "@/api/user/user";
  var res;
  export default {
    data() {
      return {
      };
    },
    methods: {
      getParent() {
          this.recentDays = this.$parent.recentDays,
          this.dateRange = this.$parent.dateRange ,
          this.curDate = this.$parent.curDate
      },
      init() {
        this.getParent()
        console.log("categoryPie:" + this.recentDays)
        api.getUserActionByDaysAndDt(this.recentDays,this.curDate)
          .then(response => {
            res=response
             this.make();
          }).catch((response) => {
            console.log("失败" + response)
          })
      },
      make() {
        this.chart = echarts.init(this.$refs.categoryChart);
        const option = {
          title: {
            top: 20,
            text: "( "+this.dateRange+" ) "+"用户行为漏斗分析",
            left: "center",
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            top : 75,
            data: ['home_count','good_detail_count','cart_count','order_count','payment_count']
          },

          series: [
            {
              name:'漏斗图',
              type:'funnel',
              top: 120,
              left: '10%',//宽度是80% 图表居中 那就是左边10%即可！
              bottom: 18,
              width: '80%',
              min: 0,
              max: 120,
              minSize: '0%',
              maxSize: '100%',
              gap: 2,
              label: {
                show: true,
                position: 'inside'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              },
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              data: [
                {value: res.cart_count, name: "cart_count"},
                {value: res.order_count, name: 'order_count'},
                {value: res.payment_count, name: 'payment_count'},
                {value: res.good_detail_count, name: 'good_detail_count'},
                {value: res.home_count, name: 'home_count'}
              ]
            }
          ]
        };
        this.chart.setOption(option);
        window.onresize = this.chart.resize;//自适应窗口大小！！百度谷歌真是一个好东西！
      }
    },
    mounted() {
      this.init();
    },

  };
</script>

