import Vue from 'vue'

export default {
  login (state, { token, type }) {
    Vue.set(state, 'token', token)
    Vue.set(state, 'type', type)
  },
  logout (state) {
    Vue.set(state, 'token', '')
    Vue.set(state, 'type', '')
  }
}
