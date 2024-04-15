import { request } from '@/utils'
export default {
  getHistory: (userId) => request.get(`/user/history/${userId}`),
  getFavorites:(userId) => request.get(`/user/favorites/${userId}`),
  getApplications:(userId) => request.get(`/user/applications/${userId}`),
  getMyOffers:(userId) => request.get(`/user/myOffers/${userId}`),
}