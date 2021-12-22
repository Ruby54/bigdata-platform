import request from '@/utils/request'

const api_name = '/admin/dataaccess'
export default {
  getDataAccess(data) {
    return request({
      url: '/api/connectors',
      method: 'post',
      // 允许跨域
      changeOrigin: true,
      data: data
    })
  }
}
