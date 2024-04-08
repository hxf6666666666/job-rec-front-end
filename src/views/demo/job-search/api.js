import { request } from '@/utils'
export default {
  read: (params = {}) => request.get('/recruitment/search', { params }),
}
