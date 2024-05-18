import { request } from '@/utils'
export default {
  create: (data) => request.post('/recruitment/post', data),
  read: (params = {}) => request.get('/recruitment/search2', { params }),
  delete: (id) => request.delete(`/recruitment/delete/${id}`),
  update: (data) => request.patch(`/job/${data.id}`, data)
}
