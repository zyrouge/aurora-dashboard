export const actions = {
  nuxtServerInit ({ dispatch }, { req }) {
    if (req.session && req.session.token && req.session.type) {
      dispatch('oauth/manualLogin', {
        token: req.session.token,
        type: req.session.type
      })
    } else if (this.$cookies.get('token') && this.$cookies.get('type')) {
      try {
        dispatch('oauth/cookieLogin', {
          token: this.$cookies.get('token'),
          type: this.$cookies.get('type')
        })
      } catch (error) {
        dispatch('oauth/logout')
      }
    }
  }
}
