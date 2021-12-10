<template  >
  <div>

    <el-table
      height="250"
      :data="tableData"
      style="width: 100%;font-size: 15px"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >

      <el-table-column
        prop="tm_name"
        label="品牌名称"
      >
        <template slot-scope="scope">
          <div v-html="scope.row.tm_name"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_count"
        label="订单数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="order_user_count"
        label="订单人数" width="150" >
      </el-table-column>
      <el-table-column
        prop="order_refund_count"
        label="退单数" width="150" >
      </el-table-column>
      <el-table-column
        prop="order_refund_user_count"
        label="退单人数" width="150" >
      </el-table-column>

    </el-table>
    <el-pagination
      :page-size="pageSize"
      :pager-count="7"
      @current-change="handleCurrentChange"
      :current-page.sync="curPageNo"
      layout="total,prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import api from "@/api/goods/goods";
  export default {

    // 生命周期函数：内存准备完毕，页面渲染成功
    mounted() {
      this.init()
    },

    data() {
      return {
        recentDays:this.$parent.recentDays,
        dateRange: this.$parent.dateRange,
        curDate: this.$parent.curDate,
        itemName:"",
        date:"",
        pageSize:20,
        curPageNo:1,
        total:0,
        tableData: []
      }
    },
    methods:{
      getParent(){
        this.recentDays=this.$parent.recentDays,
          this.dateRange=this.$parent.dateRange ,
          this.curDate=this.$parent.curDate
      },
      init(){
        this.curPageNo=1
        this.getParent()
        api.getTmTradeStats(this.recentDays,this.curDate)
          .then((response) => {
            this.tableData = response.result
            // this.total=response.total

          })
          .catch((response) => {
            console.log("失败" + response)
          })
        this.refreshTable()
      },

      refreshTable(){
        // console.log(`刷新当前页: ${this.curPageNo}`);
        // console.log(`刷新当前日期: ${this.date}`);
        // console.log(`刷新当前商品关键词: ${this.itemName}`);
        api.getTmTradeStats(this.recentDays,this.curDate)
          .then((response) => {
            this.tableData = response.result
            // this.total=response.total

          })
          .catch((response) => {
            console.log("失败" + response)
          })

      },

      handleCurrentChange(val) {
        this.refreshTable()
      }
    }
  }
</script>

<style>
  em {
    font-style: normal;
    color: red;
  }
</style>
