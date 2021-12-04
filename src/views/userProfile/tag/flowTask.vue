<template  >
  <el-dialog title="添加任务" :visible.sync="taskVisible" @closed="onClosed">
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="任务状态" :label-width="formLabelWidth">
        <el-switch
          size="mini"
          class="switchStyle"
          v-model="formData.taskStatus"
          on-color="#00A854"
          active-text="启用"
          active-value="1"
          off-color="#F04134"
          inactive-text="停用"
          inactive-value="2"
 
        >
        </el-switch>
      </el-form-item>
 
      <el-form-item label="任务名称" :label-width="formLabelWidth">
        <el-input
          v-model="formData.taskName"
          autocomplete="off"
          class="input-text"
        ></el-input>
      </el-form-item>
      <el-form-item label="执行方式" :label-width="formLabelWidth">
        <el-select v-model="formData.execType" placeholder="请选择">
          <el-option
            v-for="item in execTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务描述" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="formData.taskComment"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="运行周期(小时)" :label-width="formLabelWidth">
        <el-time-picker
          v-model="formData.taskTime"
          format="HH:mm"
          value-format="HH:mm"
          placeholder="任意时间点"
        ></el-time-picker>
      </el-form-item>

     

      <el-form-item
        label="任务主类(spark_jar填写)"
        :label-width="formLabelWidth"
        v-show="formData.execType=='JAR'"
      >
        <el-input
          v-model="formData.mainClass"
          autocomplete="off"
          class="input-text"
          
        ></el-input>
      </el-form-item>

      <el-form-item label="JAR包上传" :label-width="formLabelWidth">
        <el-upload
          class="upload-demo"
          action="void"  
          :http-request="customUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="formData.fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jar文件</div>
        </el-upload>
 
      </el-form-item>
      <el-form-item label="任务SQL" :label-width="formLabelWidth" v-show="formData.execType=='SQL'">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4 }"
          placeholder="请输入内容"
          v-model="formData.taskSql"
        >
        </el-input>
      </el-form-item>
     <el-form-item label="任务级别" :label-width="formLabelWidth" >
        <el-input
          v-model="formData.taskExecLevel"
          autocomplete="off"
          class="input-text"
         ></el-input>
      </el-form-item>

      <el-form-item label="任务参数" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="formData.taskArgs"
        >
        </el-input>
      </el-form-item>

     
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading="isUploading"  >{{buttonText}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import request from '@/utils/request'
export default {

  data() {
    return {
      void:"",
      tagName: "",
      tagCode: "",
      formData: {
        id: "",
        tagId: "",
        taskName: "",
        execType: "",
        taskTime: "01:00",
        taskComment: "",
        taskArgs: "",
        taskType:"FLOW",
        taskStatus: "",
        taskExecLevel:"",
        taskDateOfM: "",
        taskMonth: "",
        fileId: "",
        fileName:"",
        fileList: [],
        taskTagRuleList: [],
      },
      isUploading:false,
      buttonText:'确 定',
      taskVisible: false,
      execTypeOptions: [
        { value: "SQL", label: "SPARP_SQL" },
        { value: "JAR", label: "SPARK_JAR" },
      ],
       taskLevelOptions:[
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" } 
      ],
      formLabelWidth: "140px",
      uploadPath:  process.env.BASE_API+"/upload", 
      subTagOptions: [ 
      ],
    };
  },
  methods: {
    clearDialog() {
 
      this.formData.id=""
      this.formData.taskStatus = "";
      this.formData.taskName = "";
      this.formData.execType = "";
      this.formData.taskComment = "";
      this.formData.taskArgs = "";
      this.formData.fileId = "";
      this.formData.fileName =  "";
      this.formData.taskExecLevel="200";
      this.formData.fileList = [];
      this.isUploading=false;
      this.buttonText='确 定' 
 
 
    },


   customUpload(file) {
                let fileForm = new FormData();
                fileForm.append('file', file.file);
               this.isUploading=true;
               this.buttonText='上传中' 
                 request( {
                    url: this.uploadPath,
                    method: 'post',
                    data: fileForm,
                    //上传进度
                    onUploadProgress: (progressEvent) => {
                      console.log(progressEvent.loaded);
                        let num = progressEvent.loaded / progressEvent.total * 99 | 0;  //百分比
                        file.onProgress({percent: num})     //进度条
                    }
                }).then(response => {
                  console.log(response)
                    
                     this.formData.fileId = response.fileId;
                    console.log("fileId:" + this.formData.fileId);
                    this.isUploading=false;
                    this.buttonText='确 定' 
                    file.onProgress({percent: 100})     //进度条
                    file.onSuccess(); //上传成功(打钩的小图标)
                })
   },


    initTaskInfo(){
           request({
              url: `/taskinfo/${this.formData.id}`,
              method: 'get'
           }).then(response => {
             console.log("得到res："+response.id)
              console.log("得到res："+response )
            this.formData= response
            console.log("初始化编辑："+this.formData.id)
            this.initFileList()
        }).catch( response => {
            console.log('失败'+response)
            this.$message.error('服务器错误，请稍后再试！ '+response)
           
        })
    },

    initFileList(){
      if(this.formData.fileName&&this.formData.fileName!=""){
          this.formData.fileList=[{name:this.formData.fileName }]
      }
    },



    showDialog(taskId) {
      this.taskVisible = true;
      this.formData.id = taskId;
      console.log("this. this.formData.id :"+this.formData.id )

      if (!this.formData.id||this.formData.id == "") {
        console.log("新增页面")
      }else{
        console.log("编辑页面")
         this.initTaskInfo()
      }
 
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file.name + "::" + file.url);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
     
    closeDialog() {
      this.clearDialog();
      this.taskVisible = false;
      this.$parent.init();
    },
    onUploadSuccess(response, file, fileList) {
      // console.log(response)
      // this.formData.fileId = response.fileId;
      // console.log("fileId:" + this.formData.fileId);
    },
    onClosed() {
      this.clearDialog();
      console.log("关闭");
    },


    renderHeader() {
      return (
        <el-button
          type="primary"
          icon="el-icon-plus"
          onClick={this.addRow}
          circle
          size="mini"
        ></el-button>
      );
    },

    submitForm() {
     console.log("this.formData.id:::::"+this.formData.id) 

      return request({
        url: `/taskinfo`,
        method: "post",
        data: this.formData,
      })
        .then((response) => {
          this.taskVisible = false;
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.clearDialog();
          this.$parent.init();
        })
        .catch((response) => {
          console.log("失败" + response);
          this.$message.error("服务器错误，请稍后再试！ " + response);
        });
    },
  },
};
</script>

<style>
.input-text {
  width: 600px;
}

.switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
.switchStyle .el-switch__label--left {
  z-index: 1;
  left: 30px;
}
.switchStyle .el-switch__label--right {
  z-index: 1;
  left: 10px;
}
.switchStyle .el-switch__label.is-active {
  display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 80px !important;
}
</style>

<style lang="scss">
.tableBox {
  th {
    padding: 0 !important;
    height: 40px;
    line-height: 40px;
  }
}
</style>