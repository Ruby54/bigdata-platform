import request from '@/utils/request'

const api_name = '/admin/statistics'
export default {
  getUserActionConvert(recentDays,curDate) {
    return request({
      url: `http://localhost:8081/statistics/getUserActionConvert?recentDays=${recentDays}&curDate=${curDate}`,
      method: 'get',
      timeout: 10000
    })
  },
  getUserRetention(curDate) {
    return request({
      url: `http://localhost:8081/statistics/getUserRetention?dt=${curDate}`,
      method: 'get'
    })
  },
  getUserTotal(curDate,recentDays) {
    return request({
      url: `http://localhost:8081/statistics/getUserTotal?dt=${curDate}&days=${recentDays}`,
      method: 'get'
    })
  }


}
