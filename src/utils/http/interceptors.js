import { useAuthStore } from '@/store'

export function setupInterceptors(axiosInstance) {
  function reqResolve(config) {
    const { accessToken } = useAuthStore()
    if (accessToken) {
      config.headers.Authorization = 'Bearer Bearer ' + accessToken
    }
    return config
  }

  function reqReject(error) {
    return Promise.reject(error)
  }

  axiosInstance.interceptors.request.use(reqResolve, reqReject)
}
