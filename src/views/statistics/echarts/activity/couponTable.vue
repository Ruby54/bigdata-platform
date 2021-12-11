<template>
  <el-row :gutter="24" class="el-row">
    <el-col :span="24" class="el-card" align="center">
      <div class="grid-content bg-purple">

        <el-row :gutter="24" class="el-row">
          <el-form :inline="true"   class="demo-form-inline">
            <el-form-item label="优惠券时间" >
              <el-date-picker v-model="startDate" type="date" placeholder="选择日期" @change="dataSearch" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="优惠券名称" >
              <el-select v-model="query.couponName" placeholder="请选择" class="dialog-input">
                <el-option v-for="(item,index) in couponNameOptions" :key="item.index" :label="item" :value="item"/>
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
            prop="coupon_id"
            label="优惠券ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="coupon_name"
            label="优惠券名称"
            width="230">
          </el-table-column>
          <el-table-column
            prop="start_date"
            label="活动开始时间"   >
          </el-table-column>
          <el-table-column
            prop="rule_name"
            label="优惠规则"   width="500" >
          </el-table-column>
          <el-table-column
            prop="reduce_rate"
            label="补贴率(%)"  width="120" :formatter="formatRate" >
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
  import api from '@/api/statistics/coupon'
  import {parseTime} from '@/utils'

  const now = parseTime(new Date(new Date().getTime()), '{y}-{m}-{d}')
  export default {
    data() {
      return {
        startDate:new Date(),
        couponName:'',
        couponNameOptions:[],
        query:{
          startDate:now,
          couponName :""
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
        this.getCouponList();
      },
      handleFilter() {
        this.query.pageNo = 1;
        this.getCouponList();
      },
      handleCurrentChange(val) {
        this.query.pageNo = val
        his.getCouponList();
      },
      dataSearch() {
        this.query.startDate = this.startDate
        this.getCouponName()

      },
      async initData(data) {
        //获取当前时间
        var now   = new Date();
        var monthn = now.getMonth()+1;
        var yearn  = now.getFullYear();
        var dayn = now.getDate();
        this.startDate = yearn+"-"+monthn+"-"+dayn;

        this.getCouponName();
      },
      async getCouponName(data) {
        api.getCouponNameByStartDate(this.query).then(response => {
          console.log("-----"+response)
          this.couponNameOptions = response;
          console.log(this.couponNameOptions)
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
        this.getCouponList()
      },

      formatRate(row,col,value,index){
        return parseFloat(value).toFixed(2) +"%"

      },
      /**查询所有**/
      getCouponList(){
        api.getCouponList(this.query).then(response => {
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

