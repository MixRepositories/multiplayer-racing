export default class StatsPanel {
  constructor (scene, stats) {
    this.scene = scene
    this.stats = stats
    this.create()
  }

  _generateText () {
    const textLapOfLaps = `Круг: ${this.stats.lap}/${this.stats.laps}`
    const textTime = `Время заезда: ${this.stats.time.toFixed(3)}`
    const textTimeBestLap = `Время лучшего круга: ${this.stats.timeBestLap.toFixed(3)}`
    const textTimeLap = `Время круга: ${this.stats.timeLap.toFixed(3)}`

    return {
      textLapOfLaps,
      textTime,
      textTimeBestLap,
      textTimeLap
    }
  }

  create () {
    const styleText = { font: '22px Arial', fill: '#ffffff' }
    const { textLapOfLaps, textTime, textTimeBestLap, textTimeLap } = this._generateText()

    this.lapOfLaps = this.scene.add.text(10, 10, textLapOfLaps, styleText).setScrollFactor(0)
    this.time = this.scene.add.text(10, 40, textTime, styleText).setScrollFactor(0)
    this.timeBestLap = this.scene.add.text(10, 70, textTimeBestLap, styleText).setScrollFactor(0)
    this.timeLap = this.scene.add.text(10, 100, textTimeLap, styleText).setScrollFactor(0)
  }

  render () {
    const { textLapOfLaps, textTime, textTimeBestLap, textTimeLap } = this._generateText()

    this.lapOfLaps.setText(textLapOfLaps)
    this.time.setText(textTime)
    this.timeBestLap.setText(textTimeBestLap)
    this.timeLap.setText(textTimeLap)
  }

  update () {
    this.render()
  }
}
