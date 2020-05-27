const { Router } = require('express')
const router = Router()
const axios = require('axios')
const API_HEADERS = require('../utils/headers')

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API_BASE}/guilds`,
      {
        headers: {
          authorization: req.headers.authorization,
          ...API_HEADERS()
        }
      })
    res.json(response.data)
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

router.get('/:guildID/info', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API_BASE}/guilds/${req.params.guildID}/info`,
      {
        headers: {
          authorization: req.headers.authorization,
          ...API_HEADERS()
        }
      })
    res.json(response.data)
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

router.get('/:guildID/data', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API_BASE}/guilds/${req.params.guildID}/data`,
      {
        headers: {
          authorization: req.headers.authorization,
          ...API_HEADERS()
        }
      })
    res.json(response.data)
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

router.patch('/:guildID/data', async (req, res) => {
  try {
    const response = await axios.patch(`${process.env.API_BASE}/guilds/${req.params.guildID}/data`,
      req.body,
      {
        headers: {
          authorization: req.headers.authorization,
          ...API_HEADERS()
        }
      })
    res.json(response.data)
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

module.exports = router
