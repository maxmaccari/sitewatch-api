const cors = require('cors')

const PingService = require('../services/pingService')
const validateUrl = require('../helpers/validateUrl')

const router = require('express').Router()

router.options('/ping', cors())
router.post('/ping', cors(), function(req,res){
  if (!req.body.url) return res.status(400).send('invalid request')
  if(!validateUrl(req.body.url)) return res.status(400).send('invalid url')

  const url = req.body.url

  PingService.ping(url).then(({latency, status}) => {
    const result = {
      id: 'ping-id',
      url,
      latency,
      status
    }

    res.status(200).json(result)
  }).catch(error => {

    res.status(401).json({
      url,
      code: error.code,
      description: error.message
    })
  })  
})

module.exports = router