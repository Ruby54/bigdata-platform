import request from '@/utils/request'

const api_name = '/admin/statistics'
export default {
  getTmRepeat(recentDays,curDate,showNum) {
    return request({
      url: `http://localhost:8081/statistics/getTmRepeat?recentDays=${recentDays}&curDate=${curDate}&showNum=${showNum}`,
      method: 'get',
      timeout: 10000
    })
  },
  getCateTradeStats(recentDays,curDate) {
    return request({
      url: `http://localhost:8081/statistics/getCateTradeStats?recentDays=${recentDays}&curDate=${curDate}`,
      method: 'get',
      timeout: 10000
    })
  },
  getTmTradeStats(recentDays,curDate) {
    return request({
      url: `http://localhost:8081/statistics/getTmTradeStats?recentDays=${recentDays}&curDate=${curDate}`,
      method: 'get',
      timeout: 10000
    })
  },
  getCategory1(curDate) {
    return request({
      url: `http://localhost:8081/statistics/getCategory1?curDate=${curDate}`,
      method: 'get',
      timeout: 10000
    })
  },
  getCategory2(curDate,category1) {
    return request({
      url: `http://localhost:8081/statistics/getCategory2?curDate=${curDate}&category1_id=${category1}`,
      method: 'get',
      timeout: 10000
    })
  },
  getCategory3(curDate,category1,category2) {
    return request({
      url: `http://localhost:8081/statistics/getCategory3?curDate=${curDate}&category1_id=${category1}&category2_id=${category2}`,
      method: 'get',
      timeout: 10000
    })
  },
  getTmTopNData(curDate,category1,category2,category3) {
    return request({
      url: `http://localhost:8081/statistics/getTmTopNData?curDate=${curDate}&category1_id=${category1}&category2_id=${category2}&category3_id=${category3}`,
      method: 'get',
      timeout: 10000
    })
  }
}
