import { Scene } from 'phaser'
import { GAME } from '../../assets/constants/scene'
import { BG } from '../../assets/constants/sprites'
import Map from '../classes/Map'
import Player from '../classes/Player'
import Stats from '../classes/Stats'
import StatsPanel from '../classes/StatsPanel'
import StatsPopup from '../classes/StatsPopup'

const LAPS = 1
const CARS = {
  BLUE: {
    sprite: 'car_blue_1',
    position: 'player'
  },
  RED: {
    sprite: 'car_red_1',
    position: 'enemy'
  }
}

class GameScene extends Scene {
  constructor () {
    super(GAME)
  }

  init (data) {
    if (data.client) {
      this.client = data.client
    }
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload () {
    this.add.sprite(0, 0, BG).setOrigin(0)
  }

  create () {
    const configCars = this._getCarsConfig()
    this.map = new Map(this)
    this.player = new Player({ scene: this, map: this.map, car: configCars.player })
    if (this.client) {
      this.enemy = new Player({ scene: this, map: this.map, car: configCars.enemy })
      this.client.on('enemyMove', (data) => {
        this.enemy.car.setX(data.x)
        this.enemy.car.setY(data.y)
        this.enemy.car.setAngle(data.angle)
      })
    }
    this.stats = new Stats(this, LAPS)
    this.statsPanel = new StatsPanel(this, this.stats)

    this.cameras.main.setBounds(0, 0, this.map.tileMap.widthInPixels, this.map.tileMap.heightInPixels)
    this.cameras.main.startFollow(this.player.car)

    this.player.car.on('lap', this.onLapComplete, this)
    this.matter.world.on('collisionactive', (event, a, b) => {
      if (b.gameObject === this.player.car && a.gameObject.frame.name === 'oil') {
        this.player.slide()
      }
    })
  }

  _getCarsConfig () {
    const config = { player: CARS.BLUE, enemy: CARS.RED }
    if (this.client && !this.client.master) {
      config.player = CARS.RED
      config.enemy = CARS.BLUE
    }

    return config
  }

  onLapComplete () {
    this.stats.onLapComplete()

    if (this.stats.complete) {
      this.statsPopup = new StatsPopup(this, this.stats)
    }
  }

  update (time, dt) {
    this.stats.update(dt)
    this.statsPanel.update()
    this.player.move()
    this._sync()
  }

  _sync () {
    if (this.client) {
      this.client.send({
        x: this.player.car.x,
        y: this.player.car.y,
        angle: this.player.car.angle
      })
    }
  }
}

export default GameScene
