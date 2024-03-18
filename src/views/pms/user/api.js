import { request } from '@/utils'
export default {
  create: (data) => request.post('/user', data),
  read: (params = {}) => request.get('/user/all', { params }),
  delete: (id) => request.delete(`/user/${id}`),
  update: (data) => request.patch(`/user/${data.id}`, data),
  resetPwd: (id, data) => request.patch(`/user/password/reset/${id}`, data),
  getAllRoles: () => request.get('/role?enable=1'),
}
