import request from '@/utils/request'

const api_name = '/admin/statistics'
export default {
  getGMV(today) {
    return request({
      url: `http://localhost:8081/statistics/gmv?date=${today}`,
      method: 'get'
    })
  },
  getProductStatsGroupBySpu(today,limit) {
    return request({
      url: `http://localhost:8081/statistics/spu?date=${today}&limit=${limit}`,
      method: 'get'
    })
  },
  getProductStatsGroupByCategory3(nowTimeStamp) {
    return request({
      url: `http://localhost:8081/statistics/category3?date=${nowTimeStamp}`,
      method: 'get'
    })
  },
  getProductStatsByTrademark(today,limit) {
    return request({
      url: `http://localhost:8081/statistics/trademark?date=${today}&limit=${limit}`,
      method: 'get'
    })
  },
  getProvinceStats(today) {
    return request({
      url: `http://localhost:8081/statistics/province?date=${today}`,
      method: 'get'
    })
  },
  getVisitorStatsByNewFlag(today) {
    return request({
      url: `http://localhost:8081/statistics/visitor?date=${today}`,
      method: 'get'
    })
  },
  getMidStatsGroupbyHourNewFlag(today) {
    return request({
      url: `http://localhost:8081/statistics/hr?date=${today}`,
      method: 'get'
    })
  }

}
