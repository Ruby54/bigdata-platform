<template>
  <div class="app-container">
  
    <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card" align="center">
        <div class="grid-content bg-purple">
          <el-row :gutter="24" class="el-row">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                  <el-button  type="primary"  class="el-icon-upload"  @click="editTagCommonTask">上传SQL任务通用Jar包</el-button>
               </el-form-item>
              <el-form-item>
                <el-button type="primary"  class="el-icon-plus"   @click="addTask">添加流程任务</el-button>
              </el-form-item>
               <el-form-item>
                <el-button type="primary"    class="el-icon-video-play"  @click="showDialogForTaskDate"> 手动调度任务</el-button>
              </el-form-item>

            </el-form>
          </el-row>

          <el-table
            height="650"
            :data="taskTable"
            style="width: 100%; font-size: 15px"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="id" label="任务id" width="150">
            </el-table-column>

            
            <el-table-column prop="taskName" label="任务名称" width="250">
            </el-table-column>

            <el-table-column prop="taskStatus" label="任务状态" width="200" :formatter="formatTaskStatus" > 
            </el-table-column>
            <el-table-column prop="taskExecLevel" label="执行层级" width="100">
            </el-table-column>

            <el-table-column prop="taskTime" label="任务作业时间" width="200">
            </el-table-column>

            <el-table-column prop="taskComment" label="任务说明"  >
            </el-table-column>
            <el-table-column  label="操作" width="200">
            
            <template slot-scope="scope">
              <el-button @click="editTask(scope.row)"  type="text" size="medium">编辑</el-button>
              <el-button @click="deleteTask(scope.row)"   type="text" size="medium">删除</el-button>
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

   <flowTask ref="flowTask"/>
   <tagCommonTask ref="tagCommonTask"/>
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
      <el-button @click="closeBusiDateDialog">取 消</el-button>
      <el-button type="primary" @click="genTaskProcess" >确 定</el-button>
    </div>
 </el-dialog>
   
  </div>


  
</template>

<script>
 import request from '@/utils/request'
import flowTask from '@/views/userProfile/tag/flowTask'
import tagCommonTask from '@/views/userProfile/tag/tagCommonTask'
export default {

  
  // 注册组件
  components: {
    flowTask,tagCommonTask
  },
  data() {
    return {
      taskTable: [ ],
     total:0,
      pageSize:20,
      curPageNo:1,
      taskBusiDateVisible:false,
      taskBusiDate:""
    };
  },
   mounted(){
    this.init()
  },
  methods: {

    formatTaskStatus(row, column, cellValue, index){
        if(  cellValue=='1'){
           return "开启"
        }else{
           return "停用"
        }
    },

    addTask(){
         this.$refs.flowTask.showDialog()
    },

    init() {
      this.curPageNo=1
      this.refreshTable()
    } ,
     refreshTable(){
        return request({
           url: `/tasklist?pageNo=${this.curPageNo}&pageSize=${this.pageSize}&taskType=FLOW`,
           method: "get" 
        })
        .then((response) => {
          console.log("response.detail:"+response.detail)
          this.taskTable=response.detail
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


       
     editTask(row){
        this.$refs.flowTask.showDialog(row.id)
        
     } ,
      editTagCommonTask(){
          this.$refs.tagCommonTask.showDialog();
      },

     
     showDialogForTaskDate(){
        this.taskBusiDateVisible=true
     } ,

     genTaskProcess(){
        return request({
           url: `/task-gen?busidt=${this.taskBusiDate}`,
           method: "post" 
        })
        .then((response) => {
          this.tableData=response.detail
          this.total=response.total
           this.closeBusiDateDialog()
        })
        .catch((response) => {
          console.log("失败" + response);
          this.$message.error("服务器错误，请稍后再试！ " + response);
        });
    },

     closeBusiDateDialog(){
          this.refreshTable()
          this.taskBusiDateVisible=false
      },


     
     deleteTask(row){
       this.$confirm('确定删除该任务吗 ?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
      })
      .then(() => {
         return request({
           url: `/taskinfo/${row.id}`,
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

