import { Scene } from 'phaser'
import { GAME, START } from '../../assets/constants/scene'
import { BG } from '../../assets/constants/sprites'
import Client from '../classes/Client'

class StartScene extends Scene {
  constructor () {
    super(START)
  }

  create () {
    this._createBackground()
    this._createPopup()
    this._setEvents()
  }

  _createBackground () {
    this.add.sprite(0, 0, BG).setOrigin(0)
  }

  _createPopup () {
    const popupWidth = 500
    const popupHeight = 300

    const popupX = (this.sys.game.config.width - popupWidth) / 2
    const popupY = (this.sys.game.config.height - popupHeight) / 2

    this.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.5)
      .fillRect(popupX, popupY, popupWidth, popupHeight)

    this._createButtons()
  }

  _createButtons () {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    this.soloGameButton = this.add.text(
      centerX,
      centerY - 50,
      'Один игрок',
      { font: 'bold 46px Arial', fill: '#fafad2' }
    )
      .setOrigin(0.5)
      .setInteractive()

    this.multyGameButton = this.add.text(
      centerX,
      centerY + 50,
      'Два игрока',
      { font: 'bold 46px Arial', fill: '#fafad2' }
    )
      .setOrigin(0.5)
      .setInteractive()
  }

  _setEvents () {
    this.soloGameButton.on('pointerdown', this._startSoloGame, this)
    this.multyGameButton.on('pointerdown', this._startMultyGame, this)
  }

  _startSoloGame () {
    this.scene.start(GAME)
  }

  _startMultyGame () {
    console.log('click multyGameButton')
    this.client = new Client()
    this.client.init()
    this.client.on('game', () => {
      this._startSoloGame()
    })
  }
}

export default StartScene
