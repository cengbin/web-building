import Container = Phaser.GameObjects.Container
import Rectangle = Phaser.Geom.Rectangle
import PhaserSlider from "./PhaserSlider"

export enum ScrollPolicy {
  ON = "on",
  OFF = "off",
  AUTO = "auto"
}

export default class PhaserScrollView extends Container {

  public hSlider: PhaserSlider
  public vSlider: PhaserSlider
  // Phaser3容器中对象触发点击事件有bug，所以增加拖动热区和内容层在同一级，放在内容层之下
  public dragHotspots
  public contentWrapper: Container
  // 横向允许拖动
  public horizontalScrollPolicy: string = ScrollPolicy.ON
  // 纵向允许拖动
  public verticalScrollPolicy: string = ScrollPolicy.ON

  private _startTime: any = 0
  private _start = {x: 0, y: 0, x1: 0, y1: 0}
  private _deceleration = 0.001 // 0.004 0.0006
  private _scrollLeft: number
  private _scrollTop: number
  // 遮罩宽高
  private _maskWidth: any
  private _maskHeight: any
  // 内容宽高
  private _contentWidth: any
  private _contentHeight: any
  private _option: { horizontalScrollPolicy: string, verticalScrollPolicy: string, [propName: string]: any } = null

  private _content: any

  constructor(scene, option, x = 0, y = 0) {
    super(scene, x, y)
    let {content, maskWidth, maskHeight, contentWidth, contentHeight, horizontalScrollPolicy, verticalScrollPolicy} = this._option = option
    this._maskWidth = maskWidth
    this._maskHeight = maskHeight
    this._contentWidth = contentWidth
    this._contentHeight = contentHeight
    this.horizontalScrollPolicy = horizontalScrollPolicy
    this.verticalScrollPolicy = verticalScrollPolicy

    this.dragHotspots = this.scene.add.container(0, 0)
    this.add(this.dragHotspots)

    this.contentWrapper = this.scene.add.container(0, 0)
    this.add(this.contentWrapper)

    if (horizontalScrollPolicy) {
      let vSlider = new PhaserSlider(scene, {
        p: Math.abs(this._maskHeight / this._contentHeight),
        height: maskHeight
      }, maskWidth + 10)
      this.add(vSlider)
      this.vSlider = vSlider
      vSlider.onUpdate = () => {
        this._setContentPosition(this._content.x, vSlider.value * this.maxScrollTop)
      }
      // hSlider.rotation = Math.PI / 180 * -90
    }

    this.addEvents()
    this.setContent(content)

    if (option.debug) {
      let graphics = scene.add.graphics()
      graphics.lineStyle(1, 0x00ff00, 1)
      graphics.strokeRect(0, 0, maskWidth, maskHeight)
      this.add(graphics)
    }
  }

  public setContentMask() {
    // console.log(this.localTransform.tx)
    // console.log(this.localTransform.ty)
    // console.log(this.getLocalTransformMatrix().tx)
    // console.log(this.getLocalTransformMatrix().ty)
    let matrix = this.getWorldTransformMatrix()
    let {tx, ty} = matrix
    // console.log(tx, ty)
    var mask = this.scene.make.graphics({}).fillRect(tx, ty, this._maskWidth, this._maskHeight)
    this.contentWrapper.setMask(mask.createGeometryMask())

  }

  public setContent(content): void {
    if (this._content === content) return

    if (content) {
      this.contentWrapper.removeAll()

      if (this._content && this._content.parentContainer) this._content.parentContainer.remove(this._content)
      this._content = content
      this.contentWrapper.add(this._content)

      // console.log(content,content.height,content.getBounds())
      this.contentHeight = content.height
    }
  }

  public addEvents(): void {
    this.dragHotspots.setInteractive({
      hitArea: new Rectangle(0, 0, this._maskWidth, this._maskHeight),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      draggable: true
    })
    this.dragHotspots.on("pointerdown", this._onPointerDown, this)
    this.dragHotspots.on("dragstart", this._onDragStart, this)
    this.dragHotspots.on("dragend", this._onDragEnd, this)
    this.dragHotspots.on("drag", this._onDrag, this)
  }

  private _onPointerDown() {
    // console.log('pointerdown:', pointer, dragX, dragY)
    // this.scene.stMap.mapData.screen2map(dragX, dragY)
  }

  /**
   * @param dragX 鼠标拖动点相对于拖动对象(0,0)点的X坐标
   * @param dragY 鼠标拖动点相对于拖动对象(0,0)点的Y坐标
   * */
  private _onDragStart(pointer: any, dragX: any, dragY: any): void {
    // console.log("onDragStart:", dragX, dragY)
    let tm: any = window["TweenMax"]
    let tw: any = tm.getTweensOf(this._content)
    if (tw.length > 0) {
      tw[0].kill()
    }
    this._startTime = new Date().getTime()
    this._start.x = this._start.x1 = this._content.x
    this._start.y = this._start.y1 = this._content.y
  }

