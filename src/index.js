import Phaser from 'phaser'
import BootScene from './scripts/scene/BootScene'
import PreloadScene from './scripts/scene/PreloadScene'
import GameScene from './scripts/scene/GameScene'
import StartScene from './scripts/scene/StartScene'

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { x: 0, y: 0 }
    }
  }
}

const game = new Phaser.Game(config)
