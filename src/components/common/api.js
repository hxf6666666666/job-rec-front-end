import { request } from '@/utils'
export default {
  getJobById: (id) => request.get(`/recruitment/getByID/${id}`),
  update: (data)=> request.put(`/recruitment/update`,data),
  uploadEmployee: (userId, data) => request.post(`/employee/upload/${userId}`, data),
  getByUserId: (userId) => request.get(`/employee/getByUserId/${userId}`),
  getAll: ()=> request.get('/employee/getAll')
}
