import { engine } from "$game";
import { Explosion } from "./Explosion";
import { getBaseY, getSafeArea, pxScale, pxScaleVec } from "./util";
import { Vehicle } from "./vehicles";

const head = ex.SpriteSheet.fromImageSource({
  image: $res("sprites/player/head.png"),
  grid: {
    columns: 4,
    rows: 1,
    spriteWidth: 7,
    spriteHeight: 5,
  },
});
const wheels = ex.SpriteSheet.fromImageSource({
  image: $res("sprites/player/wheels.png"),
  grid: {
    columns: 4,
    rows: 1,
    spriteWidth: 17,
    spriteHeight: 6,
  },
});
const bike = $res("sprites/player/bike.png").toSprite();
const body = $res("sprites/player/body.png").toSprite();

const sndJump = $res("sound/jump.mp3");
sndJump.volume = 0.5;

const running_sheet_url = new ex.ImageSource("https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/UQfcXfiPPM_Running_sprite_sheet.png");
await running_sheet_url.load();
const run_sheet = ex.SpriteSheet.fromImageSource({
  image: running_sheet_url,
  grid: {
    columns: 20,
    rows: 1,
    spriteWidth: 1500 / 20,
    spriteHeight: 65,
  }
});

const run_right = ex.Animation.fromSpriteSheet(run_sheet, ex.range(0, 20), 25);

export class Player extends ex.Actor {
  scene;

  frame = 0;
  animSpeed = 0.2;

  coyoteTime = 0;

  isOnGround = false;
  isEntering = true;

  constructor() {
    super({
      width: 48,
      height: 48,
      collider: ex.Shape.Box(11, 45, new ex.Vector(0.5, 0.5), new ex.Vector(0, -3)),
      scale: new ex.Vector(1.5, 1.5),
      collisionType: ex.CollisionType.Active,
    });
  }

  onInitialize() {
    this.on("collisionstart", this.onCollisionStart);
    this.on("postcollision", this.onPostCollision);

    const handleJumpInput = () => {
      if (this.scene.state.playing) {
        this.coyoteTime = 150;
        this.jump();
      } else if (!this.scene.state.dead) {
        this.emit("start", undefined);
      }
    };

    engine.input.pointers.on("down", () => handleJumpInput());
    engine.input.keyboard.on("press", (ev) => {
      handleJumpInput();
    });
  }

  onCollisionStart = (evt) => {
    if (evt.other.name === "Vehicle") {
      this.die();
    }
  };

  onPostCollision = (evt) => {
    if (evt.side === ex.Side.Bottom) {
      this.isOnGround = true;
      if (this.coyoteTime > 0) {
        this.jump();
        this.coyoteTime = 0;
      }
    }

    if (evt.other instanceof Vehicle) {
      if (evt.side === ex.Side.Left || evt.side === ex.Side.Right) {
        this.die();
      }
    }
  };

  onPreUpdate(engine, delta) {
    if (this.pos.x < getSafeArea().left + pxScale(16)) {
      this.isEntering = true;
      this.vel.x = 150;
    } else {
      this.isEntering = false;
      this.vel.x = 0;
      this.pos.x = getSafeArea().left + pxScale(16);
    }

    this.frame = (this.frame + this.animSpeed) % 4;

    this.coyoteTime = Math.max(0, this.coyoteTime - delta);

    const yVel = this.vel.y;
    if (yVel > -60 && yVel < 0 && yVel !== 0) {
      this.vel.y -= 2.25 * delta;
    }
  }

  onPostUpdate() {
    this.draw();
    if (this.pos.y > getSafeArea().bottom) {
      this.die();
    }
  }

  die() {
    if (!this.isKilled()) {
      this.vel = ex.vec(0, 0);
      this.coyoteTime = 0;
      this.scene.engine.add(
        new Explosion({
          pos: this.pos,
        })
      );
      this.emit("died", undefined);
      this.scene.emit("playerdied", undefined);
      this.kill();
    }
  }

  jump() {
    if (this.isOnGround && !this.isEntering && !this.isKilled()) {
      sndJump.play();
      this.vel.y = -13 * 90;
      this.isOnGround = false;
    }
  }

  draw() {
    this.graphics.use(run_right);
  }
}