import request from '@/utils/request'

const api_name = '/admin/statistics'
export default {
  getTrafficStats(recentDays,curDate) {
    return request({
      url: `http://localhost:8081/statistics/getTrafficStats?days=${recentDays}&dt=${curDate}`,
      method: 'get'
    })
  },
  getPagePathData(recentDays,curDate) {
    return request({
      url: `http://localhost:8081/statistics/getPagePath?days=${recentDays}&dt=${curDate}`,
      method: 'get'
    })
  }


}
