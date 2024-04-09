import * as ex from "excalibur";
import {
  ANCHOR_TOP_LEFT,
  TAG_LADDER,
  TAG_LADDER_DETECT_TOP,
} from "../constants.js";
import { Floor } from "./Floor.js";

class LadderDetectTop extends ex.Actor {
  constructor(x, y) {
    super({
      pos: new ex.Vector(x, y),
      width: 16,
      height: 2,
      scale: new ex.Vector(2, 2),
      //color: ex.Color.Green, // Turn on for debug
      anchor: ANCHOR_TOP_LEFT,
      collider: ex.Shape.Box(16, 2, ex.Vector.Zero),
      collisionType: ex.CollisionType.Passive,
    });
    this.addTag(TAG_LADDER_DETECT_TOP);
  }
}

export class Ladder extends ex.Actor {
  constructor(x, y, heightCells) {
    super({
      pos: new ex.Vector(x, y),
      width: 16,
      height: 16 * heightCells,
      scale: new ex.Vector(2, 2),
      color: ex.Color.Red,
      anchor: ANCHOR_TOP_LEFT,

      collider: ex.Shape.Box(16, 16 * heightCells, ex.Vector.Zero),
      collisionType: ex.CollisionType.Passive,
    });
    this.graphics.opacity = 0.0;

    if (heightCells < 2) {
      console.warn(
        "INVALID LENGTH FOR LADDER. MUST BE 2 OR MORE.",
        heightCells
      );
    }
    this.addTag(TAG_LADDER);
  }

  onInitialize(engine) {
    const topDetect = new LadderDetectTop(this.pos.x, this.pos.y - 16);
    engine.add(topDetect);

    const topFloor = new Floor(this.pos.x, this.pos.y, 1, 1);
    engine.add(topFloor);
  }
}
