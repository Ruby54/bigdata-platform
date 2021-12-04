import request from '@/utils/request'

export default {
  getSqlList(data) {
    return request({
      url: 'http://localhost:8081/report/querySql',
      method: 'post',
      timeout: 10000,
      data: data
    })
  }
}
