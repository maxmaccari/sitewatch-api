const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const pingRoute = require('./routes/ping')

const app = express()

app.use(cors())
app.options('*', cors())

app.use(bodyParser.json())

app.use('/ping', pingRoute)

// This is a route only to know if the application is running properly
app.get('/',function(req,res){
  res.send('Sitewatch API')
})

module.exports = app