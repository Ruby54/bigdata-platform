<template  >
  <el-dialog title="创建分群" :visible.sync="userGroupVisible" @closed="onClosed" width='60%'  >
    <el-form ref="form" :model="formData" label-width="80px" size="mini">
      
 
      <el-form-item label="分群名称" :label-width="formLabelWidth" size="mini">
        <el-input
          v-model="formData.userGroupName"
          autocomplete="off"
          class="input-text"
        ></el-input>
      </el-form-item>
      <el-form-item label="业务日期(调试专用)" :label-width="formLabelWidth" size="mini">
              <el-date-picker
                v-model="formData.busiDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
      </el-form-item>

       <el-form-item label="筛选条件" :label-width="formLabelWidth" size="mini" >
        <el-table
          border
          :data="formData.tagConditions"
          class="tableBox"
          style="width: 100%; font-size: 14px"
          :header-cell-style="{ background: '#f5f5f5' }"
          size="mini"
        >
         <el-table-column
            width="60"
            :render-header="renderHeader"
          ></el-table-column>
          <el-table-column prop="tagCodePath" label="标签" width="160" size="mini">
           <template slot-scope="scope">
              <el-cascader
                ref="tagRef"
                :show-all-levels="false"
                v-model="scope.row.tagCodePath"
                :options="tagOptions"
                 @change="(value)=>{selectTagChange(value, scope.$index)}">
              </el-cascader>
           </template >
          </el-table-column>
         <el-table-column prop="operator" label="操作" width="130">
            <template slot-scope="scope">
              <el-select
                ref="operatorRef"
                v-model="scope.row.operator"
                placeholder="请选择"
                 @change="(value)=>{selectOperatorChange(value, scope.$index)}">
              
                <el-option
                  v-for="item in operatorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="tagValues" label="标签值" width="170">
            <template slot-scope="scope">
              <el-select
                 allow-create
                 filterable
                 multiple
                v-model="scope.row.tagValues"
                placeholder="请选择或填写"
                @blur="(e)=>{selectBlur(e , scope.row)}"
              >
                <el-option
                  v-for="item in scope.row.tagValueList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, formData.tagConditions)"
                type="primary"
                size="mini"
                circle
                icon="el-icon-minus"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>



      <el-form-item label="分群人数" :label-width="formLabelWidth">
        <el-input
          v-model="formData.userGroupNum"
          autocomplete="off"
          style="width: 140px"
          class="input-text"
          readonly
        ></el-input> 
        <el-button type="primary" @click="evaluateNum">预估人数</el-button>
      </el-form-item>
      <el-form-item label="更新类型" :label-width="formLabelWidth">
       <el-select
                 allow-create 
                 filterable
                v-model="formData.updateType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in  updateTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
      </el-form-item>
 
      <el-form-item label="分群说明" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="formData.userGroupComment"
        >
        </el-input>
      </el-form-item>
   

     
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import request from '@/utils/request'

