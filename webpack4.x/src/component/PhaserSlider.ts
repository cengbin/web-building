import Container = Phaser.GameObjects.Container
import Rectangle = Phaser.Geom.Rectangle

export default class PhaserSlider extends Container {

  public onUpdate: () => void
  public bg
  public bar

  private _config
  private _value = 0
  // 滚动组件总高度
  private _height
  // 拖动条高度
  private _barHeight
  private _barWidth = 12
  // 可滚动的高度
  private _scrollHeight

  private _p: number = 1

  constructor(scene, config, x = 0, y = 0) {
    super(scene, x, y)

    let {p, height} = this._config = config

    this.height = height
    this.p = p

    this.bg = this.addRect({c: 0xC96EF2, w: 2, h: height, x: -(2 / 2)})
    this.bar = this.addRect({c: 0xcccccc, r: this._barWidth / 2, w: this._barWidth, h: this._barHeight, x: -this._barWidth / 2})

    this.bar.setInteractive({
      hitArea: new Rectangle(0, 0, this._barWidth, this._barHeight),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      draggable: true
    })
    // this.bar.on("dragstart", this._onDragStart, this)
    // this.bar.on("dragend", this._onDragEnd, this)
    this.bar.on("drag", (pointer, dragX, dragY) => {
      this.value = dragY / this._scrollHeight
      if (this.onUpdate) this.onUpdate()
    }, this)
  }

  public resetUI() {
    if (this.bar) {
      this.bar.clear()
      this.bar.fillStyle(0xcccccc, 1.0)
      this.bar.fillRoundedRect(0, 0, this._barWidth, this._barHeight, this._barWidth / 2)
      this.bar.input.hitArea.setSize(this._barWidth, this._barHeight)
    }

    if (this.bg) {
      this.bg.clear()
      this.bg.fillStyle(0xC96EF2, 1.0)
      this.bg.fillRect(0, 0, 2, this._height, -(2 / 2))
    }
  }

  private addRect(config, index = this.list.length) {
    let {c: color = 0xffffff, a: alpha = 1, r: rounded, w, h, x = 0, y = 0} = config
    let graphics = this.scene.add.graphics().fillStyle(color, alpha).setPosition(x, y)
    if (rounded) {
      graphics.fillRoundedRect(0, 0, w, h, rounded)
    } else {
      graphics.fillRect(0, 0, w, h)
    }
    this.addAt(graphics, index)
    return graphics
  }

  private _setBarPosition() {
    this.bar.y = this._value * this._scrollHeight
  }

  public set value(val) {
    val = val < 0 ? 0 : val > 1 ? 1 : val
    this._value = val

    this._setBarPosition()
  }

  public get value() {
    return this._value
  }

  public set p(val) {
    this._p = val
    this._barHeight = val * this._height
    this._scrollHeight = this._height - this._barHeight

    this.resetUI()
  }

  public get p() {
    return this._p
  }

  public set height(val) {
    this._height = val
  }

  public get height() {
    return this._height
  }
}
