export default class RhombusNode extends Phaser.GameObjects.Container {
  constructor (scene, row, col, w, h) {
    super(scene, 0, 0)

    this.y = row * h / 2
    this.x = col * w + (row % 2 !== 0 ? w / 2 : 0)

    var graphics = scene.add.graphics()
    graphics.fillStyle(0xff0000, 1)
    graphics.lineStyle(1, 0x00ff00, 1)
    graphics.beginPath()
    graphics.moveTo(0, h / 2)
    graphics.lineTo(w / 2, 0)
    graphics.lineTo(w, h / 2)
    graphics.lineTo(w / 2, h)
    graphics.closePath()
    graphics.fillPath()
    graphics.strokePath()
    graphics.setPosition(-w / 2, -h / 2)
    this.add(graphics)

    let txt = scene.add.text(0, 0, (row + 1) + ',' + (col + 1), {
      fontSize: 10
    })
    this.add(txt)
    txt.setPosition(-txt.width / 2, -txt.height / 2)
  }
}
