import request from '@/utils/request'

const api_name = '/admin/statistics'
export default {
  getActivityNameByDt(data) {
    return request({
      url: 'http://localhost:8081/statistics/getActivityNameByDt',
      method: 'post',
      timeout: 10000,
      data: data
    })
  },
  getActivityList(data) {
    return request({
      url: 'http://localhost:8081/statistics/getActivityList',
      method: 'post',
      timeout: 10000,
      data: data
    })
  }
}
