const path = require('path')
const express = require('express')
const http = require('http')
const sockets = require('./sockets')

const PORT = 8753
const DOC_ROOT = '../dist/'
const documentRoot = path.join(__dirname, DOC_ROOT)

const app = express()

const server = http.createServer(app)

const staticContent = express.static(documentRoot)
app.use(staticContent)

sockets.init(server)
server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
