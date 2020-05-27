import axios from 'axios'

export default {
  async login ({ commit }, { code }) {
    try {
      const { data: { token, type, expire } } = await axios.post('/api/auth/login', { code })
      this.$cookies.set('token', token, { maxAge: expire })
      this.$cookies.set('type', type, { maxAge: expire })
      commit('login', { token, type })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid Creadentials')
      }
      throw error
    }
  },
  async logout ({ commit }) {
    await axios.post('/api/auth/logout')
    this.$cookies.remove('token')
    this.$cookies.remove('type')
    commit('logout')
  },
  manualLogin ({ commit }, { token, type }) {
    commit('login', { token, type })
  },
  cookieLogin ({ commit }, { token, type }) {
    // await axios.post('/api/auth/manual', { token, type })
    commit('login', { token, type })
  }
}
