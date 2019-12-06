import Container = Phaser.GameObjects.Container
import Rectangle =  Phaser.Geom.Rectangle
import PhaserPointerEvent from "./PhaserPointerEvent";

export default class PhaserCarousel extends Container {
  public static CAROUSEL_START: string = "carousel_start"
  public static CAROUSEL_COMPLETE: string = "carousel_complete"
  public static CLICK_PREV: string = "click_prev"
  public static CLICK_NEXT: string = "click_next"

  public dragHotspots
  public contentView

  private _option: any = null
  private _index: number = 0
  private _content: any[]
  private _sliding: boolean = false
  // 遮罩宽高
  private _maskWidth: number
  private _maskHeight: number
  // 滚动一屏宽度
  private _width: number

  constructor(scene, option, x = 0, y = 0) {
    super(scene, x, y)

    let {debug, index = 0, maskWidth, maskHeight, width, prevBtn, nextBtn, content} = this._option = option

    this._maskWidth = maskWidth
    this._maskHeight = maskHeight
    this._width = width || maskWidth
    this._index = index

    this.dragHotspots = this.scene.add.container(0, 0).setInteractive({
      hitArea: new Rectangle(0, 0, this._maskWidth, this._maskHeight),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains
    })
    this.add(this.dragHotspots)
    new PhaserPointerEvent(this.dragHotspots, {
      swipe: (direction) => {
        if (direction === 'Left') this.onNext()
        else if (direction === 'Right') this.onPrev()
      }
    })
    this.contentView = this.scene.add.container(0, 0)
    this.add(this.contentView)

    this.setContent(content)
    if (prevBtn) {
      this.add(prevBtn)
      prevBtn.on("pointerup", this.onPrev, this)
    }
    if (nextBtn) {
      this.add(nextBtn)
      nextBtn.on("pointerup", this.onNext, this)
    }

    if (debug) this._dev()
  }

  private _dev() {
    let bounds3 = new Rectangle(0, 0, this._option.maskWidth, this._option.maskHeight)
    let graphics = this.scene.add.graphics()
    graphics.lineStyle(1, 0x00ff00)
    graphics.strokeRectShape(bounds3)
    this.add(graphics)
  }

  public setContentMask() {
    // console.log(this.localTransform.tx)
    // console.log(this.localTransform.ty)
    // console.log(this.getLocalTransformMatrix().tx)
    // console.log(this.getLocalTransformMatrix().ty)

    let {maskWidth, maskHeight} = this._option
    let matrix = this.getWorldTransformMatrix()
    let {tx, ty} = matrix
    // console.log(tx, ty)
    var mask = this.scene.make.graphics({}).fillRect(tx, ty, maskWidth, maskHeight)
    this.contentView.setMask(mask.createGeometryMask())
  }

  public onNext() {
    this.emit(PhaserCarousel.CLICK_NEXT, this._index)
    if (this._sliding || this._index >= this._content.length - 1) return
    return this.slide(++this.index)
  }

  public onPrev() {
    this.emit(PhaserCarousel.CLICK_PREV, this._index)
    if (this._sliding || this._index <= 0) return
    return this.slide(--this.index)
  }

  public slide(index) {
    this._sliding = true
    this.emit(PhaserCarousel.CAROUSEL_START, this._index)

    window["TweenMax"].to(this.contentView, 0.5, {
      x: -(index * this._width),
      onComplete: () => {
        this._sliding = false
        this.emit(PhaserCarousel.CAROUSEL_COMPLETE, this.index)
      }
    })
  }

  public setContent(content): void {
    if (this._content === content) return

    if (content) {
      this.contentView.removeAll()

      this._content = content
      this.contentView.add(content)
      this.contentView.x = -(this._index * this._width)
    }
  }

  set index(val) {
    if (this._option.prevBtn) {
      if (val <= 0) {
        this._option.prevBtn.alpha = 0.3
      } else if (this._option.prevBtn.alpha === 0.3) {
        this._option.prevBtn.alpha = 1
      }
    }

    if (this._option.nextBtn) {
      if (val >= this._content.length - 1) {
        this._option.nextBtn.alpha = 0.3
      } else if (this._option.nextBtn.alpha === 0.3) {
        this._option.nextBtn.alpha = 1
      }
    }

    this._index = val
  }

  get index() {
    return this._index
  }
}
