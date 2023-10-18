import * as ex from "excalibur";
import { LEFT } from "../../../constants.js";

export class NewShotmanLaunchBullet extends ex.Actor {
  constructor(x, y, hero) {
    super({
      pos: new ex.Vector(x, y),
      width: 8,
      height: 8,
      scale: new ex.Vector(2, 2),
      color: ex.Color.Yellow,

      collider: ex.Shape.Box(8, 8, ex.Vector.Zero),
      collisionType: ex.CollisionType.Active,
    });

    const horizontalDistanceToHero = hero.pos.x - this.pos.x;
    this.vel.x = horizontalDistanceToHero;
    this.vel.y = -300;
    this.timeAlive = 0;

    this.damagesHeroWithNumber = 8;
    this.diesOnCollideWithHero = true;
  }

  onPreUpdate(engine, delta) {
    this.timeAlive += delta;
    if (this.timeAlive > 2000) {
      this.kill();
    }

    if (this.isOffScreen) {
      this.kill();
    }
  }
}