  private _onDragEnd(): void {
    let duration = new Date().getTime() - this._startTime
    let momentumX = momentum(this._content.x, this._start.x1, duration, this.maxScrollLeft, 0, this._deceleration)
    let momentumY = momentum(this._content.y, this._start.y1, duration, this.maxScrollTop, 0, this._deceleration)
    let newX = momentumX.destination
    let newY = momentumY.destination
    let time = Math.max(momentumX.duration, momentumY.duration)
    // console.log('start xy:', this._startX, this._startY)
    // console.log('cur xy:', this.parentContainer.x, this.parentContainer.y)
    // console.log('end xy:', newX, newY)
    // console.log('time:', momentumX.duration, momentumY.duration, time)
    // console.log("newX:%d newY:%d", newX, newY)

    let vars: object = {
      onUpdate: () => this._updateScroll(),
      ease: window["Power2"].easeOut
    }
    if (this.horizontalScrollPolicy === ScrollPolicy.ON) vars["x"] = newX
    if (this.verticalScrollPolicy === ScrollPolicy.ON) vars["y"] = newY
    window["TweenMax"].to(this._content, time / 1000, vars)

    this._start.x = this._start.y = 0
    this._start.x1 = this._start.y1 = 0
  }

  /**
   * @param dragX 指针当前拖动游戏对象的x坐标
   * @param dragY 指针当前拖动游戏对象的y坐标
   * */
  private _onDrag(pointer, dragX, dragY): void {
    // 开始x坐标 + 拖动点x轴偏移量
    let x = this._start.x + (dragX)
    let y = this._start.y + (dragY)
    this._setContentPosition(x, y)
    this._updateScroll()

    let timestamp = new Date().getTime()
    if (timestamp - this._startTime > 300) {
      this._startTime = timestamp
      this._start.x1 = this._content.x
      this._start.y1 = this._content.y
    }
  }

  public _setContentPosition(x, y) {
    x = x >= 0 ? 0 : x <= this.maxScrollLeft ? this.maxScrollLeft : x
    y = y >= 0 ? 0 : y <= this.maxScrollTop ? this.maxScrollTop : y
    // console.log("_onDrag:", x, y, dragX, dragY)
    if (this.horizontalScrollPolicy === ScrollPolicy.ON) this._content.x = x
    if (this.verticalScrollPolicy === ScrollPolicy.ON) this._content.y = y
  }

  private _updateScroll() {
    this._scrollLeft = Math.abs(this._content.x / this.maxScrollLeft)
    this._scrollTop = Math.abs(this._content.y / this.maxScrollTop)
    // console.log(this.scrollLeft, this.scrollTop)
    if (this.vSlider) this.vSlider.value = this._scrollTop
  }

  public setScrollLeft(scrollLeft: number) {
    this.scrollLeft = scrollLeft
    this._content.x = scrollLeft * this.maxScrollLeft
  }

  public setScrollTop(scrollTop: number) {
    this.scrollTop = scrollTop
    this._content.y = scrollTop * this.maxScrollTop
    if (this.vSlider) this.vSlider.value = scrollTop
  }

  public set scrollLeft(val) {
    this._scrollLeft = val
  }

  public get scrollLeft() {
    return this._scrollLeft
  }

  public set scrollTop(val) {
    this._scrollTop = val
  }

  public get scrollTop() {
    return this._scrollTop
  }

  // 最大滚动距离 横向
  public get maxScrollLeft() {
    return this._maskWidth - this._contentWidth
  }

  // 最大滚动距离 横向
  public get maxScrollTop() {
    return this._maskHeight - this._contentHeight
  }

  public get contentHeight() {
    return this._contentHeight
  }

  public set contentHeight(val) {
    this._contentHeight = val

    if (this._option.verticalScrollPolicy === ScrollPolicy.ON && this._contentHeight <= this._maskHeight) {
      this.verticalScrollPolicy = ScrollPolicy.OFF
      this.vSlider.visible = false
    } else {
      this.verticalScrollPolicy = this._option.verticalScrollPolicy
      this.vSlider.visible = true
      this.vSlider.p = Math.abs(this._maskHeight / this._contentHeight)
    }
  }
}

/**
 * @param current 当前坐标
 * @param start 起点坐标
 * @param time 起点坐标到当前坐标所用毫秒数
 * @param lowerMargin 最大滚动距离
 * */
function momentum(current: any, start: any, time: any, lowerMargin: any, wrapperSize: any, _deceleration: any) {
  // console.log(current, start, time, lowerMargin, wrapperSize, _deceleration)
  var distance = current - start // 距离
  var speed = Math.abs(distance) / time // 速度 = (距离/时间)
  var destination// 终点
  var duration// 持续时间

  _deceleration = _deceleration === undefined ? 0.0006 : _deceleration

  destination = current + (speed * speed) / (2 * _deceleration) * (distance < 0 ? -1 : 1)
  duration = speed / _deceleration

  if (destination < lowerMargin) {
    destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin
    distance = Math.abs(destination - current)
    duration = distance / speed
  } else if (destination > 0) {
    destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0
    distance = Math.abs(current) + destination
    duration = distance / speed
  }

  return {
    destination: Math.round(destination),
    duration
  }
}