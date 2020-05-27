const { Router } = require('express')
const router = Router()
const axios = require('axios')
const API_HEADERS = require('../utils/headers')

router.get('/botchart', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API_BASE}/botchart`,
      {
        headers: {
          ...API_HEADERS()
        }
      })
    res.json(response.data)
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

router.get('/dashboardchart', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API_BASE}/dashboardchart`,
      {
        headers: {
          ...API_HEADERS()
        }
      })
    res.json(response.data)
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

router.get('/incidents', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API_BASE}/statuschannel`,
      {
        headers: {
          ...API_HEADERS()
        }
      })
    res.json(response.data)
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

router.get('/botstats', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API_BASE}/status`,
      {
        headers: {
          ...API_HEADERS()
        }
      })
    res.json(response.data)
  } catch (error) {
    res.status(401).json({ ok: false })
  }
})

module.exports = router
