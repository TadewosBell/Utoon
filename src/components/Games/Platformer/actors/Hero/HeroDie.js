import * as ex from "excalibur";
import {
  UP,
  DOWN,
  DOWN_LEFT,
  DOWN_RIGHT,
  LEFT,
  RIGHT,
  UP_LEFT,
  UP_RIGHT,
} from "../../constants.js";
import { HeroDieExplosion } from "./HeroDieExplosion.js";

export class HeroDie extends ex.Actor {
  constructor(x, y) {
    super({
      pos: new ex.Vector(x, y),
    });
  }

  onInitialize(engine) {
    void this.runExplosionSeries(engine);
  }

  async runExplosionSeries(engine) {
    this.createExplosions(engine);
    await this.actions.delay(400).toPromise();
    this.createExplosions(engine);
  }

  createExplosions(engine) {
    [UP, DOWN, LEFT, RIGHT, UP_LEFT, UP_RIGHT, DOWN_LEFT, DOWN_RIGHT].forEach(
      (direction) => {
        const expl = new HeroDieExplosion(this.pos.x, this.pos.y, direction);
        engine.add(expl);
      }
    );
  }
}
