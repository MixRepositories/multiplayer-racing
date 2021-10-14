const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const PORT = 3000
const DOC_ROOT = '../dist/'
const documentRoot = path.join(__dirname, DOC_ROOT)

const app = express()

const server = http.createServer(app)

const staticContent = express.static(documentRoot)
app.use(staticContent)

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

const io = socketIO(server)
io.on('connection', (socket) => {
  io.emit('gameStart')
  console.log(`new client ${socket.id}`)
})
