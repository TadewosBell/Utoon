import * as ex from "excalibur";
import { Images } from "../../../resources.js";
import {
  ANCHOR_CENTER,
  SCALE_2x,
  TAG_HERO_BULLET,
} from "../../../constants.js";
import { DrawShapeHelper } from "../../../classes/DrawShapeHelper.js";
import { PipiEgg } from "./PipiEgg.js";
import { pipiSpriteSheet } from "./sprites.js";

const flyingAnim = ex.Animation.fromSpriteSheet(
  pipiSpriteSheet,
  [0, 1, 2],
  200
);

export class Pipi extends ex.Actor {
  constructor(x, y) {
    super({
      x: x,
      y: y,
      width: 32,
      height: 32,
      collider: ex.Shape.Box(
        16,
        14,
        ANCHOR_CENTER,
        new ex.Vector(-2, 2) //pixels
      ),
      scale: SCALE_2x,
      color: ex.Color.Green,
    });
    this.graphics.use(flyingAnim);
    this.egg = null;

    this.on("collisionstart", (ev) => {
      if (ev.other.hasTag(TAG_HERO_BULLET)) {
        ev.other.kill();
      }
    });
  }

  onInitialize(engine) {
    new DrawShapeHelper(this);
    const egg = new PipiEgg(this);
    this.egg = egg;
    engine.add(egg);

    void this.scheduleDropEgg();
  }

  async scheduleDropEgg() {
    await this.actions.delay(1000).toPromise();
    this.egg.release();
  }

  onPreUpdate(_engine, _delta) {
    this.vel.x = -100;
  }
}
