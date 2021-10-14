import { OBJECTS } from '../../assets/constants/sprites'
import Phaser from 'phaser'

const DIRECTION = Object.freeze({ BACKWARD: -1, NONE: 0, FORWARD: 1 })
const TURN = Object.freeze({ LEFT: -1, NONE: 0, RIGHT: 1 })
const SPEED = 10
const ACCELERATION = 0.5
const SLIDE_ANGLE = 5

class Player {
  constructor ({ scene, map }) {
    this.scene = scene
    this.map = map
    const position = this.map.getPlayerPosition()
    this.car = this.scene.matter.add.sprite(position.x, position.y, OBJECTS, 'car_blue_1')
    this.car.setFixedRotation(true)
    this._velocity = 0
    this.checkpoint = 0
  }

  get direction () {
    let direction = DIRECTION.NONE
    const { up, down } = this.scene.cursors
    if (up.isDown) direction = DIRECTION.FORWARD
    else if (down.isDown) direction = DIRECTION.BACKWARD
    return direction
  }

  get velocity () {
    const speed = Math.abs(this._velocity)
    const maxSpeed = this.getMaxSpeed()
    if (this.direction && speed < maxSpeed) {
      this._velocity += ACCELERATION * Math.sign(this.direction)
    } else if ((this.direction && speed > maxSpeed) || (!this.direction && speed > 0)) {
      this._velocity -= ACCELERATION * Math.sign(this._velocity)
    }
    return this._velocity
  }

  get turn () {
    let turn = TURN.NONE
    const { left, right } = this.scene.cursors
    if (left.isDown) turn = TURN.LEFT
    else if (right.isDown) turn = TURN.RIGHT
    return turn
  }

  get angle () {
    return this.car.angle + this.turn * SPEED / 2
  }

  getVelocityFromAngle () {
    const vec2 = new Phaser.Math.Vector2()
    return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity)
  }

  getMaxSpeed () {
    return SPEED * this.map.getTileFriction(this.car)
  }

  slide () {
    this.car.angle += SLIDE_ANGLE
  }

  move () {
    this.car.setAngle(this.angle)
    const velocity = this.getVelocityFromAngle()
    this.car.setVelocity(velocity.x, velocity.y)
    this.checkPosition()
  }

  checkPosition () {
    const checkpoint = this.map.getCheckpoint(this.car)
    if (checkpoint) {
      this.onCheckpoint(checkpoint)
    }
  }

  onCheckpoint (checkpoint) {
    if (checkpoint === 1 && this.checkpoint === this.map.checkpoints.length) {
      this.checkpoint = 1
      this.car.emit('lap')
    } else if (checkpoint === this.checkpoint + 1) {
      ++this.checkpoint
    }
  }
}

export default Player
