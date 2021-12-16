<template  >
  <div>
    <span slot="title_slot" >
         各渠道流量统计
        </span>

    <el-table
      height="250"
      :data="tableData"
      style="width: 100%;font-size: 15px"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >

      <el-table-column
        prop="channel"
        label="渠道"
      >
        <template slot-scope="scope">
          <div v-html="scope.row.channel"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="uv_count"
        label="访客人数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="avg_duration_sec"
        label="会话平均停留时长" width="300" >
      </el-table-column>
      <el-table-column
        prop="avg_page_count"
        label="会话平均浏览页面数" width="300" >
      </el-table-column>
      <el-table-column
        prop="sv_count"
        label="会话数" width="150" >
      </el-table-column>
      <el-table-column
        prop="bounce_rate"
        label="跳出率" width="150" >
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="query.pageNo"
        :page-sizes="[20,50,100]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import api from "@/api/visit/visit";
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
        tableData: [],
        query: {
          pageNo: 1,
          pageSize: 50,
          keyWords: "",
          queryType: 0,
          businessLineId: undefined,
          mine: true,
          includeDeleted: false,
          online: ""
        },
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
        api.getTrafficStats(this.recentDays,this.curDate)
          .then((response) => {
            console.log("--------------------------------"+response)
            this.tableData = response
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
