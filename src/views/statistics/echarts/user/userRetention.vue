<template>
  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card">
      <div align="center">
        <span style="font-size:20px; font-weight: bold">留存率</span>
      </div>
  <div>
    <!--<el-row :gutter="24" class="el-row">-->
      <!--<span style="font-weight: bold">留存率</span>-->
    <!--</el-row>-->
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}">
      <el-table-column prop="date" label="时间" align="center"></el-table-column>
      <el-table-column prop="new_user_count" label="新增用户" align="center" border></el-table-column>
      <el-table-column prop="day1" label="一天后" align="center" >
        <template slot-scope="scope">
          <div    v-if="parseFloat(scope.row.day1) >0" style="background: #E6F7FF;color: black;position: absolute;top: 0;left: 0;
    height: 100%;width: 100%;">{{scope.row.day1+" %"}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="day2" label="两天后" align="center">
        <template slot-scope="scope">
          <div  v-if="parseFloat(scope.row.day2) >0" style="background: #E6F7FF;color: black;position: absolute;
    top: 0;left: 0;height: 100%;width: 100%;">{{scope.row.day2+" %"}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="day3" label="三天后"align="center">
        <template slot-scope="scope">
          <div  v-if="parseFloat(scope.row.day3) >0" style="background: #E6F7FF;color: black;position: absolute;top: 0;left: 0;height: 100%;
    width: 100%;">{{scope.row.day3+" %"}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="day4" label="四天后"align="center">
        <template slot-scope="scope">
          <div  v-if="parseFloat(scope.row.day4) >0" style="background: #E6F7FF;color: black;
          position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;">{{scope.row.day4+" %"}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="day5" label="五天后"align="center">
        <template slot-scope="scope">
          <div  v-if="parseFloat(scope.row.day5) >0" style="background: #E6F7FF;color: black;
          position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;">{{scope.row.day5+" %"}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="day6" label="六天后"align="center">
        <template slot-scope="scope">
          <div  v-if="parseFloat(scope.row.day6) >0" style="background: #E6F7FF;color: black;position: absolute;
    top: 0;left: 0;height: 100%;width: 100%;">{{scope.row.day6+" %"}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="day7"
        label="七天后"align="center">
        <template slot-scope="scope">
          <div  v-if="parseFloat(scope.row.day7) >0" style="background: #E6F7FF;color: black;
          position: absolute;align: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;">{{scope.row.day7+" %"}}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
    </el-col>
  </el-row>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table__row>td{
    /* 去除表格线 */
    border: none;
  }
  .verticalAlign {

  display: table-cell;
  vertical-align: middle; }

</style>
<script>
  import api from "@/api/user/user";
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      this.init()
    } ,
    methods: {
      getParent(){
        this.recentDays=this.$parent.recentDays,
        this.dateRange=this.$parent.dateRange ,
        this.curDate=this.$parent.curDate
      },
      init() {
        this.getParent()
        api.getUserRetentionByDt(this.curDate).then(response => {
          this.tableData=[]//清空表格数据 重新加载
          for(let key in response){
            this.tableData.push(
              { date: key,
                new_user_count: response[key][0],
                day1: response[key][1],
                day2: response[key][2],
                day3: response[key][3],
                day4: response[key][4],
                day5: response[key][5],
                day6: response[key][6],
                day7: response[key][7]}
            )
          }
        //队获得数据进行处理
        }).catch( response => {
          console.log('失败'+response)
        })
      }
    }
  }
</script>
