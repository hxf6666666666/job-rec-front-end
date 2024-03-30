import { request } from '@/utils'
export default {
  create: (data) => request.post('/job', data),
  read: (params = {}) => request.get('/job/all', { params }),
  delete: (id) => request.delete(`/job/${id}`),
  update: (data) => request.patch(`/job/${data.id}`, data)
}
