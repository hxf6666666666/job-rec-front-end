import { request } from '@/utils/index.js'

export default {
  uploadResume: (id, data) => request.post(`/resume/upload/${id}`, data),
  read: (params = {}) => request.get('/resume/all', { params }),
  getByUserId: (userId) => request.get(`/employee/getByUserId/${userId}`),
  getResumeByUserId: (userId) => request.get(`/resume/getByUserId/${userId}`),
  getPdf: (params = {}) => request.get('bucket/getPdf', { params }),
  uploadEmployee: (userId, data) => request.post(`/employee/upload/${userId}`, data),
  askXF: (data) => request.post('/xfModel/test', data)
}
