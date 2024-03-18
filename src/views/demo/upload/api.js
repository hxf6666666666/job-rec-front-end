import { request } from '@/utils/index.js'

export default {
  uploadResume: (data) => request.post('/resume/upload', data),
  read: (params = {}) => request.get('/resume/all', { params }),
  delete: (id) => request.delete(`/resume/${id}`),
}
