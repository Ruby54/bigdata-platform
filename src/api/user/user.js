import request from '@/utils/request'
const api_name = '/admin/statistics'
export default {
  getUserActionByDaysAndDt(recentDays,curDate) {//定义一个方法 用来接收 后端传送给过来的数据
    return request({
      url: `http://localhost:8081/statistics/getUserActionByDaysAndDt?days=${recentDays}&dt=${curDate}`,
      method: 'get',
      timeout: 10000
    })
  },
  getNewBuyerStatsByDaysAndDt(recentDays,curDate){
    return request({
      url: `http://localhost:8081/statistics/getNewBuyerStatsByDaysAndDt?days=${recentDays}&dt=${curDate}`,
      method: 'get',
      timeout: 10000
    })
  },
  getUserChangeByDt(curDate){
    return request({
      url: `http://localhost:8081/statistics/getUserChangeByDt?dt=${curDate}`,
      method: 'get',
      timeout: 10000
    })
  },
  getUserStatsByDaysAndDt(recentDays,curDate){
    return request({
      url: `http://localhost:8081/statistics/getUserStatsByDaysAndDt?days=${recentDays}&dt=${curDate}`,
      method: 'get',
      timeout: 10000
    })
  },
  getUserRetentionByDt(curDate){
    return request({
      url: `http://localhost:8081/statistics/getUserRetentionByDt?dt=${curDate}`,
      method: 'get',
      timeout: 10000
    })

  }

}
