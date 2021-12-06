import request from '@/utils/request'

const api_name = '/admin/statistics'
export default {
  getCouponNameByStartDate(data) {
    return request({
      url: 'http://localhost:8081/statistics/getCouponNameByStartDate',
      method: 'post',
      timeout: 10000,
      data: data
    })
  },
  getCouponList(data) {
    return request({
      url: 'http://localhost:8081/statistics/getCouponList',
      method: 'post',
      timeout: 10000,
      data: data
    })
  }
}
