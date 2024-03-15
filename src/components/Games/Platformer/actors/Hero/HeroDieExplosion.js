import * as ex from "excalibur";
import { DOWN, LEFT, RIGHT, UP } from "../../constants.js";
import { Images } from "../../resources.js";

const spriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.mmExplosionSpriteSheet,
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
  200
);

export class HeroDieExplosion extends ex.Actor {
  constructor(x, y, direction) {
    super({
      pos: new ex.Vector(x, y),
      width: 32,
      height: 32,
    });
    this.direction = direction;
    this.graphics.use(explodeAnim);
  }

  onPreUpdate() {
    const SPEED = 100;
    if (this.direction.includes(UP)) {
      this.vel.y = -SPEED;
    }
    if (this.direction.includes(DOWN)) {
      this.vel.y = SPEED;
    }
    if (this.direction.includes(LEFT)) {
      this.vel.x = -SPEED;
    }
    if (this.direction.includes(RIGHT)) {
      this.vel.x = SPEED;
    }
  }
}
