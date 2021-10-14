import { Scene } from 'phaser'
import { GAME } from '../../assets/constants/scene'
import { BG } from '../../assets/constants/sprites'
import Map from '../classes/Map'
import Player from '../classes/Player'
import Stats from '../classes/Stats'
import StatsPanel from '../classes/StatsPanel'
import StatsPopup from '../classes/StatsPopup'

const LAPS = 1

class GameScene extends Scene {
  constructor () {
    super(GAME)
  }

  init () {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload () {
    this.add.sprite(0, 0, BG).setOrigin(0)
  }

  create () {
    this.map = new Map(this)
    this.player = new Player({ scene: this, map: this.map })
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

  onLapComplete (lap) {
    this.stats.onLapComplete()

    if (this.stats.complete) {
      this.statsPopup = new StatsPopup(this, this.stats)
    }
  }

  update (time, dt) {
    this.stats.update(dt)
    this.statsPanel.update()
    this.player.move()
  }
}

export default GameScene
