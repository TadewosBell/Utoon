import * as ex from "excalibur";
import {
  ANCHOR_CENTER,
  LEFT,
  RIGHT,
  SCALE,
  TAG_HERO,
  TAG_HERO_BULLET,
} from "../../../constants.js";
import { NewShotmanHorizontalBullet } from "./NewShotmanHorizontalBullet.js";
import { NewShotmanLaunchBullet } from "./NewShotmanLaunchBullet.js";
import { HP } from "../../../classes/HP.js";
import { EnemyDieExplosion } from "../../EnemyDieExplosion.js";
import { Images } from "../../../resources.js";
import { DrawShapeHelper } from "../../../classes/DrawShapeHelper.js";

const spriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.shotmanSheetImage,
  grid: {
    columns: 3,
    rows: 2,
    spriteWidth: 32,
    spriteHeight: 32,
  },
});

const normalAnim = ex.Animation.fromSpriteSheet(spriteSheet, [0, 1], 200);
const normalAnimPain = ex.Animation.fromSpriteSheet(spriteSheet, [3, 4], 200);

const launchAnim = ex.Animation.fromSpriteSheet(spriteSheet, [2], 200);
const launchPain = ex.Animation.fromSpriteSheet(spriteSheet, [5], 200);

const collisionBox = ex.Shape.Box(
  18,
  22,
  ANCHOR_CENTER,
  new ex.Vector(0, 2) //pixels
);

const NORMAL = "NORMAL";
const LAUNCH = "LAUNCH";

const NEW_NORMAL_STATE = {
  type: NORMAL,
  msLeft: 2000,
};

const NEW_LAUNCH_STATE = {
  type: LAUNCH,
  msLeft: 280,
};

export class NewShotman extends ex.Actor {
  constructor(x, y, hero) {
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
    this.graphics.use(normalAnim);
    this.hp = new HP(5, {}, () => {
      const expl = new EnemyDieExplosion(this.pos.x, this.pos.y + SCALE * 3);
      this.scene.engine.add(expl);
      this.kill();
    });
    this.painMsRemaining = 0;

    this.state = {
      ...NEW_NORMAL_STATE,
    };

    this.on("initialize", () => {
      //Timer
      this.shoot();

      //Collide with body
      this.on("collisionstart", (ev) => {
        if (ev.other.hasTag(TAG_HERO_BULLET)) {
          ev.other.kill();

          if (!this.isPainFlashing) {
            this.takeDamage(ev.other);
          }
        }
      });
    });
  }

  onInitialize(_engine) {
    //new DrawShapeHelper(this);
  }

  get isPainFlashing() {
    return this.painMsRemaining > 0;
  }

  changeState(type) {
    if (type === NORMAL) {
      this.state = {
        ...NEW_NORMAL_STATE,
      };
    }
    if (type === LAUNCH) {
      this.launchTopBullet();
      this.state = {
        ...NEW_LAUNCH_STATE,
      };
    }
  }

  takeDamage(other) {
    this.painMsRemaining = 120;
    this.hp.takeDamage(other);
  }

  async shoot() {
    this.createHorizontalBullets();

    await this.actions.delay(500).toPromise();
    if (this.isKilled()) {
      return;
    }
    this.createHorizontalBullets();

    await this.actions.delay(2000).toPromise();

    if (this.isKilled()) {
      return;
    }
    this.shoot();
  }

  createHorizontalBullets() {
    const x = this.pos.x;
    const y = this.pos.y + SCALE * -2;
    this.scene.engine.add(
      new NewShotmanHorizontalBullet(x - 12 * SCALE, y, LEFT)
    );
    this.scene.engine.add(
      new NewShotmanHorizontalBullet(x + 12 * SCALE, y, RIGHT)
    );
  }

  launchTopBullet() {
    const heroQuery = this.scene.world.queryManager.getQuery([TAG_HERO]);
    const hero = heroQuery.getEntities()[0];
    if (!hero) {
      return;
    }
    this.scene.engine.add(
      new NewShotmanLaunchBullet(this.pos.x, this.pos.y + SCALE * -20, hero)
    );
  }

  onPostUpdate(_engine, delta) {
    this.painMsRemaining = Math.max(this.painMsRemaining - delta, 0); //Don't let it go below 0

    this.state.msLeft -= delta;
    if (this.state.msLeft <= 0) {
      this.changeState(this.state.type === NORMAL ? LAUNCH : NORMAL);
    }
    this.useAnimation();
  }

  useAnimation() {
    if (this.state.type === LAUNCH) {
      this.graphics.use(this.isPainFlashing ? launchPain : launchAnim);
      return;
    }
    this.graphics.use(this.isPainFlashing ? normalAnimPain : normalAnim);
  }
}
