// import MainScene from "./MainScene";
import StartScene from "./StartScene";

export class Game extends Phaser.Game {

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config)
  }

  protected start() {
    super.start()
    this.scene.add(StartScene.NAME, StartScene, true)
  }
}
export default Game

