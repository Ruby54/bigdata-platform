import request from '@/utils/request'

export default{

  findAllConnection() {
    return request({
      url: '/sweditor/connection/etl/findAllConnection',
      method: 'post',
      timeout: 10000
    })
  },
  findByMultiConId(id){
    return request({
      url: '/sweditor/connection/findByMultiConId',
      method: 'post',
      timeout: 10000,
      data: {
        multiConId:id
      }
    })
  },
  findByConById(id){
    return request({
      url: '/sweditor/connection/'+id,
      method: 'get',
      timeout: 10000
    })
  },
  getFieldMappping(event){
    return request({
      url: '/etl/autoSync/getFieldMappping',
      method: 'post',
      timeout: 10000,
      data:event
    })
  },
  //auto ods
  createAutoOdsEtl(event){
    return request({
      url: '/etl/autoSync/add',
      method: 'post',
      timeout: 10000,
      data:event
    })
  },
  createEtlBySimple(event){
    return request({
      url: '/etl/autoSync/createEtlBySimple',
      method: 'post',
      timeout: 10000,
      data:event
    })
  },
  submitTaskPlatform(id,execParams,engine){
    return request({
      url: '/etl/autoSync/submitTaskPlatform',
      method: 'post',
      timeout: 10000,
      data:{
        id:id,
        execParams:execParams,
        engine:engine
      }
    })
  },
  getETLContent(id) {
    return request({
      url: '/etl/autoSync/' + id,
      method: 'post',
      timeout: 10000
    })
  },
  //查询页面接口
  searchETL(query){
    return request({
      url: '/etl/autoSync/search' ,
      method: 'post',
      timeout: 10000,
      data: query
    })
  },
  //测试通过后根据etlid获得taskid

  findTaskByName(name){
    return request({
      url: '/schedule/task/getByTaskNameIgnoreStatus' ,
      method: 'post',
      timeout: 10000,
      data:{
        name:name
      }
    })
  },
  getLastTestResult(id) {
    return request({
      url: '/etl/autoSync/last_test/' + id,
      method: 'post',
      timeout: 10000
    })
  },
  //切换
  createEtlByTaskNames(taskNames) {
    return request({
      url: '/etl/autoSync/createEtlByTaskNames',
      method: 'post',
      data:{
        taskNames:taskNames
      },
      timeout: 10000
    })
  },
  //online switch
  switchEtlByTaskNames(taskNames) {
    return request({
      url: '/etl/autoSync/switchEtlByTaskNames',
      method: 'post',
      data:{
        taskNames:taskNames
      },
      timeout: 10000
    })
  },

  //
  findOnlineEtlByName(taskNames) {
    return request({
      url: '/etl/autoSync/findOnlineEtlByName',
      method: 'post',
      data:{
        taskNames:taskNames
      },
      timeout: 10000
    })
  },
  updateUniqueKeyById(id,uniqueKey) {
    return request({
      url: '/etl/autoSync/updateUniqueKeyById',
      method: 'post',
      data:{
        id:id,
        uniqueKey:uniqueKey
      },
      timeout: 10000
    })
  }

}
