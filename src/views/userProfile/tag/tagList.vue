<template>
  <div class="app-container">
    <el-row :gutter="24" class="el-row"> 
      <el-col :span="24" class="el-card">
 
        <div class="grid-content bg-purple">
          <el-form :inline="true" class="demo-form-inline">
               <el-form-item>
               <el-button type="primary"  class="el-icon-plus" size="medium" @click="appendRootTag">添加一级标签 </el-button>
                <el-button type="primary"  class="el-icon-refresh" size="medium" @click="init">刷新 </el-button>
         
         </el-form-item>
 
          </el-form>
        </div>
     </el-col>  
    </el-row>

 
     <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card" align="center">
        <div class="grid-content bg-purple">
       <el-tree
          :data="data"
          :expand-on-click-node="false"
          check-strictly
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          @check-change="handleClick"
          :props="defaultProps"
          >
          <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }} </span>

          <span>
           <el-tag  v-if="data.taskStatus==1"  type="success" size="mini">已启用</el-tag>
           <el-tag  v-else-if="data.taskStatus==2"  type="info"  size="mini">已停用</el-tag>
          <el-button   type="text" size="mini" icon="el-icon-edit" @click="()=> editTag(data)"  > 编辑标签 </el-button>

          <el-button   type="text" size="mini" icon="el-icon-plus" @click="()=> appendSubTag(data)"  :disabled="node.level==4"> 添加子标签      </el-button>
          <el-button   type="text" size="mini" icon="el-icon-delete" @click="()=> remove( data)" :disabled="node.level<2"> 删除标签   </el-button>
          <el-button  v-if="data.taskId"  type="text" size="mini" icon="el-icon-s-unfold" @click="()=> tagTaskEdit(data)" :disabled="node.level<2" >  管理任务 </el-button>
          <el-button  v-else   type="text" size="mini" icon="el-icon-s-unfold" @click="()=> tagTaskEdit(data)" :disabled="node.level<2" >  添加任务 </el-button>

          </span>
          </span>
          </el-tree>
 
 
        </div>
      </el-col>
       
    </el-row>
    <tagInfo ref="tagInfo"/>
    <tagTask ref="tagTask"/>
   
  </div>
</template>

<script>
import request from '@/utils/request'
import tagInfo from '@/views/userProfile/tag/tagInfo'
import tagTask from '@/views/userProfile/tag/tagTask'
import tagCommonTask from '@/views/userProfile/tag/tagCommonTask'

export default {
  // 注册组件

   mounted(){
          this.init()
   },
  components: {
     tagInfo,tagTask,tagCommonTask
  },
  data() {
    return {
      page:"list",


      data: [{
          id: 1,
          tagName: '用户属性',
          children: [{
            id: 4,
            tagName: '基本属性',
            children: [{
              id: 9,
              tagName: '性别',
              taskId:1,
              taskStatus:1,
              children: [{
                  id: 19,
                  tagName: '男'
                },{
                  id: 29,
                  tagName: '女'
                }]}, {
              id: 10,
              tagName: '年龄'
            }]
          }]
        }, {
          id: 2,
          tagName: '一级 2',
          children: [{
            id: 5,
            tagName: '二级 2-1'
          }, {
            id: 6,
            tagName: '二级 2-2'
          }]
        }, {
          id: 3,
          tagName: '一级 3333',
 
          children: [{
            id: 7,
            tagName: '二级 3-1'
          }, {
            id: 8,
            tagName: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'tagName' 
 
        },
    };
  },
  methods: {
 
      init(){
        
          return request({
              url: `/taglist`,
              method: 'get'
           }).then(response => {
            this.data=response
            
        }).catch( response => {
            console.log('失败'+response)
            Vue.$message.error('服务器错误，请稍后再试！ '+response)
           
        })

      },
      editTagCommonTask(){
          this.$refs.tagCommonTask.showDialog();
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      } ,

    //   disableParentTag(data){
    //     data.forEach((node)=>{
    //      //  console.log(node)
    //       if(node.children ){
    //       //    console.log(node)
    //         node.disabled=true;
    //         return this.disableParentTag(node.children)
    //       }
    //     })
    // },

  handleClick(data,checked, node){
    if(checked){
      console.log(data)
      this.$refs.tree.setCheckedNodes([data]);
    }
  },

  editTag(data ){
      console.log(data)
      this.$refs.tagInfo.showDialogForEdit(data);
  },
   appendRootTag(){
      this.$refs.tagInfo.showDialogForAppendRoot()
   },


  appendSubTag(data ){
      console.log(data)
      this.$refs.tagInfo.showDialogForAppend(data );
  },

  remove( data){
       this.$confirm('确定删除该任务吗 ?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
      })
      .then(() => {
         return request({
           url: `/taginfo/${data.id}`,
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

   tagTaskEdit(data){
        this.$refs.tagTask.showDialog(data);
 
   },
  changeSwitch(data){
      console.log(data.taskStatus )
  },

   renderContent(h, { node, data, store }) {
       console.log("h:"+h)
       console.log("node:"+node)
       console.log("data:"+data)
       console.log("store:"+store)
        return (
          <span class="custom-tree-node">
             <span align="right"> {node.label} </span>
             <span  align="left" class="rt">
              <el-button v-if="node.level==2" size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button v-if="node.level==2" size="mini" type="text" on-click={ () => this.remove( data) }>Delete</el-button>
            </span>
          </span>);
      }

  }  
  

};
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 13px;
  }


</style>
 
 