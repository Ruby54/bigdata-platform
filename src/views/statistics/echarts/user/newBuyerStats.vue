<template>
  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card">
      <div align="center">
        <span style="font-size:20px; font-weight: bold">({{dateRange}}) 新增交易用户统计</span>
      </div>
  <div >
    <el-table   border
                :data="tableData"
                :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center','font-weight':'bold'}"
                :cell-style="rowStyle">
      <el-table-column
        prop="date"
        label="统计日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="新增下单人数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="新增支付人数">
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
        api.getNewBuyerStatsByDaysAndDt(this.recentDays,this.curDate).then(response => {
            this.tableData=[{
                date: response.dt,
                name: response.new_order_user_count,
                address: response.new_payment_user_count
             }]
        }).catch( response => {
          console.log('失败'+response)
        })
      }
    }
  }
</script>
