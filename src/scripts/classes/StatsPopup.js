import { GAME } from '../../assets/constants/scene'

export default class StatsPopup {
  constructor (scene, stats) {
    this.scene = scene
    this.stats = stats
    this.create()
  }

  _generateText () {
    const textTime = `Время заезда: ${this.stats.time.toFixed(3)}`
    const textTimeBestLap = `Время лучшего круга: ${this.stats.timeBestLap.toFixed(3)}`
    const title = 'Уровень пройден!'
    const textToContinue = 'Нажми для продолжения'

    return {
      title,
      textTime,
      textToContinue,
      textTimeBestLap
    }
  }

  create () {
    const styleText = { font: '30px Arial', fill: '#ffffff' }

    const popupWidth = 800
    const popupHeight = 600

    const popupX = (this.scene.sys.game.config.width - popupWidth) / 2
    const popupY = (this.scene.sys.game.config.height - popupHeight) / 2

    this.scene.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.5)
      .fillRect(popupX, popupY, popupWidth, popupHeight)

    const { title, textTime, textTimeBestLap, textToContinue } = this._generateText()

    const centerX = this.scene.cameras.main.centerX
    const centerY = this.scene.cameras.main.centerY

    this.title = this.scene.add.text(
      centerX,
      centerY - 200,
      title,
      { font: '46px Arial', fill: '#fafad2' }
    )
      .setOrigin(0.5)
      .setScrollFactor(0)

    this.textTime = this.scene.add.text(
      centerX,
      centerY - 50,
      textTime,
      styleText
    )
      .setOrigin(0.5)
      .setScrollFactor(0)

    this.textTimeBestLap = this.scene.add.text(
      centerX,
      centerY + 50,
      textTimeBestLap,
      styleText
    )
      .setOrigin(0.5)
      .setScrollFactor(0)

    this.textToContinue = this.scene.add.text(
      centerX,
      centerY + 200,
      textToContinue,
      styleText
    )
      .setOrigin(0.5)
      .setScrollFactor(0)

    this.scene.input.once('pointerdown', () => {
      this.scene.scene.start(GAME)
    })
  }
}
