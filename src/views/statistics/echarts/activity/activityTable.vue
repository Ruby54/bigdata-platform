<template>
  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card" align="center">
      <div class="grid-content bg-purple">

        <el-row :gutter="24" class="el-row">
        <el-form :inline="true"   class="demo-form-inline">
          <el-form-item label="活动时间" >
            <el-date-picker v-model="selectDay" type="date" placeholder="选择日期" @change="dataSearch" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动名称" >
            <el-select v-model="query.activityName" placeholder="请选择" class="dialog-input">
              <el-option v-for="(item,index) in activeNameOptions" :key="item.index" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
       </el-form>
        </el-row>
    <!--由listLoading决定是否加载-->
    <el-table stripe :data="list" v-loading="listLoading" element-loading-text="Loading..."
              border fit highlight-current-row
              style="width: 100%;margin:20px 0" align="center" :header-cell-style="{background:'#eef1f6',color:'#606266'}" >
      <el-table-column
        prop="activity_id"
        label="活动ID"
        width="300">
      </el-table-column>
      <el-table-column
        prop="activity_name"
        label="活动名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="start_date"
        label="活动开始时间"   >
      </el-table-column>
      <el-table-column
        prop="reduce_rate"
        label="补贴率(%)"  width="200"  :formatter="formatRate">
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="query.pageNo"
                     :page-sizes="[10,20,30,50]" :page-size="query.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
    </el-col>
  </el-row>
</template>


<script>
import api from '@/api/statistics/activity'
import {parseTime} from '@/utils'

const now = parseTime(new Date(new Date().getTime()), '{y}-{m}-{d}')
export default {
  data() {
    return {
      selectDay:new Date(),
      activityName:'',
      activeNameOptions:[],
      query:{
        selectDay:now,
        activityName :""
      },
      total: null,
      list: null,
      listLoading: false
    };
  },
  created() {
    this.initData({});
  },
   methods: {
     handleSizeChange(val) {
       this.query.pageSize = 1
       this.getActivityList();
     },
     handleFilter() {
       this.query.pageNo = 1;
       this.getActivityList();
     },
     handleCurrentChange(val) {
       this.query.pageNo = val
       his.getActivityList();
     },
     dataSearch() {
       this.query.selectDay = this.selectDay
       this.getActivityName()

     },
     async initData(data) {
       //获取当前时间
       var now   = new Date();
       var monthn = now.getMonth()+1;
       var yearn  = now.getFullYear();
       var dayn = now.getDate();
       this.selectDay = yearn+"-"+monthn+"-"+dayn;

       this.getActivityName();
     },
     async getActivityName(data) {
       api.getActivityNameByDt(this.query).then(response => {
         console.log("-----"+response)
         this.activeNameOptions = response;
         console.log(this.activeNameOptions)
       })
     },
     flushCurrent(p, type) {
       if (type === 'del') {
         if (p > (((this.total - 1) / this.query.pageSize)) + 1) {
           p = p - 1
         }
       } else {
         if (p > (((this.total + 1) / this.query.pageSize)) + 1) {
           p = p + 1
         } else {
           p = (this.total + 1) / this.query.pageSize + (this.total + 1) % this.query.pageSize
         }
       }
       this.query.pageNo = p
       this.getList()
     },

     formatRate(row,col,value,index){
       return parseFloat(value).toFixed(2) +"%"

     },
     getActivityList(){
       api.getActivityList(this.query).then(response => {
         console.log("-----"+response.result)
         if (response.status === 200) {
           this.listLoading = true
           this.list = response.result
           this.listLoading = false
         }

       })
     }
}

}
</script>

