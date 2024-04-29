import { Player } from "./Player";
import { getBaseY, getSafeArea, pxScale } from "./util";

export class PlayerSpawner extends ex.Actor {
  scene;

  constructor() {
    super({});
  }

  onInitialize() {
    this.respawn();
  }

  respawn() {
    const player = new Player();
    this.scene.player = player;
    player.on("died", () => {
      this.emit("died", undefined);
    });
    player.on("start", () => {
      this.emit("start", undefined);
    });
    if (!this.scene.contains(player)) {
      this.scene.engine.add(player);
      player.pos.x = getSafeArea().left - pxScale(1);
      player.pos.y = getBaseY() - pxScale(7);
      player.graphics.opacity = 0;
      player.actions.fade(1, 150);
    }
  }
}