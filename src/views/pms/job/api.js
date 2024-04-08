import { request } from '@/utils'
export default {
  create: (data) => request.post('/job', data),
  read: (params = {}) => request.get('/recruitment/search', { params }),
  delete: (id) => request.delete(`/recruitment/delete/${id}`),
  update: (data) => request.patch(`/job/${data.id}`, data)
}
