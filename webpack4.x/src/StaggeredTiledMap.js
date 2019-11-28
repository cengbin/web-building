import RhombusNode from './RhombusNode'

export default class StaggeredTiledMap extends Phaser.GameObjects.Container {
  constructor (scene) {
    super(scene)

    this.row = 50
    this.col = 20
    this.nodeWidth = 100
    this.nodeHeight = 50
    this.mapWidth = this.col * this.nodeWidth - (this.nodeWidth / 2)
    this.mapHeight = this.row * (this.nodeHeight / 2) - (this.nodeHeight / 2)
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        let rhombus = new RhombusNode(scene, i, j, this.nodeWidth, this.nodeHeight)
        this.add(rhombus)
      }
    }

    _test()
  }
}

export function _test () {
  let a = 1
  let b = 2
  if (a === b) {
    console.log('xx')
  }
}
