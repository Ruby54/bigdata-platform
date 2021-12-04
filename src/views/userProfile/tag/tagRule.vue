<template>
  <div>
 
    <el-table   border
      :data="ruleData"
      class="tableBox"
      style="width: 100%;font-size: 14px" 
      :header-cell-style="{background:'#f5f5f5' }"  >
       <el-table-column width="100" :render-header="renderHeader"></el-table-column>
      <el-table-column
        prop="queryValue"
        label="SQL查询值"
        width="300">
        <template slot-scope="scope">
            <el-input v-if="scope.row.status" v-model="scope.row.queryValue"></el-input>
            <span v-else>{{scope.row.queryValue}}</span>
        </template>
      </el-table-column> 
      <el-table-column
        prop="tagId"
        label="匹配标签"
        width="230">
          <template slot-scope="scope">
            <el-select  v-if="scope.row.status" v-model="scope.row.tagId" placeholder="请选择">
            <el-option
                v-for="item in tagTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
            </el-select>
            <el-tag  v-else  type="primary" >{{scope.row.tagName}}</el-tag>
         </template>
 
      </el-table-column>
      <el-table-column
       label="操作"
       >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, ruleData)"
          type="primary"
          size="mini"  circle  icon="el-icon-minus"  >
   
        </el-button>
      </template>
    </el-table-column>


    </el-table>

  </div>
</template>


<script>
 
export default {
  data() {
    return {
      ruleData: [],
      tagTypeOptions: [{
            value: '1',
            label: '男'
          }, {
            value: '2',
            label: '女'
          } 
      ] 
    }
  },
 
   mounted() {
 
  } ,
   methods: {

      addRow() { 
           this.ruleData.push({   queryValue: '',   tagId: '',tagName:'', status: 1 });
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

     getParent(){
       this.recentDays=this.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.dateRange,
       this.curDate=this.$parent.$parent.$parent.curDate 
    },
 
    

    renderHeader(){
      return (
         <el-button type="primary" icon="el-icon-plus"  onClick={this.addRow}  circle size="mini"></el-button>
      )
    }

 
}
}
</script>

<style lang="scss">
 .tableBox {
  th {
    padding:0 !important;
    height: 40px;
    line-height:40px;
  }
}
</style>