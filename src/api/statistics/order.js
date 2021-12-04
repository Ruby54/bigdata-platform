import request from '@/utils/request'

const api_name = '/admin/statistics'
export default {
  getOrderUserData(data) {
    return request({
      url: 'http://localhost:8081/statistics/orderTotal',
      method: 'post',
      timeout: 10000,
      data: data
    })
  }
}
