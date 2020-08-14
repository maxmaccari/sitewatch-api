const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')

const cors = require('cors')

const pingRoute = require('./routes/ping')

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use(cors())
app.options('*', cors())

app.use('/ping', pingRoute)

app.get('/',function(req,res){
  res.send('Sitewatch API')
})

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)

  const error = {
    message: err.message || 'Internal Error',
    status: err.status || 500
  }

  res.json(error)
})


module.exports = app