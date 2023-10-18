import * as ex from "excalibur";
import { Images } from "../../../resources.js";
import { LEFT } from "../../../constants.js";
import { ANCHOR_CENTER, TAG_HERO_BULLET } from "../../../constants.js";
import { DrawShapeHelper } from "../../../classes/DrawShapeHelper.js";
import anims, { animationMap } from '../../Hero/animations';

const RUN_ANIM_SPEED = 140;
const RUN_TOTAL_MS = RUN_ANIM_SPEED * 4;

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

export class Alien extends ex.Actor {
  constructor(x, y, dir) {
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
    this.dir = dir;

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

  onPreUpdateAnimationLoop(_delta) {
    // console log current x, y position
    console.log(this.pos.x/32, this.pos.y/32);

    // Start with LEFT or RIGHT
    let index = this.spriteDirection === LEFT ? 0 : 1;
    // Uptick index if shooting
    if (this.shootingMsLeft > 0) {
      index += 2;
    }

    if(this.pos.y/32 > 25){
      console.log(("Hero fell off the map"))
      // kill hero if he falls off the map
      this.takeDamage(100);
    }

    if (this.painState) {
      this.graphics.use(animationMap["PAIN"][index]);
      return;
    }
    if (this.climbTopState) {
      this.graphics.use(anims.climbTop);
      return;
    }
    if (this.climbingLadderState) {
      this.graphics.use(this.getLadderAnim());
      return;
    }
    if (!this.onGround) {
      this.graphics.use(this.animationMap["JUMP"][index]);
      return;
    }
    if (this.vel.x !== 0) {
      this.graphics.use(this.getRunningAnim(index));
      return;
    }
    if (this.preStepMsLeft > 0) {
      this.graphics.use(this.animationMap["IDLE"][index]);
      return;
    }
    this.graphics.use(this.animationMap["IDLE"][index]);
  }


  async behavior() {
        // Setup patroling behavior

        // For the test harness to be predicable
        if (!(window).__TESTING) {
            this.actions.delay(1000)
                        .repeatForever(ctx => ctx
                            .moveBy(400 * this.dir, 0, 100)
                            .moveBy(-400 * this.dir, 0, 100));
        }
  }

  getRunningAnim(index) {
    if (this.runningAnimationFramesMs < RUN_TOTAL_MS * 0.25) {
        return this.animationMap["RUN"][index];
      }
      if (this.runningAnimationFramesMs < RUN_TOTAL_MS * 0.5) {
        return this.animationMap["RUN"][index];
      }
      if (this.runningAnimationFramesMs < RUN_TOTAL_MS * 0.75) {
        return this.animationMap["RUN"][index];
      }
      return this.animationMap["RUN"][index];
  }

  handleCollisionWithMegaManBullet(other) {
    //this.kill();
    other.deflect();

    //other.kill();
    // TODO - taking damage stuff
  }
}
