const express = require('express')
const app = express()
const socket = require('socket.io')
const path = require('path')
const morgan = require('morgan')
const PORT = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else next()
  })
}

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

const io = socket(server)
require('./socket')(io)
