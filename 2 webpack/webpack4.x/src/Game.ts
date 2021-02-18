// import {Application, Graphics} from 'pixi.js';
const PIXI = require('pixi.js');

export default class Game extends PIXI.Application {

  constructor(config) {
    super(config)
  }

  start() {
    super.start()

    var react = new PIXI.Graphics()
    react.beginFill(0xff0000)
    react.drawRect(0, 0, 100, 100)
    react.endFill()
    this.stage.addChild(react)
  }
}