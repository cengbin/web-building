import MainScene from "./MainScene";

export class Game extends Phaser.Game {

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config)
  }

  protected start() {
    super.start()
    this.scene.add(MainScene.NAME, MainScene, true)
  }
}
export default Game

