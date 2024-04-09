import * as ex from "excalibur";
import { Images } from "../resources";

const spriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.explosionSpriteSheet,
  grid: {
    columns: 6,
    rows: 1,
    spriteWidth: 32,
    spriteHeight: 32,
  },
});

const explodeAnim = ex.Animation.fromSpriteSheet(
  spriteSheet,
  ex.range(0, 5),
  30
);

export class EnemyDieExplosion extends ex.Actor {
  constructor(x, y) {
    super({
      pos: new ex.Vector(x, y),
      width: 32,
      height: 32,
    });

    this.graphics.add("explode", explodeAnim);
    this.graphics.getGraphic("explode").events.on("loop", () => {
      this.kill();
    });
    this.graphics.use(explodeAnim);
  }
}
