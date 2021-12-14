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
    <userAction ref="userAction"/>
    <newBuyerStats ref="newBuyerStats"/>
    <userChange ref="userChange"/>
    <userStats ref="userStats"/>
    <userRetention ref="userRetention"/>
  </div>
  </template>

<script>
  import userAction from '@/views/statistics/echarts/user/userAction'
  import newBuyerStats from '@/views/statistics/echarts/user/newBuyerStats'
  import userChange from '@/views/statistics/echarts/user/userChange'
  import userStats from '@/views/statistics/echarts/user/userStats'
  import userRetention from '@/views/statistics/echarts/user/userRetention'
  export default {
    // 注册组件
    components: {
      userAction,newBuyerStats,userChange,userStats,userRetention
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
        this.$refs.userAction.init()
        this.$refs.newBuyerStats.init()
        this.$refs.userChange.init()
        this.$refs.userStats.init()
        this.$refs.userRetention.init()
      }
    }
  }
</script>
