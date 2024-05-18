import { request } from '@/utils'

export default {
  // 获取用户信息
  getUser: () => request.get('/user/detail'),
  // 刷新token
  refreshToken: () => axios.get('https://mock.apifox.com/m1/3776410-0-default/auth/refresh/token'),
  // 登出
  logout: () => request.post('/auth/logout'),
  // 切换当前角色
  switchCurrentRole: (role) => axios.post(`https://mock.apifox.com/m1/3776410-0-default/auth/current-role/switch/${role}`),
  // 获取角色权限
  getRolePermissions: () => axios.get('https://mock.apifox.com/m1/3776410-0-default/role/permissions/tree'),
  // 验证菜单路径
  validateMenuPath: (path) => axios.get(`https://mock.apifox.com/m1/3776410-0-default/permission/menu/validate?path=${path}`),
  RecruitmentCountAll:() => request.get('/recruitment/countAll'),
  EmployeeCountAll:() => request.get('/employee/countAll'),
}
