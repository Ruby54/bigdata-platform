<template>
  <div class="app-container calendar-list-container">
    <el-form :model="customQuery" style="width: 100%" label-position="left" >
      <el-form-item  label="SQL查询" >
        <el-input v-model="customQuery.sql" :autosize="{minRows:10,maxRows:10}" type="textarea" />
      </el-form-item>
      <el-form-item label="" >
        <el-select v-model="customQuery.typeMetaData" placeholder="请选择" class="dialog-input">
          <el-option v-for="item in typeMetaDataOptions" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="medium" type="primary" @click="getList()">查询</el-button>
      </el-form-item>
    </el-form>
    <!--       &lt;!&ndash;由listLoading决定是否加载&ndash;&gt;-->
    <el-table :data="resultList" style="width:100%">
      <el-table-column align="center" v-for="item in tableheader"  :label="item.label" :property="item.property"  :width="item.width" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import reportApi from '@/api/report'

export default {
  data:function() {
    return {
      customQuery: {
        sql:"",
        typeMetaData:"hive"
      },
      resultList: [],
      tableheader:[],
      typeMetaDataOptions : [
        { id: 0, label: 'hive', value: 'hive' },
        { id: 1, label: 'presto', value: 'presto' }
      ]
    }
  },
  methods: {
    // 获得Tasktag列表
    getList() {
      reportApi.getSqlList(this.customQuery).then(response => {
        this.resultList = response.queryMap;
        this.tableheader = response.tableHeaderList;
        console.log(this.resultList)
        console.log(this.tableheader)
      })
    },
    getMaxLength (arr) {
      return arr.reduce((acc, item) => {
        if (item) {
          let calcLen = this.getTextWidth(item)
          if (acc < calcLen) {
            acc = calcLen
          }
        }
        return acc
      }, 0)
    },
    /**
     * 使用span标签包裹内容，然后计算span的宽度 width： px
     * @param valArr
     */
    getTextWidth(str) {
      let width = 0;
      let html = document.createElement('span');
      html.innerText = str;
      html.className = 'getTextWidth';
      document.querySelector('body').appendChild(html);
      width = document.querySelector('.getTextWidth').offsetWidth;
      document.querySelector('.getTextWidth').remove();
      return width;
    }
  },
  watch: {
    /**
     * 监控表格的数据data，自动设置表格宽度
     * @param valArr
     */
    resultList(valArr) {
      const _this = this
      this.tableheader = fields.map(function (value) {
        const arr = valArr.map(x => x[value.property])  // 获取每一列的所有数据
        arr.push(value.label)  // 把每列的表头也加进去算
        value.width = _this.getMaxLength(arr) + 20 // 每列内容最大的宽度 + 表格的内间距(依据实际情况而定)
        return value
      })
    }
  }

}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-button--mini, .el-button--mini.is-round{padding:7px 6px}
</style>
