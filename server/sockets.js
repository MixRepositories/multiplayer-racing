const socketIO = require('socket.io')

class Sockets {
  init (server) {
    this.sessions = []
    this.io = socketIO(server)
    this.io.on('connection', (socket) => {
      socket.on('playerMove', (data) => {
        this._onPlayerMove(socket, data)
      })
      this._onConnection(socket)
    })
  }

  _getPendingSession () {
    return this.sessions.find(session => session.playerSocket && !session.enemySocket)
  }

  _createPendingSession (socket) {
    this.sessions.push({ playerSocket: socket, enemySocket: null })
  }

  _startGame (session) {
    session.playerSocket.emit('gameStart', { master: true })
    session.enemySocket.emit('gameStart')
  }

  _onConnection (socket) {
    const session = this._getPendingSession()

    if (!session) {
      this._createPendingSession(socket)
    } else {
      session.enemySocket = socket
      this._startGame(session)
    }
  }

  _onPlayerMove (socket, data) {
    const session = this.sessions.find(session => session.playerSocket === socket || session.enemySocket === socket)

    if (session) {
      let opponentSocket
      if (session.playerSocket === socket) {
        opponentSocket = session.enemySocket
      } else {
        opponentSocket = session.playerSocket
      }
      opponentSocket.emit('enemyMove', data)
    }
  }
}

module.exports = new Sockets()
