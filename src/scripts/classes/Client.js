import { Events } from 'phaser'
import io from 'socket.io-client'

const HOST = 'http://localhost:3000'

export default class Client extends Events.EventEmitter {
  constructor () {
    super()
  }

  init () {
    const socket = io(HOST)
    socket.on('connect', () => {
      console.log('client connect')
    })

    socket.on('disconnect', () => {
      console.log('client disconnect')
    })

    socket.on('gameStart', () => {
      this.emit('game')
    })
  }
}
