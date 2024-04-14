import { request } from '@/utils/index.js'

export default {
  read: (params = {}) => request.get('/resume/search', { params }),
  delete: (id) => request.delete(`/resume/delete/${id}`),
  getName: (id) => request.get(`/employee/getByID/${id}`)
}
