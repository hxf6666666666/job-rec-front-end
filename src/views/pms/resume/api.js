import { request } from '@/utils/index.js'

export default {
  read: (params = {}) => request.get('/resume/all', { params }),
  delete: (id) => request.delete(`/resume/${id}`),
}
