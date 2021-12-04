<template>
  <div class="app-container">
  
    <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card" align="center">
        <div class="grid-content bg-purple">
          <el-row :gutter="24" class="el-row">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item>
                <el-button type="primary" @click="showDialogCreateUserGroup">创建分群</el-button>
              </el-form-item>
            </el-form>
          </el-row>

          <el-table
            height="1000"
            :data="tableData"
            style="width: 100%; font-size: 15px"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="id" label="分群ID" width="100">
            </el-table-column>

            <el-table-column prop="userGroupName" label="分群名称" width="150">
            </el-table-column>

            <el-table-column prop="conditionComment" label="分群条件"  >
            </el-table-column>

            <el-table-column prop="updateType" label="更新方式" width="100"  :formatter="formatUpdateType">
            </el-table-column>

            <el-table-column prop="userGroupNum" label="分群人数" width="100">
            </el-table-column>

            <el-table-column prop="createTime" label="创建日期" :formatter="dateFormat"  width="150">
            </el-table-column>
            
            <el-table-column prop="updateTime" label="更新日期"   :formatter="dateFormat" width="150">
            </el-table-column>
         
            <el-table-column  label="操作" width="80">
              <template slot-scope="scope">
                <el-button @click="showDialogForBusiDate(scope.row)"  type="text" size="medium">更新</el-button> 
                <!-- <el-button @click="deleteTask(scope.row)"   type="text" size="medium">删除</el-button> -->
               </template>
            </el-table-column>
          </el-table>

          <el-pagination
            :page-size="pageSize"
            :pager-count="7"
            @current-change="handleCurrentChange"
            :current-page.sync="curPageNo"
            layout="total,prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>


      <userGroup ref="userGroup"/>  



   <el-dialog title="填写业务日期" :visible.sync="busiDateVisible" width='60%'>

    <el-form  >
           <el-form-item label="业务日期" >
              <el-date-picker
                v-model="busiDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
           </el-form-item>

  </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeBusiDateDialog">取 消</el-button>
      <el-button type="primary" @click="refreshUserGroup" >确 定</el-button>
    </div>
 </el-dialog>
  </div>


  
</template>

<script>
 import request from '@/utils/request'
  import userGroup from '@/views/userProfile/tag/userGroup'
 
export default {

  
  // 注册组件
  components: {
     userGroup
  },
  data() {
    return {
      refreshId:"",
      tableData: [{
      }],
      total:0,
      pageSize:20,
      curPageNo:1,
      busiDateVisible:false,
      busiDate:""
    };
  },
   mounted(){
    this.init()
  },
  methods: {
    dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]
          if(daterc!=null){
            const dateMat= new Date(daterc);
            const year = dateMat.getFullYear();
            const month = dateMat.getMonth() + 1;
            const day = dateMat.getDate();
            const hh = dateMat.getHours();
            const mm = dateMat.getMinutes();
            const ss = dateMat.getSeconds();
            const timeFormat= year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss;
            return timeFormat;
          }
     },


    init() {
      this.curPageNo=1
      this.refreshTable()
    } ,

     showDialogForBusiDate(row){
        this.refreshId=row.id
        this.busiDateVisible=true
     } ,
     refreshTable(){
        return request({
           url: `/user-group-list?pageNo=${this.curPageNo}&pageSize=${this.pageSize} `,
           method: "get" 
        })
        .then((response) => {
           console.log("response.detail:"+response.detail)
          this.tableData=response.detail
          this.total=response.total
        })
        .catch((response) => {
          console.log("失败" + response);
          this.$message.error("服务器错误，请稍后再试！ " + response);
        });
     },

      refreshUserGroup(){
        return request({
           url: `/user-group-refresh/${this.refreshId}?busiDate=${this.busiDate}`,
           method: "post" 
        })
        .then((response) => {
          this.$message({
            type: 'success',
            message: '刷新完成!'
          });
            this.busiDateVisible=false
            this.refreshTable()
        })
        .catch((response) => {
          console.log("失败" + response);
          this.$message.error("服务器错误，请稍后再试！ " + response);
        });
     },

      handleCurrentChange(val) {
         this.refreshTable()
      },
 
      closeBusiDateDialog(){
          this.refreshTable()
          this.busiDateVisible=false
          this.refreshId=""
      },
       
     showDialogCreateUserGroup(){
        this.$refs.userGroup.showDialog()
     },

     formatUpdateType(row,col,value,index){
          if(value=='MANUAL'){
            return '手动'
          }else{
            return '自动'
          }
            
      }
 
  },
};
</script>

