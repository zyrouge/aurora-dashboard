export default function ({ store, error }) {
  if (!store.state.oauth.token) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
