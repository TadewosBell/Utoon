import * as ex from "excalibur";
import {
  ANCHOR_TOP_LEFT,
  CUSTOM_EVENT_CAMERA_Y_CHANGE,
  DOWN,
  SCALE_2x,
  TAG_HERO,
  UP,
} from "../constants.js";

export class RoomChange extends ex.Actor {
  constructor(x, y, w = 1, h = 1, config = {}) {
    super({
      pos: new ex.Vector(x, y),
      width: 16 * w,
      height: 16 * h,
      color: ex.Color.fromHex("#9c00ff"),
      scale: SCALE_2x,
      anchor: ANCHOR_TOP_LEFT,
    });
    this.graphics.opacity = 0;

    this.upYDest = config.upYDest;
    this.downYDest = config.downYDest;
    this.room = config.room;

    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
  }

  onCollisionStart(evt) {
    const engine = this.scene.engine;
    if (evt.other.hasTag(TAG_HERO)) {
      // Handle going DOWNWARDS
      if (evt.other.pos.y <= this.pos.y) {
        engine.emit(CUSTOM_EVENT_CAMERA_Y_CHANGE, {
          yPos: this.downYDest,
          direction: DOWN,
          room: this.room,
        });
      }

      // Handle going UPWARDS
      if (evt.other.pos.y > this.pos.y) {
        // Fire Event to change the pinned Y position of camera
        engine.emit(CUSTOM_EVENT_CAMERA_Y_CHANGE, {
          yPos: this.upYDest,
          direction: UP,
          room: this.room,
        });
      }
    }
  }
}
