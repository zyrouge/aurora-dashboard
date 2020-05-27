const { Router } = require('express')
const router = Router()
const axios = require('axios')
const API_HEADERS = require('../utils/headers')

router.use('/guilds', require('./guilds'))
router.use('/utils', require('./utils'))

router.get('/commands', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_BASE}/commands`,
      {
        headers: {
          ...API_HEADERS()
        }
      }
    )

    res.json(response.data)
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

module.exports = router
