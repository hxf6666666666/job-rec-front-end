import { request } from '@/utils/index.js'

export default {
  // toggleRole: (data) => axios.post('https://mock.apifox.com/m1/3776410-0-default/auth/role/toggle', data),
  login: (data) => request.post('/auth/login', data),
  // getUser: () => axios.get('https://mock.apifox.com/m1/3776410-0-default/user/detail'),
}
