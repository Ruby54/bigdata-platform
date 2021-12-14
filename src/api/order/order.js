import request from '@/utils/request'
const api_name = '/admin/statistics'
export default {
  getTradeByDaysAndDt(recentDays,curDate) {
    return request({
      url: `http://localhost:8081/statistics/getTradeByDaysAndDt?days=${recentDays}&dt=${curDate}`,
      method: 'get',
      timeout: 10000
    })
  },
  getOrderProvinceData(recentDays,curDate,orderSelect) {
    return request({
      url: `http://localhost:8081/statistics/getOrderProvinceData?days=${recentDays}&dt=${curDate}&orderSelect=${orderSelect}`,
      method: 'get',
      timeout: 10000
    })
  }
}
