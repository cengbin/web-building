import PhaserCarousel from "./component/PhaserCarousel";

export default class StartScene extends Phaser.Scene {
  public static NAME = "start_scene"

  constructor() {
    super({key: StartScene.NAME})
  }

  public init() {
  }

  public preload() {
    this.load.image('tmw_desert_spacing.png', './static/assets/tmw_desert_spacing.png')
    this.load.image('bunny.png', './static/assets/bunny.png')
    this.load.image('eggHead.png', './static/assets/eggHead.png')
    this.load.image('map.png', './static/assets/concept1_img1.png')
    this.load.image('jiqirenl3_1.png', './static/assets/jiqirenl3_1.png')
  }

  public create() {
    let content = []
    for (var i = 0; i < 3; i++) {
      let storyImg1 = this.add.graphics().fillStyle(Math.random() * 0xffff00, 1).fillRect(0, 0, 200, 200).setPosition(i * 200, 0)
      content.push(storyImg1)
    }

    let prevBtn = this.add.image(-50, 100, "bunny.png").setScale(-1, 1).setInteractive({
      cursor: "pointer",
      useHandCursor: true
    })
    let nextBtn = this.add.image(250, 100, "bunny.png").setInteractive({
      cursor: "pointer",
      useHandCursor: true
    })

    let carouseView = new PhaserCarousel(this, {
      debug: true,
      index: 1,
      maskWidth: 200,
      maskHeight: 200,
      prevBtn,
      nextBtn,
      content,
    }, 100, 100)
    this.add.existing(carouseView)
    carouseView.setContentMask()
  }
}