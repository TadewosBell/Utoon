import * as ex from "excalibur";
import { Images } from "../../../resources.js";
import { ANCHOR_CENTER, TAG_HERO_BULLET } from "../../../constants.js";
import { DrawShapeHelper } from "../../../classes/DrawShapeHelper.js";

const spriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.hardHatSheetImage,
  grid: {
    columns: 5,
    rows: 3,
    spriteWidth: 32,
    spriteHeight: 32,
  },
});

const enterHidingAnim = ex.Animation.fromSpriteSheet(
  spriteSheet,
  [5, 6, 7],
  200
);
enterHidingAnim.strategy = ex.AnimationStrategy.Freeze;

const idleHidingAnim = ex.Animation.fromSpriteSheet(spriteSheet, [0], 200);
const exitHidingAnim = ex.Animation.fromSpriteSheet(
  spriteSheet,
  [0, 1, 2],
  200
);
exitHidingAnim.strategy = ex.AnimationStrategy.Freeze;

const standingAnim = ex.Animation.fromSpriteSheet(spriteSheet, [2], 200);
// const standingAnimPain = ex.Animation.fromSpriteSheet(spriteSheet, [7], 200);
// const walkingAnim = ex.Animation.fromSpriteSheet(spriteSheet, [3, 4], 200);
// const walkingAnimPain = ex.Animation.fromSpriteSheet(spriteSheet, [8, 9], 200);

const collisionBox = ex.Shape.Box(
  14,
  14,
  ANCHOR_CENTER,
  new ex.Vector(0, 8) //pixels
);

export class HardHat extends ex.Actor {
  constructor(x, y) {
    super({
      x: x,
      y: y,
      width: 32,
      height: 32,
      collider: collisionBox,
      scale: new ex.Vector(2, 2),
      color: ex.Color.Green,
      collisionType: ex.CollisionType.Active,
    });

    this.graphics.use(idleHidingAnim);

    this.on("initialize", () => {
      void this.behavior();

      // this.graphics.add("only", onlyAnim);
      // this.graphics.getGraphic("only").events.on("frame", (frame) => {
      //   console.log("frame", frame);
      // });
      // this.graphics.show("only");

      //Collide with body
      this.on("collisionstart", (ev) => {
        if (ev.other.hasTag(TAG_HERO_BULLET)) {
          this.handleCollisionWithMegaManBullet(ev.other);
        }
      });
    });
  }

  onInitialize(_engine) {
    new DrawShapeHelper(this);
  }

  async behavior() {
    this.graphics.use(exitHidingAnim);

    await this.actions.delay(2000).toPromise();

    // exitHidingAnim.goToFrame(0);
    // enterHidingAnim.goToFrame(0);

    this.graphics.use(standingAnim);

    await this.actions.delay(2000).toPromise();

    this.graphics.use(enterHidingAnim);

    await this.actions.delay(2000).toPromise();

    void this.behavior();
  }

  handleCollisionWithMegaManBullet(other) {
    //this.kill();
    other.deflect();

    //other.kill();
    // TODO - taking damage stuff
  }
}
