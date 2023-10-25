import * as ex from "excalibur";
import { ANCHOR_CENTER, SCALE, TAG_HERO_BULLET } from "../../../constants.js";
import { DrawShapeHelper } from "../../../classes/DrawShapeHelper.js";
import { pipiSpriteSheet } from "./sprites.js";

const eggAnim = ex.Animation.fromSpriteSheet(pipiSpriteSheet, [3], 200);

export class PipiEgg extends ex.Actor {
  constructor(pipi) {
    super({
      width: 16,
      height: 16,
      collider: ex.Shape.Box(
        13,
        10,
        ANCHOR_CENTER,
        new ex.Vector(0, 1) //pixels
      ),
      scale: new ex.Vector(2, 2),
      color: ex.Color.Green,
    });
    this.graphics.use(eggAnim);
    this.pipi = pipi;
    this.isReleased = false;
  }

  onInitialize(_engine) {
    new DrawShapeHelper(this);

    this.on("collisionstart", (ev) => {
      if (ev.other.hasTag(TAG_HERO_BULLET)) {
        ev.other.kill();
      }
      if (ev.other.isFloor && this.isReleased) {
        this.kill();
      }
    });
  }

  release() {
    this.isReleased = true;
    this.body.collisionType = ex.CollisionType.Active;
    this.vel.y = -120; // Little midair hop after leaving Pipi
  }

  onPreUpdate(_engine, _delta) {
    if (this.isReleased) {
      return;
    }
    this.pos.x = this.pipi.pos.x;
    this.pos.y = this.pipi.pos.y + 11 * SCALE;
  }
}
