<template>
    <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card">
      <div align="center">
      <span style="font-size:20px; font-weight: bold">({{dateRange}}) 用户新增活跃统计</span>
      </div>
    <div>
    <el-table
      :data="tableData"
      :cell-style="rowStyle"
      :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="统计日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="新增用户数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="活跃用户数">
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
</style>
<script>
  import api from "@/api/user/user";
  export default {
    data() {
      return {
        dateRange: this.$parent.dateRange,
        tableData: []
      }
    },
    mounted() {
      this.init()
    } ,
    methods: {
      rowStyle(){
        return "text-align:center;font-weight:bold"
      },
      getParent(){
        this.recentDays=this.$parent.recentDays,
          this.dateRange=this.$parent.dateRange ,
          this.curDate=this.$parent.curDate
      },
      // 加载banner列表数据
      init() {
        this.getParent()
        api.getUserStatsByDaysAndDt(this.recentDays,this.curDate).then(response => {

          this.tableData = [{
            date: response.dt,
            name: response.new_user_count,
            address: response.active_user_count
          }]
        }).catch( response => {
          console.log('失败'+response)
        })
      }
    }
  }
</script>
