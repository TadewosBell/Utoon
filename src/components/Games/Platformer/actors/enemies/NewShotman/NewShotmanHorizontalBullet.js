import * as ex from "excalibur";
import { LEFT } from "../../../constants.js";
//import { enemyBulletsCollideWith } from "../../../collisions.js";

export class NewShotmanHorizontalBullet extends ex.Actor {
  constructor(x, y, direction) {
    super({
      pos: new ex.Vector(x, y),
      width: 8,
      height: 4,
      scale: new ex.Vector(2, 2),
      color: ex.Color.Yellow,

      collider: ex.Shape.Box(8, 4, ex.Vector.Zero),
      collisionType: ex.CollisionType.Passive,
    });

    this.direction = direction;

    this.damagesHeroWithNumber = 4;
    this.diesOnCollideWithHero = true;
  }

  onPreUpdate(engine, delta) {
    this.vel.x = this.direction === LEFT ? -250 : 250;

    if (this.isOffScreen) {
      this.kill();
    }
  }
}
