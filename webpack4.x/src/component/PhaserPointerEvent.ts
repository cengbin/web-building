export default class PhaserPointerEvent {

  public el
  public pointerDown
  public pointerMove
  public pointerUp

  public dragStart
  public dragEnd
  public drag

  public swipe

  private _startWorldX: number
  private _startWorldY: number

  constructor(el, option) {
    this.el = el
    this.swipe = option.swipe || null
    if (el) this.addEvents()
  }

  public addEvents(): void {
    // this.el.setInteractive({
    //   hitArea: new Rectangle(0, 0, this._maskWidth, this._maskHeight),
    //   hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    //   draggable: true
    // })
    this.el.on("pointerdown", this._onPointerDown, this)
    this.el.on("pointermove", this._onPointerMove, this)
    this.el.on("pointerup", this._onPointerUp, this)
    // this.el.on("dragstart", this._onDragStart, this)
    // this.el.on("drag", this._onDrag, this)
    // this.el.on("dragend", this._onDragEnd, this)
  }

  /**
   * 游戏对象指针按下事件
   * @param pointer 负责触发此事件的指针
   * @param localX 指针与该对象交互的x坐标，相对于游戏对象的左上角位置。
   * @param localY 指针与该对象交互的y坐标，相对于游戏对象的左上角位置。
   * @param event 相量输入事件。您可以调用stopPropagation()来阻止它在事件流中继续前进。
   * */
  private _onPointerDown(pointer, localX, localY, event) {
    // console.log('_onPointerDown:', pointer, localX, localY, event)
    this._startWorldX = pointer.worldX
    this._startWorldY = pointer.worldY
  }

  // 游戏对象指针移动事件
  private _onPointerMove(pointer, localX, localY, event) {
    // console.log('_onPointerMove:', pointer, localX, localY, event)
  }

  // 游戏对象指针抬起事件
  private _onPointerUp(pointer, localX, localY, event) {
    // console.log('_onPointerUp:', pointer, localX, localY, event)
    if ((this._startWorldX && Math.abs(this._startWorldX - pointer.worldX) > 30) ||
      (this._startWorldY && Math.abs(this._startWorldY - pointer.worldY) > 30)) {
      if (this.swipe) {
        let direction = this._swipeDirection(this._startWorldX, pointer.worldX, this._startWorldY, pointer.worldY)
        this.swipe(direction)
      }
    }

    this._startWorldX = this._startWorldY = null
  }

  private _swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  /**
   * 拖动对象开始事件
   * @param dragX 指针相对于对象中心点的X轴偏移量
   * @param dragY 指针相对于对象中心点的Y轴偏移量
   * */
  private _onDragStart(pointer, dragX, dragY): void {
    console.log("onDragStart:", pointer, dragX, dragY)
  }

  /**
   * 拖动对象事件
   * @param dragX 相对于舞台，指针当前拖动游戏对象的x坐标。
   * @param dragY 相对于舞台，指针当前拖动游戏对象的y坐标。
   * */
  private _onDrag(pointer, dragX, dragY): void {
    console.log("onDrag:", dragX, dragY)
  }

  /**
   * 拖动对象结束事件.(参数同拖动对象开始事件)
   * */
  private _onDragEnd(pointer, dragX, dragY): void {
    console.log("onDragEnd:", pointer, dragX, dragY)
  }
}