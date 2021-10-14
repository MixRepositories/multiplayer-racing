import { Scene } from 'phaser'
import { START, PRELOAD } from '../../assets/constants/scene'
import { BG, OBJECTS, TILE_MAP, TILE_SET } from '../../assets/constants/sprites'
import LoadingBar from '../classes/LoadingBar'
import tileSetPng from '../../assets/sprites/tileset.png'
import tileMapJson from '../../assets/sprites/tilemap.json'
import objectsPng from '../../assets/sprites/objects.png'
import objectsJson from '../../assets/sprites/objects.json'

class PreloadScene extends Scene {
  constructor () {
    super(PRELOAD)
  }

  preload () {
    this.add.sprite(0, 0, BG).setOrigin(0)
    this.LoadingBar = new LoadingBar(this)
    this.load.spritesheet(TILE_SET, tileSetPng, { frameWidth: 64, frameHeight: 64 })
    this.load.tilemapTiledJSON(TILE_MAP, tileMapJson)
    this.load.atlas(OBJECTS, objectsPng, objectsJson)
  }

  create () {
    this.scene.start(START)
  }
}

export default PreloadScene
