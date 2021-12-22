<template>
  <!--头信息-->
  <div class="app-container">
    <div>
      <el-row :gutter="24" class="el-row">
        <el-col :span="24" class="el-card">
          <div class="grid-content bg-purple">
            <div label-width="30px" size="mini" style=" text-align:left;">
              {{nowTime}}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="40" class="el-row">
      <el-col :span="12" class="el-card">
        <!--省市热力图-->
        <province ref="province" :today="today"/>
        <!--新老用户对比-->
        <visitor ref="visitor" :today="today"/>
      </el-col>
      <el-col :span="12" class="el-card">
        <div class="grid-content bg-purple">
          <!--品类销售额占比-->
          <category3 ref="category3" :today="today"/>
          <!--品牌销售排行-->
          <trademark ref="trademark" :today="today"/>
        </div>
      </el-col>
    </el-row>
    <!--用户访问分时-->
    <midStatsHr ref="midStatsHr" :today="today"/>
    <!--热门商品销售-->
    <spu ref="spu" :today="today"/>


  </div>
</template>

<script>
import category3 from '@/views/statistics/echarts/realtime/category3'
import spu from '@/views/statistics/echarts/realtime/spu'
import trademark from '@/views/statistics/echarts/realtime/trademark'
import province from '@/views/statistics/echarts/realtime/province'
import visitor from '@/views/statistics/echarts/realtime/visitor'
import midStatsHr from '@/views/statistics/echarts/realtime/midStatsHr'

export default {
  // 注册组件
  components: {
    category3,trademark,spu,province,visitor,midStatsHr
  },
  data () {
    return {
      nowTime:'',
      today:20211221,
      second: 10
    }
  },
  mounted() {
    this.nowTimes();
    setInterval(() => {
      --this.second
      if (this.second < 1) {
        this.refresh()
        this.second = 10
      }
    }, 1000)
  },
  methods:{
    // // 加载banner列表数据
    dateChange(){
      this.refresh();
    },

    //显示当前时间（年月日时分秒）
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm+':'+ss ;
      this.nowTimeStamp=year+""+month+""+date;

    },
    nowTimes(){
      this.timeFormate(new Date());
      setInterval(this.nowTimes,1000);
      this.clear()
    },
    clear(){
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    },
    radioChange() {
      this.refresh();
    },
    refresh(){
      this.$refs.category3.init()
      this.$refs.spu.init()
      this.$refs.trademark.init()
      this.$refs.province.init()
      this.$refs.visitor.init()
      this.$refs.midStatsHr.init()
    }

  }
}
</script>

