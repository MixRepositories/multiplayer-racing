import { OBJECTS, TILE_MAP, TILE_SET } from '../../assets/constants/sprites'
import { Geom } from 'phaser'
const GRASS_FRICTION = 0.3
const ROADS_FRICTION = {
  road: 1,
  ground: 0.5,
  sand: 0.4
}

class Map {
  constructor (scene) {
    this.scene = scene
    this.init()
    this.create()
  }

  init () {
    this.tileMap = this.scene.make.tilemap({ key: TILE_MAP })
    this.tileSet = this.tileMap.addTilesetImage('tileset', TILE_SET, 64, 64, 0, 1)
  }

  create () {
    this.createLayers()
    this.createCollision()
    this.createCheckpoints()
    this.createOil()
  }

  createLayers () {
    this.tileMap.createStaticLayer('grass', this.tileSet)
    this.tileMap.createStaticLayer('road', this.tileSet)
    this.tileMap.createStaticLayer('sand', this.tileSet)
    this.tileMap.createStaticLayer('ground', this.tileSet)
  }

  createCollision () {
    this.tileMap.findObject('collisions', collision => {
      const x = collision.x + collision.width / 2
      const y = collision.y - collision.height / 2
      const sprite = this.scene.matter.add.sprite(x, y, OBJECTS, collision.name)
      sprite.setStatic(true)
    })
  }

  createOil () {
    this.tileMap.findObject('oils', oil => {
      const x = oil.x + oil.width / 2
      const y = oil.y - oil.height / 2
      const sprite = this.scene.matter.add.sprite(x, y, OBJECTS, oil.name)
      sprite.setStatic(true)
      sprite.setSensor(true)
    })
  }

  createCheckpoints () {
    this.checkpoints = []
    this.tileMap.findObject('checkpoints', checkpoint => {
      const { x, y, width, height, properties } = checkpoint
      const rectangle = new Geom.Rectangle(x, y, width, height)
      rectangle.index = properties.find(property => property.name === 'value').value
      this.checkpoints.push(rectangle)
    })
  }

  // createOil

  getPlayerPosition () {
    return this.tileMap.findObject('player', player => {
      return player.name === 'player'
    })
  }

  getTileFriction (car) {
    for (const road in ROADS_FRICTION) {
      const tile = this.tileMap.getTileAtWorldXY(car.x, car.y, false, this.scene.cameras.main, road)
      if (tile) {
        return ROADS_FRICTION[road]
      }
    }

    return GRASS_FRICTION
  }

  getCheckpoint (car) {
    const checkpoint = this.checkpoints.find(checkpoint => checkpoint.contains(car.x, car.y))
    return checkpoint ? parseInt(checkpoint.index) : false
  }
}

export default Map
