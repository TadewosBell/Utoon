import * as ex from "excalibur";
import { SCALED_CELL } from "../constants.js";

export class MM_CameraStrategy {
  constructor(target) {
    this.target = target;
    this.pinnedY = this.compensateForMapHeight(0);
    this.y = this.pinnedY;
    this.leftLimit = 0;
    this.rightLimit = 9999;
  }

  compensateForMapHeight(n) {
    return n + SCALED_CELL * 7.5;
  }

  onPinChange(newY) {
    this.pinnedY = this.compensateForMapHeight(newY);
  }

  setRoomLimits(incomingLimits) {
    this.leftLimit = incomingLimits[0];
    this.rightLimit = incomingLimits[1];
  }

  action(target, camera, engine, delta) {
    // Transition towards Y destination if we are not there already
    this.y = lerp(this.y, this.pinnedY, 0.05);

    // Don't go beyond horizontal limits
    let cameraX = target.pos.x;
    if (cameraX < this.leftLimit) {
      cameraX = this.leftLimit;
    }
    if (cameraX > this.rightLimit) {
      cameraX = this.rightLimit;
    }

    // Limits
    return new ex.Vector(cameraX, this.y);
  }
}

function lerp(currentValue, destinationValue, time) {
  return currentValue * (1 - time) + destinationValue * time;
}
