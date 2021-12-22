<template  >
  <div>
    <span>热门商品销售</span>
    <el-table
      height="250"
      :data="tableData"
      style="width: 100%;font-size: 15px"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >

      <el-table-column
        prop="spu_id"
        label="序号"
      >
        <template slot-scope="scope">
          <div v-html="scope.row.spu_id"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="spu_name"
        label="商品名称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="order_amount"
        label="交易额" width="150" >
      </el-table-column>
      <el-table-column
        prop="order_ct"
        label="订单数" width="150" >
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
import api from "@/api/realtime/realtime";
export default {

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()
  },
  props:{
    today:''
  },
  data() {
    return {
      itemName:"",
      date:"",
      pageSize:20,
      curPageNo:1,
      total:0,
      limit:10,
      tableData: []
    }
  },
  methods:{
    init(){
      this.curPageNo=1
      api.getProductStatsGroupBySpu(this.today,this.limit)
        .then((response) => {
          console.log("%%%%%%"+response)
          this.tableData = response
          this.total=response.total
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
      api.getProductStatsGroupBySpu(this.today,this.limit)
        .then((response) => {
          this.tableData = response
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
