<template>
 <el-dialog title="添加标签" :visible.sync="tagDetailVisible"  @closed="onClosed">

  <el-form :model="formData">
    <el-form-item label="上级标签" :label-width="formLabelWidth"  v-show="this.formData.tagLevel>1" >
    <el-input v-model="formData.parentTagName" autocomplete="off" readonly></el-input>
    </el-form-item>
    <el-form-item label="上级标签编码" :label-width="formLabelWidth" v-show="this.formData.tagLevel>1" >
    <el-input v-model="formData.parentTagCode" autocomplete="off" readonly></el-input>
    </el-form-item>
    <el-form-item label="标签编码" :label-width="formLabelWidth" >
      <el-input v-model="formData.tagCode" autocomplete="off"></el-input>
        </el-form-item>
    <el-form-item label="标签名称" :label-width="formLabelWidth" >
      <el-input v-model="formData.tagName" autocomplete="off"></el-input>
              </el-form-item>
    <el-form-item label="标签类型" :label-width="formLabelWidth" >
     <el-select v-model="formData.tagType" placeholder="请选择">
     <el-option
       v-for="item in tagTypeOptions"
       :key="item.value"
       :label="item.label"
       :value="item.value">
    </el-option>
  </el-select>

  </el-form-item>



    <el-form-item label="标签值类型" :label-width="formLabelWidth" v-show="formData.tagType!='99'"  >
     <el-select v-model="formData.tagValueType" placeholder="请选择">
     <el-option
       v-for="item in tagValueTypeOptions"
       :key="item.value"
       :label="item.label"
       :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>


  </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm" >确 定</el-button>
    </div>
 </el-dialog>
</template>

<script>
import axios from 'axios'
  import request from '@/utils/request'
   export default {
    data() {
      return {
         parentTagName:'',
         parentTagCode:'',
         parentTagLevel:'',
         formData:{
            parentTagId:'',
            id:'',
            tagCode:'',
            tagName:'',
            taglevel:'',
            tagType:'',
        },

        tagDetailVisible:false,
        tagTypeOptions: [{
            value: '1',
            label: '统计型'
          }, {
            value: '2',
            label: '规则型'
          }, {
            value: '3',
            label: '挖掘型'
          },
          {
            value: '99',
            label: '类目'
          }
      ],
       tagValueTypeOptions: [{
            value: '1',
            label: '整数'
          }, {
            value: '2',
            label: '浮点'
          }, {
            value: '3',
            label: '文本'
          }, {
            value: '4',
            label: '日期'
          }
      ],
       formLabelWidth: '180px'
      }
    },
     methods:{
       clearTable(){
          this.formData.parentTagId=''
          this.parentTagName= ''
          this.parentTagCode= ''
          this.parentTagLevel= ''
          this.formData.id= ''
          this.formData.tagCode= ''
          this.formData.tagName=''
          this.formData.tagType=''
          this.formData.tagValueType=''
          this.formData.tagValueLimit=''
      },

      initTagInfo(tagId){
          request({
              url: `/taginfo/${tagId}`,
              method: 'get'
           }).then(response => {
            console.log("得到res："+response.id)
            this.formData= response
        }).catch( response => {
            console.log('失败'+response)
            this.$message.error('服务器错误，请稍后再试！ '+response)

        })
      },

       showDialogForEdit(data ){
        this.tagDetailVisible=true
        console.log("data id:"+data.id)
        console.log("data label:"+data.tagName)
        console.log("data tagCode:"+data.tagCode)
        console.log("data tagLevel:"+data.tagLevel)

        this.initTagInfo(data.id)

      },

       showDialogForAppendRoot(){

          this.tagDetailVisible=true
          this.formData.tagLevel= 1
           this.formData.tagType='99'
          console.log("this level:"+this.formData.tagLevel)


      },

       showDialogForAppend(parentData ){

          this.tagDetailVisible=true
          console.log("data id:"+parentData.id)
          console.log("data label:"+parentData.tagName)
          console.log("data tagCode:"+parentData.tagCode)
          console.log("data  parentData.tagLevel:"+parentData.tagLevel)
          this.formData.parentTagId=parentData.id
          this.formData.parentTagName=parentData.tagName
          this.formData.parentTagCode=parentData.tagCode
          this.formData.parentTagLevel=parentData.tagLevel
          this.formData.tagLevel=parseInt(parentData.tagLevel)+1
          if(this.formData.tagLevel==2){
             this.formData.tagType='99'
          }

          console.log("this level:"+this.formData.tagLevel)

      },
      onClosed(){
            this.clearTable()
      },

      closeDialog(){
          this.refreshTable()
          this.tagDetailVisible=false
          this.$parent.init()
      },

       submitForm(){
           return request({
              url: `/taginfo`,
              method: 'post',
              data:this.formData
           }).then(response => {

            this.$message({
                message: '保存成功',
                type: 'success'
            });
            this.clearTable()
            this.tagDetailVisible=false
            this.$parent.init()
        }).catch( response => {
            console.log('失败'+response)
            this.$message.error('服务器错误，请稍后再试！ '+response)

        })

       }
    }
  };


</script>
