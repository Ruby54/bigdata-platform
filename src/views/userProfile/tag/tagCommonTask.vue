<template  >
  <el-dialog title="SPARP_SQL通用任务" :visible.sync="tagCommonTaskVisible" @closed="onClosed">
    <el-form ref="form" :model="formData" label-width="80px">
      
      <el-form-item
        label="任务主类"
        :label-width="formLabelWidth"
      >
        <el-input v-model="formData.mainClass"
         placeholder="请输入内容"
        ></el-input>
      </el-form-item>
<!-- :action="uploadPath" -->
<!--:on-success="onUploadSuccess"-->
      <el-form-item label="JAR包上传" :label-width="formLabelWidth">
        <el-upload
           action="void"
          class="upload-demo"
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
 
      formData: {
        id: 1,
        mainClass: "",
        fileInfo:{},
        taskfileId: "",
         fileList : []  
     
      },
      tagCommonTaskVisible: false,
      isUploading:false,
      buttonText:'确 定',
      formLabelWidth: "180px",
      uploadPath:  process.env.BASE_API+"/upload",
      subTagOptions: [ 
      ],
    };
  },
  methods: {
    clearDialog() {
      this.formData.id = 1;
      this.formData.mainClass = "";
      this.formData.taskFileId = "";
      this.formData.fileList=[];
     this.formData.fileInfo={};
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
                  
                     this.formData.taskFileId = response.fileId;
                    console.log("taskFileId:" + this.formData.taskFileId);
                  
                    this.isUploading=false;
                    this.buttonText='确 定' 

                    file.onProgress({percent: 100})     //进度条
                    file.onSuccess(); //上传成功(打钩的小图标)
                })
            },

    
    initTagCommonTask(){
           request({
              url: `/tagcommon/${this.formData.id}`,
              method: 'get'
           }).then(response => {

              console.log("得到res："+response )
            this.formData= response
            console.log("初始化编辑："+this.formData.id)
            if(this.formData.id){
                this.initFileList()
            }
            
        }).catch( response => {
            console.log('失败'+response)
            this.$message.error('服务器错误，请稍后再试！ '+response)
           
        })
    },

    initFileList(){
      if(this.formData.fileInfo&&this.formData.fileInfo.fileName&&this.formData.fileInfo.fileName!=""){
          this.formData.fileList=[{name:this.formData.fileInfo.fileName }]
      }
    },



    showDialog() {
      this.tagCommonTaskVisible = true;
      this.initTagCommonTask()
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
    changeSwitch() {},
    closeDialog() {
      this.clearDialog();
      this.tagCommonTaskVisible = false;
 
    },
    onUploadSuccess(response, file, fileList) {
      // this.formData.taskFileId = response.fileId;
      // console.log("fileId:" + this.formData.taskFileId);
    },
    onClosed() {
      this.clearDialog();
      console.log("关闭");
    },


    submitForm() {
     console.log("this.formData.id:::::"+this.formData.id) 

      return request({
        url: `/tagcommon`,
        method: "post",
        data: this.formData,
      })
        .then((response) => {
          this.tagCommonTaskVisible = false;
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.clearDialog();
        })
        .catch((response) => {
          console.log("失败" + response);
          this.$message.error("服务器错误，请稍后再试！ " + response);
        });
    },
  },
};
</script>
 

 