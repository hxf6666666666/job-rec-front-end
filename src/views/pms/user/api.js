import { request } from '@/utils'
export default {
  create: (data) => request.post('/user', data),
  read: (params = {}) => request.get('/user/all', { params }),
  delete: (id) => request.delete(`/user/${id}`),
  update: (data) => request.patch(`/user/${data.id}`, data),
}
