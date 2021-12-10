<template>
  <!--头信息-->
  <div class="app-container">
    <div>
      <el-row :gutter="24" class="el-row">
        <el-col :span="24" class="el-card">
          <div class="grid-content bg-purple">
            <el-col :span="18">

              <el-radio-group v-model="dateRange" @change="radioChange()">
                <!-- <el-radio-button label="访客数"></el-radio-button> -->
                <el-radio-button label="昨日"></el-radio-button>
                <el-radio-button label="近7日"></el-radio-button>
                <el-radio-button label="近30日"></el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="6">
              <el-form :inline="true" class="demo-form-inline "    >
                <el-form-item label=" 当前日期" >
                  <el-date-picker
                    v-model="curDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    @change="dateChange()"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
    <tmRepeat ref="tmRepeat"/>
    <categorySunbrust ref="categorySunbrust"/>

    <tmTopN ref="tmTopN"/>
    <tmTradeStats ref="tmTradeStats"/>
  </div>
</template>

<script>
  import tmRepeat from '@/views/statistics/echarts/goods/tmRepeat'
  import categorySunbrust from '@/views/statistics/echarts/goods/categorySunbrust'
  import tmTopN from '@/views/statistics/echarts/goods/tmTopN'
  import tmTradeStats from '@/views/statistics/echarts/goods/tmTradeStats'


  export default {
    // 注册组件
    components: {
      tmRepeat,categorySunbrust,tmTopN,tmTradeStats
    },
    data () {
      return {
        recentDays:7,
        dateRange:"近7日",
        curDate: new Date().toISOString().substring(0, 10),
      }
    },
    mounted() {
      this.setParent();
    },
    methods:{
      // 加载banner列表数据
      setParent() {
        this.$parent.curDate = this.curDate;
        this.$parent.recentDays = this.recentDays;
        this.$parent.dateRange = this.dateRange;
      },
      dateChange(){
        this.setParent();
        this.refresh();
      },


      radioChange() {
        // debugger
        if (this.dateRange == "近30日") {
          this.recentDays = 30;
        } else if (this.dateRange == "近7日") {
          this.recentDays = 7;
        } else if (this.dateRange == "昨日") {
          this.recentDays = 1;
        }
        this.setParent();
        this.refresh();
      },
      refresh(){
        this.$refs.tmRepeat.init()
        this.$refs.categorySunbrust.init()
        this.$refs.tmTopN.init()


      }


    }
  }
</script>

