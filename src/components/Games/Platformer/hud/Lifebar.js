import * as ex from "excalibur";
import {
  ANCHOR_TOP_LEFT,
  CUSTOM_EVENT_MM_HP_UPDATE,
  SCALE,
} from "../constants.js";

export class Lifebar extends ex.ScreenElement {
  constructor() {
    super({
      x: 16 * SCALE,
      y: 16 * SCALE,
      width: 8 * SCALE,
      height: 56 * SCALE,
      color: ex.Color.Black,
      anchor: ANCHOR_TOP_LEFT,
    });
    this.blips = [];
  }

  onInitialize(engine) {
    const TOTAL_BLIPS = 28;

    // Create all 28 Blips
    let yPos = this.pos.y + SCALE * 56;
    for (let index = 1; index <= TOTAL_BLIPS; index++) {
      yPos -= SCALE * 2;
      const blip = new LifebarBlip(this.pos.x + SCALE, yPos);
      this.blips.push(blip);
      engine.add(blip);
    }

    // Subscribe to HP changes
    engine.on(CUSTOM_EVENT_MM_HP_UPDATE, (newHpValue) => {
      this.updateBlips(newHpValue);
    });
  }

  // Toggle visibility on blips
  updateBlips(hp) {
    this.blips.forEach((blip, index) => {
      blip.setVisible(hp >= index + 1);
    });
  }
}

export class LifebarBlip extends ex.ScreenElement {
  constructor(x, y) {
    super({
      x,
      y,
      width: 6 * SCALE,
      height: SCALE,
      anchor: ANCHOR_TOP_LEFT,
    });

    this.graphics.use(
      new ex.Canvas({
        draw: (ctx) => this.draw(ctx),
        cache: false,
        width: this.width,
        height: this.height,
      })
    );

    this.isVisible = true;
  }

  setVisible(newValue) {
    this.isVisible = newValue;
  }

  draw(ctx) {
    // Clear if this blip isn't visible
    if (!this.isVisible) {
      ctx.clearRect(0, 0, ctx.width, ctx.height);
      return;
    }

    // Custom draw the blip color base
    ctx.fillStyle = "#fce4a0"; // Tan color
    ctx.fillRect(0, 0, this.width, this.height);

    // White inner
    ctx.fillStyle = "#fff";
    ctx.fillRect(SCALE * 2, 0, SCALE * 2, this.height);
  }
}
