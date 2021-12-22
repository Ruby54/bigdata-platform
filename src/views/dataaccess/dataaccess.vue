<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="150px">
    <el-form-item label="连接器名字" prop="name">
      <el-input v-model="form.name" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="连接class">
      <el-select v-model="form.connector_class" placeholder="请选择" class="dialog-input" style="width: 500px">
        <el-option v-for="item in connectorClassOptions" :key="item.id" :label="item.label" :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="数据库主机名">
      <el-input v-model="form.database_hostname" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="数据库端口">
      <el-input v-model="form.database_port" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="数据库用户名">
      <el-input v-model="form.database_user" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="数据库密码">
      <el-input v-model="form.database_password" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="服务器id">
      <el-input v-model="form.database_server_id" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="服务器名">
      <el-input v-model="form.database_server_name" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="监控数据库列表">
      <el-input v-model="form.database_include_list" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="kafka">
      <el-input v-model="form.kafka_bootstrap_servers" style="width: 500px" ></el-input>
    </el-form-item>
    <el-form-item label="kafkatopic">
      <el-input v-model="form.kafka_topic" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {parseTime, deepClone} from '@/utils'
import api from "../../api/dataaccess/dataaccess";
import axios from 'axios';
const connectorClassOptions = [
  {id: 0, label: 'io.debezium.connector.mysql.MySqlConnector', value: "io.debezium.connector.mysql.MySqlConnector"},
  {id: 1, label: 'io.debezium.connector.postgresql.PostgresConnector', value: "io.debezium.connector.postgresql.PostgresConnector"}
]
export default {

  data() {
    return {
      connectorClassOptions,
      form: {
        name: '',
        connector_class:'',
        database_hostname:'',
        database_port:'',
        database_user:'',
        database_password:'',
        database_server_id:'',
        database_server_name:'',
        database_include_list:'',
        kafka_bootstrap_servers:'',
        kafka_topic:'',
      },
      portJson:{
        "name":'',
        config:{
          "connector.class": "",
          "database.hostname": "",
          "database.port": "",
          "database.user": "",
          "database.password": "",
          "database.server.id": "",
          "database.server.name": "",
          "database.include.list": "",
          "database.history.kafka.bootstrap.servers": "hadoop102:9092",
          "database.history.kafka.topic": "schema-changes.inventory"
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入连接器名字', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符，尽量与连接class相似', trigger: 'blur' }
        ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.portJson.name=this.form.name
      this.portJson.config["connector.class"]=this.form.connector_class
      this.portJson.config["database.hostname"]=this.form.database_hostname
      this.portJson.config["database.port"]=this.form.database_port
      this.portJson.config["database.user"]=this.form.database_user
      this.portJson.config["database.password"]=this.form.database_password
      this.portJson.config["database.server.id"]=this.form.database_server_id
      this.portJson.config["database.server.name"]=this.form.database_server_name
      this.portJson.config["database.include.list"]=this.form.database_include_list

      console.log(JSON.stringify(this.portJson));
      console.log(process.env.NODE_ENV, '环境')

      let urlHost = process.env.API_HOST // 会自动判断当前是开发还是生产环境，然后自动匹配API_HOST
      console.log(urlHost)
      axios.post('connectors',JSON.stringify(this.portJson),{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
      // api.getDataAccess(JSON.stringify(this.portJson)).then(response => {
      //   console.log(response)
      //   console.log(this.tableheader)
      // })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
