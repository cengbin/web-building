import StaggeredTiledMap from "./StaggeredTiledMap";
// import res from "./res.json"
// console.log(res)
// const json = require('./res.json');
// console.log(json)

// import data from "./tsconfig.json"
//
// console.log(data)

export default class MainScene extends Phaser.Scene {
  public static NAME = "game_scene"

  constructor() {
    super({key: MainScene.NAME})
  }

  public init() {
  }

  public preload() {
    this.load.image('tmw_desert_spacing', './static/assets/tmw_desert_spacing.png')
    this.load.image('bunny', './static/assets/bunny.png')
    this.load.image('eye', './static/assets/flowerTop2.png')
    this.load.image('map', './static/assets/concept1_img1.png')
    this.load.image('jqr', './static/assets/jiqirenl3_1.png')
  }

  public create() {
    let stage1 = this.add.container(0, 0)
    stage1.name = 'stage1'

    let stMap = new StaggeredTiledMap(this)
    stage1.add(stMap)

    stage1.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(0, 0, stMap.mapWidth, stMap.mapHeight),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      draggable: true
    })

    // let bgmap = this.add.tileSprite(0, 0, 2000, 2000, 'tmw_desert_spacing').setOrigin(0, 0)
    // bgmap.name = 'bgmap'
    // stage1.add(bgmap)

    for (var i = 0; i < 14; i++) {
      var sprite = this.add.sprite(100 + i * 30, 100 + i * 30, 'jqr').setInteractive({
        pixelPerfect: true,
        draggable: true
      })
      stage1.add(sprite)
      // sprite.on('drag', function (pointer, dragX, dragY) {
      //
      //   this.x = dragX;
      //   this.y = dragY;
      //
      // });
      /* sprite.on('pointerdown', function (pointer) {

            console.log('down');
            this.setTint(0xcccccc);

          });

          sprite.on('pointerup', function (pointer) {

            console.log('up');
            this.clearTint();

          });

          sprite.on('pointerover', function (pointer) {

            console.log('over');

          });

          sprite.on('pointerout', function (pointer) {

            console.log('out');
            this.clearTint();

          }); */
    }
    // console.log(this)
    /*let deceleration = 0.001 // 0.004 0.0006
    this.wrapperWidth = this.game.config.width
    this.wrapperHeight = this.game.config.height
    this.scrollerWidth = stMap.mapWidth
    this.scrollerHeight = stMap.mapHeight
    console.log(stMap.mapWidth, stMap.mapHeight)
    this.maxScrollX = this.wrapperWidth - this.scrollerWidth
    this.maxScrollY = this.wrapperHeight - this.scrollerHeight
    this.startTime = null
    this.startX = 0
    this.startY = 0
    this.absDistance = {x: 0, y: 0}
    this.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {
        // let tw = TweenMax.getTweensOf(gameObject)
        // if (tw.length > 0) {
        //   tw[0].kill()
        // }
        this.startTime = new Date().getTime()
        this.startX = gameObject.x
        this.startY = gameObject.y
        console.log('dragestart xy:', this.startX, this.startY)
        // console.log('dragstart:', pointer, gameObject, dragX, dragY)
    }, this)
    this.input.on('dragend', function (pointer, gameObject, dragX, dragY) {
        let duration = new Date().getTime() - this.startTime
        let momentumX = momentum(gameObject.x, this.startX, duration, this.maxScrollX, 0, deceleration)
        let momentumY = momentum(gameObject.y, this.startY, duration, this.maxScrollY, 0, deceleration)
        let newX = momentumX.destination
        let newY = momentumY.destination
        let time = Math.max(momentumX.duration, momentumY.duration)
        console.log('start xy:', this.startX, this.startY)
        console.log('cur xy:', gameObject.x, gameObject.y)
        console.log('end xy:', newX, newY)
        console.log('time:', momentumX.duration, momentumY.duration, time)

        if (gameObject.name === 'stage1') {
            // TweenMax.to(gameObject, time / 1000, { x: newX, y: newY, ease: Power2.easeOut })
        }
    }, this)
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        if (gameObject.name === 'stage1') {
            dragX = dragX >= 0 ? 0 : dragX <= this.maxScrollX ? this.maxScrollX : dragX
            dragY = dragY >= 0 ? 0 : dragY <= this.maxScrollY ? this.maxScrollY : dragY

            this.absDistance.x = Math.abs(dragX - this.startX)
            this.absDistance.y = Math.abs(dragY - this.startY)

            let timestamp = new Date().getTime()
            if (timestamp - this.startTime > 300) {
                this.startTime = timestamp
                this.startX = dragX
                this.startY = dragY
            }
        }

        gameObject.x = dragX
        gameObject.y = dragY
    }, this)

    this.input.on('gameobjectdown', function (pointer, gameObject) {
        if (gameObject.name !== 'stage1') {
            gameObject.setTint(Math.random() * 16000000)
        }
    })

    this.input.on('gameobjectout', function (pointer, gameObject) {
        if (gameObject.name !== 'stage1') {
            gameObject.clearTint()
        }
    })

    this.input.on('gameobjectup', function (pointer, gameObject) {
        if (gameObject.name !== 'stage1') {
            gameObject.clearTint()
        }
    })

    this.input.on('pointerdown', function (pointer) {

        // console.log('scene pointerdown');

    })

    this.input.on('pointerup', function (pointer) {

        // console.log('scene pointerup');

    })*/
  }
}


var momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
  var distance = current - start // 距离
  var speed = Math.abs(distance) / time // 速度 = (距离/时间)
  var destination;
  var // 终点
    duration// 持续时间

  deceleration = deceleration === undefined ? 0.0006 : deceleration

  destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1)
  duration = speed / deceleration

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
    duration: duration
  }
}
