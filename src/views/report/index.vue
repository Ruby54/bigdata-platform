<template>
  <div>
    <el-form :model="dataForm" style="width: 100%" label-position="left" >
      <el-form-item  prop="desc" label="SQL查询" >
        <!-- <el-input type="textarea" v-model="createForm.desc" :autosize="{minRows:2,maxRows:8}"></el-input> -->
        <!-- <el-input type="textarea" v-model="createForm.desc" :rows="2"></el-input> -->
        <el-input type="textarea" v-model="dataForm.sql" :autosize="{minRows:15,maxRows:15}" ></el-input>
      </el-form-item>
      <el-form-item label="" prop="typeMetaData">
        <el-select v-model="dataForm.typeMetaData" placeholder="请选择" class="dialog-input">
          <el-option v-for="item in typeMetaDataOptions" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="updateDialogShow = false">取 消</el-button>
      <el-button size="medium" type="primary" @click="getSqlList">查询</el-button>
    </div>
  </div>
  <!--由listLoading决定是否加载-->
  <el-table stripe :data="taskTagList" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" prop="id" label="ID" width="150"></el-table-column>
    <el-table-column align="center" prop="scheduleTaskId" label="任务调度ID" width="150"></el-table-column>
    <el-table-column align="center" prop="taskName" label="任务名称" min-width="50"></el-table-column>
    <el-table-column align="center" prop="scheduleName" label="调度计划" width="260"></el-table-column>
    <el-table-column align="center" prop="createName" label="负责人/业务线" width="200"></el-table-column>

    <el-table-column fixed="right" align="center" label="操作" class-name="small-padding" width="250">
      <template slot-scope="scope">
        <el-button  size="mini" type="danger" icon="el-icon-delete" @click="deleteTag(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import repostApi from '@/api/report'
import {parseTime, deepClone} from '@/utils'

  const typeMetaDataOptions = [
    {id: 0, label: 'hive', value: "hive"},
    {id: 1, label: 'presto', value: "presto"}
  ]
  const constSweditorCode = {
    sql: '',
    typeMetaData: 'hive'
  }
  export default {
    data() {
      return {
        typeMetaDataOptions,
        constSweditorCode,
        model: deepClone(constSweditorCode)
      }
    },
    methods: {
      getSqlList() {
        this.businessLineId = this.$route.query.id
        repostApi.getSqlList({ 'sql': this.sql,'type': this.type}).then(response => {
          const data = response.data
          if (data.status === 200) {
            this.resultList = data.result
          }
        })
      }
    }
  }
</script>