export default {

  data() {
    return {
 
      formData: {
        id: "",
        userGroupName: "",
        tagConditions: [],
        userGroupNum: "",
        updateType: "",
        userGroupComment: "",
        busiDate:"2021-05-16"
        
      },
      userGroupVisible: false,
      updateTypeOptions: [
        { value: "MANUAL", label: "手动" },
        { value: "DAILY", label: "每日" },
      ],
      operatorOptions:[
        {value: "eq", label: "等于"},
        {value: "gte", label: "大于等于"},
        {value: "lte", label: "小于等于"},
        {value: "gt", label: "大于"},
        {value: "lt", label: "小于"},
        {value: "neq", label: "不等于"} ,
        {value: "in", label: "包含"},
        {value: "nin", label: "不包含"}
      ],

      formLabelWidth: "180px",
      tagOptions: [],
    };
  },
  methods: {
    clearDialog() {
 
      this.formData.id=""
      this.formData.userGroupName = "";
      this.formData.tagConditions = [];
      this.formData.userGroupNum = "";
      this.formData.updateType = "";
      this.formData.userGroupComment = "" 

    },



    initUserGroup(){
           request({
              url: `/user-group/${this.formData.id}`,
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

   
    initTagOptions(){
           request({
              url: `/tag-cascader/3`,
              method: 'get'
           }).then(response => {
            this.tagOptions= response
        }).catch( response => {
            console.log('失败'+response)
            this.$message.error('服务器错误，请稍后再试！ '+response)
           
        })
    },

    checkData(){
      if(!this.formData.tagConditions||this.formData.tagConditions.length==0||this.formData.tagConditions.tagValues||!this.formData.busiDate){

         console.log(this.formData.tagConditions)
          console.log(this.formData.busiDate)
              this.$message.error("请填写条件及业务日期 " ); 
        
              return false;
      }
      let operatorflag= true
      this.formData.tagConditions.forEach(tagCondition=>{
          console.log(tagCondition.tagValues.length+"111"+tagCondition.operator )
          if(tagCondition.tagValues.length>1&& tagCondition.operator!="in"&&tagCondition.operator!="nin" ){
              this.$message.error("多条标签值，请使用包含或不包含！" ); 
             operatorflag=false
           }
      })
      console.log("operatorflag:"+operatorflag)
     if(!operatorflag)  return false
      
    return true;

    },

    evaluateNum(){
      if(!this.checkData())  return

      return request({
         url: `/user-group-evaluate`,
         method: "post",
         data: this.formData,
       })
        .then((response) => {
          this.formData.userGroupNum=response
        })
        .catch((response) => {
          console.log("失败" + response);
          this.$message.error("服务器错误，请稍后再试！ " + response);
        });
    },
  



    showDialog(userGroupId) {
      this.userGroupVisible = true;
      this.formData.id = userGroupId;
      this.initTagOptions()
    
      console.log("this. this.formData.id :"+this.formData.id )

      if (!this.formData.id||this.formData.id == "") {
        console.log("新增页面")
      }else{
        console.log("编辑页面")
         this.initTaskInfo()
      }
 
    },
    selectBlur(e,row) {
	    	row.tagValue = e.target.value
	  },
 
    selectTagChange(tagCodeArr, index) {
         console.log("index:"+index)
         console.log("tagref:"+"label:"+this.$refs['tagRef'])
         console.log("label:"+this.$refs['tagRef'].getCheckedNodes()[0])
          console.log('label'+this.$refs['tagRef'].getCheckedNodes()[0].pathLabels) 
         let pathlabels= this.$refs['tagRef'].getCheckedNodes()[0].pathLabels
         let taglabel=""
         if(pathlabels){
           taglabel= pathlabels[pathlabels.length-1]
         }
         this.formData.tagConditions[index].tagName = taglabel
         this.formData.tagConditions[index].tagValue = ""
         
        let tagCode=tagCodeArr[tagCodeArr.length-1]
        this.formData.tagConditions[index].tagCode = tagCode
          request({
              url: `/tag-value-list/${tagCode}`,
              method: 'get'
           }).then(response => {
            this.formData.tagConditions[index].tagValueList = response
            console.log(this.formData)
        }).catch( response => {
            console.log('失败'+response)
            this.$message.error('服务器错误，请稍后再试！ '+response)
           
        })

      
       
     },

     

     selectOperatorChange(val, index) {
            let  optItem = this.operatorOptions.find((item)=>{
                  return item.value === val;
            });
          console.log("optItem.label:"+optItem.label)  
          this.formData.tagConditions[index].operatorName = optItem.label
        //  console.log("label:"+this.$refs['operatorRef'].getCheckedNodes()[index])
        //   console.log('label'+this.$refs['operatorRef'].getCheckedNodes()[index].pathLabels) 
        //  let pathlabels= this.$refs['operatorRef'].getCheckedNodes()[index].pathLabels
        //  let taglabel=""
        //  if(pathlabels){
        //    taglabel= pathlabels[pathlabels.length-1]
        //  }
        //  this.formData.tagConditions[index].tagName = taglabel
 
 
     },
    closeDialog() {
      this.clearDialog();
      this.userGroupVisible = false;
      this.$parent.init();
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


     addRow() {
      this.formData.tagConditions.push({tagCodePath:"", tagCode: "",tagName:"", operator: "",    tagValue:"",tagValueList:[] });
     
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
        url: `/user-group`,
        method: "post",
        data: this.formData,
      })
        .then((response) => {
          this.userGroupVisible = false;
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