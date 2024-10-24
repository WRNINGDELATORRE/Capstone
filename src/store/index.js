import { createStore } from 'vuex'
import api from './api'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    userName: localStorage.getItem('userName') || 'Guest',
    userAvatar: localStorage.getItem('userAvatar') || 'src/assets/images/default1.png',
    userId: localStorage.getItem('userId') || null,
    userRole: localStorage.getItem('userRole') || null,
    schoolId: localStorage.getItem('schoolId') || null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.token = userData.token
      state.userName = userData.firstName
      state.userAvatar = userData.profile_image 
    ? `http://localhost/backend/${userData.profile_image}`
    : 'src/assets/images/default1.png'
  console.log('Setting userAvatar:', state.userAvatar)
      state.userId = userData.userId
      state.userRole = userData.role
      state.schoolId = userData.schoolId
      localStorage.setItem('token', userData.token)
      localStorage.setItem('userName', userData.firstName)
      localStorage.setItem('userAvatar', state.userAvatar)
      localStorage.setItem('userId', userData.userId)
      localStorage.setItem('userRole', userData.role)
      localStorage.setItem('schoolId', userData.schoolId)
    },
    CLEAR_USER_DATA(state) {
      state.token = null
      state.userName = 'Guest'
      state.userAvatar = 'src/assets/images/qq.jpg'
      state.userId = null
      state.userRole = null
      state.schoolId = null
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userAvatar')
      localStorage.removeItem('userId')
      localStorage.removeItem('userRole')
      localStorage.removeItem('schoolId')
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('http://localhost/backend/src/routes/api.php?action=login', credentials)
        if (response.data.status === 'success' && response.data.token) {
          commit('SET_USER_DATA', {
            token: response.data.token,
            userId: response.data.data.user_id,
            firstName: response.data.data.first_name,
            profile_image: response.data.data.profile_image, // Change this line
            role: response.data.data.role,
            schoolId: response.data.data.school_id
          })
          return response.data
        } else if (response.data.status === 'error') {
          throw new Error(response.data.message || 'Login failed')
        } else {
          throw new Error('Unexpected response from server')
        }
      } catch (error) {
        console.error('Login error details:', error.response ? error.response.data : error.message)
        throw error
      }
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    userName: state => state.userName,
    userAvatar: state => state.userAvatar,
    userId: state => state.userId,
    userRole: state => state.userRole,
    schoolId: state => state.schoolId
  }
})

