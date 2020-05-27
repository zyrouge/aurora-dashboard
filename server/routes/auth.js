const qs = require('querystring')
const { Router } = require('express')
const router = Router()
const axios = require('axios')

const REDIRECT = process.env.NODE_ENV === 'production'
  ? 'https://auroradiscordbt.ga/callback'
  : 'http://localhost:3000/callback'

router.post('/login', async (req, res) => {
  const { code } = req.body

  if (!code) {
    return res.json({ ok: false })
  }
  try {
    const response = await axios.post(
      'https://discordapp.com/api/oauth2/token',
      qs.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        scope: 'identify guilds',
        redirect_uri: REDIRECT,
        code
      }),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    )

    req.session.token = response.data.access_token
    req.session.refresh = response.data.refresh_token
    req.session.type = response.data.token_type
    req.session.expire = response.data.expires_in

    res.json({
      token: response.data.access_token,
      type: response.data.token_type,
      expire: response.data.expires_in,
      refresh: response.data.refresh_token
    })
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

router.post('/logout', (req, res) => {
  delete req.session.token
  delete req.session.refresh
  delete req.session.type
  delete req.session.expire

  res.json({ ok: true })
})

module.exports = router
