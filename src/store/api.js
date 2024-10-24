import axios from 'axios'
import { Notify } from 'quasar'

const api = axios.create({
  baseURL: 'http://localhost/backend/src/routes/api.php'
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Notify.create({
        type: 'negative',
        message: 'Unauthorized access. Please log in again.'
      })
      // Redirect to login page
      // You might want to use router.push('/login') here
    }
    return Promise.reject(error)
  }
)

export default api