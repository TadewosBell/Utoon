import * as ex from "excalibur";
import { LEFT, SCALE_2x, TAG_HERO_BULLET } from "../../constants.js";
import { Images } from "../../resources.js";

const MM_BULLET_VELOCITY = 300;

const lemonSprite = Images.heroBulletImage.toSprite();

export class HeroBullet extends ex.Actor {
  constructor(x, y, direction) {
    super({
      pos: new ex.Vector(x, y),
      width: 8,
      height: 4,
      scale: SCALE_2x,
      color: ex.Color.DarkGray,
      collider: ex.Shape.Box(8, 4, ex.Vector.Zero),
      collisionType: ex.CollisionType.Passive,
    });

    this.graphics.use(lemonSprite);
    this.direction = direction;
    this.isDeflected = false;
  }

  onInitialize(_engine) {
    this.addTag(TAG_HERO_BULLET);
  }

  deflect() {
    this.isDeflected = true;
  }

  onPreUpdate(engine, delta) {
    this.isDeflected ? this.preUpdateDeflected() : this.preUpdateNormal();
    if (this.isOffScreen) {
      this.kill();
    }
  }

  preUpdateNormal() {
    this.vel.x =
      this.direction === LEFT ? -MM_BULLET_VELOCITY : MM_BULLET_VELOCITY;
  }

  preUpdateDeflected() {
    this.vel.x =
      this.direction === LEFT ? MM_BULLET_VELOCITY : -MM_BULLET_VELOCITY;
    this.vel.y = -MM_BULLET_VELOCITY;
  }
}
