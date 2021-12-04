<template>
  <div class="app-container">
  
    <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card" align="center">
        <div class="grid-content bg-purple">
          <el-row :gutter="24" class="el-row">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item>
                <!-- <el-button type="primary" @click="showDialogForTaskDate">生成指定日期任务</el-button> -->
              </el-form-item>
            </el-form>
          </el-row>

          <el-table
            height="650"
            :data="tableData"
            style="width: 100%; font-size: 15px"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >

            <el-table-column prop="batchId" label="批次编号" width="330">
            </el-table-column>

            <el-table-column prop="taskName" label="任务名称" width="300">
            </el-table-column>

            
            <el-table-column prop="taskExecStatus" label="任务执行状态" width="150">
            </el-table-column>

            <el-table-column prop="taskBusiDate" label="业务日期" width="230">
            </el-table-column>

            <el-table-column prop="taskExecTime" label="执行时间" width="130">
            </el-table-column>

            <el-table-column prop="taskExecLevel" label="任务层级" width="120">
            </el-table-column>



            <el-table-column prop="yarnAppId" label="yarn应用id" width="300">
            </el-table-column>



             <el-table-column prop="startTime" label="启动时间"   :formatter="dateFormat">
            </el-table-column>

             <el-table-column prop="endTime" label="结束时间"   :formatter="dateFormat">
            </el-table-column>
            <el-table-column  label="操作" width="200">
            
            <template slot-scope="scope">
              <el-button @click="retryTaskProcess(scope.row)"  type="text" size="medium">重试</el-button>
              <el-button @click="deleteTaskProcess(scope.row)"   type="text" size="medium">删除</el-button>
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


   <el-dialog title="填写任务执行业务日期" :visible.sync="taskBusiDateVisible">

    <el-form  >
           <el-form-item label="业务日期" >
              <el-date-picker
                v-model="taskBusiDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
           </el-form-item>

  </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="genTaskProcess" >确 定</el-button>
    </div>
 </el-dialog>
  </div>


  
</template>

<script>
 import request from '@/utils/request'

export default {

  
  // 注册组件
  components: {
 
  },
  data() {
    return {
      taskBusiDateVisible:false,
      tableData: [{
      }],
      total:0,
      pageSize:20,
      curPageNo:1,
      taskBusiDate:"",
       intervalId:null
    };
  },
   mounted(){
    this.init()
    this.dataRefreh()
  },
  methods: {
    genTaskProcess(){
        return request({
           url: `/task-gen?busidt=${this.taskBusiDate}`,
           method: "post" 
        })
        .then((response) => {
          this.tableData=response.detail
          this.total=response.total
           this.closeDialog()
        })
        .catch((response) => {
          console.log("失败" + response);
          this.$message.error("服务器错误，请稍后再试！ " + response);
        });
    },


    init() {
      this.curPageNo=1
      this.refreshTable()
    } ,
     refreshTable(){
        return request({
           url: `/task-process-list?pageNo=${this.curPageNo}&pageSize=${this.pageSize} `,
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

      handleCurrentChange(val) {
         this.refreshTable()
      },
      closeDialog(){
          this.refreshTable()
          this.taskBusiDateVisible=false
      },

       
     showDialogForTaskDate(){
        this.taskBusiDateVisible=true
     } ,
      dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log("刷新" + new Date());
        this.init() ; //加载数据函数
      }, 5000);
    }, 
    // 停止定时器
    clearTimer() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
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

       
     retryTaskProcess(row){
       this.$confirm('确定重试该任务吗 ?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
      })
      .then(() => {
         return request({
           url: `/task-process-retry/${row.id}`,
           method: "post" 
         })
        .then((response) => {
           this.$message({
            type: 'success',
            message: '重试任务!'
          });
          this.refreshTable()
        })
        .catch((response) => {
          console.log("失败" + response);
          this.$message.error("服务器错误，请稍后再试！ " + response);
        });


      })
      .catch(() => {})
 
     },

       
     deleteTaskProcess(row){
       this.$confirm('确定删除该任务吗 ?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
      })
      .then(() => {
         return request({
           url: `/task-process/${row.id}`,
           method: "delete" 
         })
        .then((response) => {
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.refreshTable()
        })
        .catch((response) => {
          console.log("失败" + response);
          this.$message.error("服务器错误，请稍后再试！ " + response);
        });


      })
      .catch(() => {})
 
     },
 
  },
};
</script>

