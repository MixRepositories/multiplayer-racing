import { Scene } from 'phaser'
import bgPng from '../../assets/sprites/bg.png'
import { BG } from '../../assets/constants/sprites'
import { BOOT, PRELOAD } from '../../assets/constants/scene'

class BootScene extends Scene {
  constructor () {
    super(BOOT)
  }

  preload () {
    this.load.image(BG, bgPng)
  }

  create () {
    this.scene.start(PRELOAD)
  }
}

export default BootScene
