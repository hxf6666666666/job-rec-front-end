import axios from 'axios'

export default {
  toggleRole: (data) => axios.post('https://mock.apifox.com/m1/3776410-0-default/auth/role/toggle', data),
  login: (data) => axios.post('https://mock.apifox.com/m1/3776410-0-default/auth/login', data, { noNeedToken: true }),
  getUser: () => axios.get('https://mock.apifox.com/m1/3776410-0-default/user/detail'),
}
