import * as ex from "excalibur";
import { Images } from "../../resources.js";
import { SCALE_2x } from "../../constants.js";

const sweatSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.sweatSpriteSheetImage,
  grid: {
    columns: 3,
    rows: 1,
    spriteWidth: 32,
    spriteHeight: 32,
  },
});
const sweatAnim = ex.Animation.fromSpriteSheet(
  sweatSpriteSheet,
  [0, 1, 2],
  300
);

export const painFlashSprite = Images.painFlashImage.toSprite();

export class HeroPain extends ex.Actor {
  constructor(lockToActor) {
    super({
      pos: lockToActor.pos,
      width: 48,
      height: 48,
      scale: SCALE_2x,
    });
    this.lockToActor = lockToActor;
  }

  onInitialize(_engine) {
    // "Sweat" frames
    this.graphics.add("sweat", sweatAnim);
    this.graphics.getGraphic("sweat").events.on("loop", () => {
      this.graphics.hide("sweat");
    });
    this.graphics.show("sweat");

    // "Flash" white explosion frame
    this.graphics.add("flash", painFlashSprite);
    void this.startFlashLoop();
  }

  async startFlashLoop() {
    const FLASH_SPEED = 70;
    this.graphics.show("flash");
    await this.actions.delay(FLASH_SPEED).toPromise();
    this.graphics.hide("flash");
    await this.actions.delay(FLASH_SPEED).toPromise();
    this.graphics.show("flash");
    await this.actions.delay(FLASH_SPEED).toPromise();
    this.graphics.hide("flash");
    await this.actions.delay(FLASH_SPEED).toPromise();
    this.graphics.show("flash");
    await this.actions.delay(FLASH_SPEED).toPromise();
    this.graphics.hide("flash");
    this.kill();
  }

  onPreUpdate(_engine, _delta) {
    this.pos = this.lockToActor.pos;
  }
}
