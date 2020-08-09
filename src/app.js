const express = require('express')
const bodyParser = require('body-parser')
const pingRoute = require('./routes/ping')

const app = express()

app.use(bodyParser.json())


app.use('/', pingRoute)
app.get('/',function(req,res){
  res.send("Sitewatch API")
})


module.exports = app