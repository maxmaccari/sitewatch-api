const { v4: uuidv4 } = require('uuid')

const PingService = require('../services/PingService')
const validateUrl = require('../helpers/validateUrl')

const router = require('express').Router()

// POST /ping
router.post('/', async function(req,res){
  if (!req.body.url) return res.status(400).send('invalid request')
  if(!validateUrl(req.body.url)) return res.status(400).send('invalid url')

  const url = req.body.url

  try {
    const {latency, status} = await PingService.ping(url)

    const result = {
      id: uuidv4(),
      url,
      latency,
      status
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(401).json({
      url,
      code: error.code,
      message: error.message
    })
  }
})

module.exports = router