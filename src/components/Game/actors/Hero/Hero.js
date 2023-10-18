import * as ex from "excalibur";
import { DirectionQueue } from "../../classes/DirectionQueue.js";
import { HeroBullet } from "./HeroBullet.js";
import {
  ANCHOR_CENTER,
  CUSTOM_EVENT_MM_DAMAGED,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  TAG_HERO,
  SCALE_2x,
  SCALE,
  TAG_LADDER,
  TAG_LADDER_DETECT_TOP,
} from "../../constants.js";
import { HeroPain } from "./HeroPain.js";
import { Sounds } from "../../resources.js";
import anims, { animationMap } from "./animations.js";

//MOVING SPEEDS
const WALKING_VELOCITY = 180;
const JUMP_VELOCITY = -600;
const LADDER_JUMP_VELOCITY = -200;
const LADDER_CLIMB_VELOCITY = 100;
const PAIN_PUSHBACK_VELOCITY = 50;
const ROOM_TRANSITION_VELOCITY = 20;
const MAX_FALLING_VELOCITY = 400;

// TIMING constants
const DURATION_CLIMB_TOP_TOTAL_MS = 140;
const DURATION_PRE_STEP = 80;

const RUN_ANIM_SPEED = 140;
const RUN_TOTAL_MS = RUN_ANIM_SPEED * 4;

const LADDER_ANIM_SPEED = 220;
const LADDER_TOTAL_MS = LADDER_ANIM_SPEED * 2;

export class Hero extends ex.Actor {
  constructor(x, y,  customAnimationMap=null) {
    super({
      x: x,
      y: y,
      width: 48,
      height: 48,
      collider: ex.Shape.Box(11, 45, ANCHOR_CENTER, new ex.Vector(0, -3)),
      scale: SCALE_2x,
      collisionType: ex.CollisionType.Active,
      color: ex.Color.Green
    });
    this.animations = {...anims};
    this.animationMap = {...animationMap};

    console.log("CUSTOM ANIMATION MAP", customAnimationMap)
    // replace default animationMap with only values provided in customAnimationMap

    if(customAnimationMap) {
        for (const key in customAnimationMap) {
            console.log("KEY", key)
            this.animationMap[key] = customAnimationMap[key];
        }
    }

    this.graphics.use(this.animationMap["IDLE"][1]);
    this.graphics.use(anims.idleRight);

    //Identifier
    this.isHero = true;
    this.onGround = false;

    // States
    this.painState = null;
    this.climbTopState = null;
    this.climbingLadderState = false;

    this.isOverlappingLadderTop = false;
    this.ladderOverlap = null;

    this.directionQueue = new DirectionQueue();
    this.spriteDirection = RIGHT;

    this.shootingMsLeft = 0;
    this.preStepMsLeft = 0;

    this.runningAnimationFramesMs = RUN_TOTAL_MS;
    this.ladderAnimationFramesMs = LADDER_TOTAL_MS;

    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
    this.on("collisionend", (evt) => this.onCollisionEnd(evt));
    this.on("postcollision", (evt) => this.onPostCollision(evt));
  }

  onInitialize(_engine) {
    this.addTag(TAG_HERO);
    //new DrawShapeHelper(this);
  }

  onCollisionStart(evt) {
    // Know when we overlap a ladder, keep track of its X value
    if (evt.other.hasTag(TAG_LADDER)) {
      this.ladderOverlap = {
        x: evt.other.pos.x + 14, // offset to nudge Hero to be right on the ladder
      };
    }

    // Know when we overlap the top of a ladder
    if (evt.other.hasTag(TAG_LADDER_DETECT_TOP)) {
      this.isOverlappingLadderTop = true;
    }

    // Handle hero bullet collisions
    if (evt.other.damagesHeroWithNumber) {
      // Damage hero
      this.takeDamage(evt.other.damagesHeroWithNumber);

      // Remove other bullet
      if (evt.other.diesOnCollideWithHero) {
        evt.other.kill();
      }
    }


  }

  onCollisionEnd(evt) {
    if (evt.other.hasTag(TAG_LADDER)) {
      this.ladderOverlap = null;
    }
    if (evt.other.hasTag(TAG_LADDER_DETECT_TOP)) {
      this.isOverlappingLadderTop = false;
    }
  }

  onPostCollision(evt) {
    if (evt.other.isFloor && evt.side === ex.Side.Bottom) {
      if (!this.onGround) {
        Sounds.LANDING.play();
      }
      this.onGround = true;
    }
  }

  setTransitioningRooms(newValue) {
    this.transitioningRoomDirection = newValue;
    if (newValue) {
      this.body.collisionType = ex.CollisionType.Passive;
      return;
    }

    if (!this.climbingLadderState) {
      this.body.collisionType = ex.CollisionType.Active;
    }
  }

  setLadderLocked(newValue) {
    this.climbingLadderState = newValue;
    this.vel.y = 0;
    this.vel.x = 0;
    if (newValue) {
      this.pos.x = this.ladderOverlap.x;
      this.body.collisionType = ex.CollisionType.Passive;
      return;
    }
    this.body.collisionType = ex.CollisionType.Active;
  }

  onPreUpdatePhysics(engine, delta) {
    const keyboard = engine.input.keyboard;
    const keys = ex.Input.Keys;
    const JUMP_KEY = keys.Z;

    //Always listen for Horizontal input regardless of being locked
    [
      { key: keys.Left, dir: LEFT },
      { key: keys.Right, dir: RIGHT },
    ].forEach((group) => {
      if (engine.input.keyboard.wasPressed(group.key)) {
        this.directionQueue.add(group.dir);
      }
      if (engine.input.keyboard.wasReleased(group.key)) {
        this.directionQueue.remove(group.dir);
      }
    });

    //Reset grounding
    if (this.vel.y !== 0) {
      this.onGround = false;
    }
    // Always downtick timers
    if (this.shootingMsLeft > 0) {
      this.shootingMsLeft -= delta;
    }
    // Sync direction to keyboard input
    this.spriteDirection =
      this.directionQueue.direction ?? this.spriteDirection;

    // EARLY STOP - transitionining maps, stop here
    if (this.transitioningRoomDirection === DOWN) {
      this.vel.y = ROOM_TRANSITION_VELOCITY;
      return;
    }
    if (this.transitioningRoomDirection === UP) {
      this.vel.y = -ROOM_TRANSITION_VELOCITY;
      return;
    }

    // EARLY STOP - handle Pain
    if (this.painState) {
      if (this.painState.moveDirection === LEFT) {
        this.vel.x = -PAIN_PUSHBACK_VELOCITY;
      } else if (this.painState.moveDirection === RIGHT) {
        this.vel.x = PAIN_PUSHBACK_VELOCITY;
      }
      this.painState.msRemaining -= delta;
      if (this.painState.msRemaining <= 0) {
        this.painState = null;
      }
      return;
    }

    // EARLY STOP - handle Climb Top
    if (this.climbTopState) {
      this.vel.x = 0;
      this.vel.y = 0;
      this.climbTopState.msRemaining -= delta;
      if (this.climbTopState.msRemaining <= 0) {
        if (this.climbTopState.action === "CLIMB_DOWN") {
          this.setLadderLocked(true);
          this.pos.y += 32;
        }
        this.climbTopState = null;
      }
      return;
    }

    // Ladder movement
    if (this.climbingLadderState) {
      // Assume no vertical movement unless we have UP/DOWN pressed
      this.vel.y = 0;

      const isShooting = this.shootingMsLeft > 0;
      if (!isShooting) {
        // Allow Move UP the ladder if we're not shooting
        if (keyboard.isHeld(keys.Up)) {
          this.vel.y = -LADDER_CLIMB_VELOCITY;
          // Check for upwards exit
          if (this.isOverlappingLadderTop) {
            this.pos.y -= 10; // Nudge upwards to complete the climb (Places Hero on the ground up there)
            this.climbTopState = {
              action: "CLIMB_UP",
              msRemaining: DURATION_CLIMB_TOP_TOTAL_MS,
            };
            this.setLadderLocked(false);
          }
        }

        // Allow Move DOWN the ladder if we're not shooting
        if (keyboard.isHeld(keys.Down)) {
          this.vel.y = LADDER_CLIMB_VELOCITY;
          // Exit ladder by climbing off bottom
          if (!this.ladderOverlap) {
            this.setLadderLocked(false);
          }
        }

        //Work on Ladder frames
        if (this.vel.y !== 0) {
          this.ladderAnimationFramesMs -= delta;
          if (this.ladderAnimationFramesMs <= 0) {
            this.ladderAnimationFramesMs = LADDER_TOTAL_MS;
          }
        }
      }

      // Shoot handler (Ladder)
      this.checkForShootInput(engine);

      // Jump handler (Ladder)
      if (keyboard.wasPressed(JUMP_KEY)) {
        this.setLadderLocked(false);
        this.vel.y = LADDER_JUMP_VELOCITY;
      }
      return;
    }

    // Normal LEFT/RIGHT movement (Ground and In Air)
    if (!this.climbingLadderState) {

      // Maybe reset "prestep" if just on the ground
      const leftOrRightPressed = keyboard.wasPressed(keys.Left) || keyboard.wasPressed(keys.Right);
      if (leftOrRightPressed && this.onGround) {
        this.preStepMsLeft = DURATION_PRE_STEP;
      }

      // Assume no movement
      this.vel.x = 0;

      // Do what the current arrow says
      if (this.directionQueue.direction) {
        const dir = this.directionQueue.direction;
        if (this.onGround) {
          if (this.preStepMsLeft > 0) {
            this.preStepMsLeft -= delta;
          } else {
            this.vel.x = dir === LEFT ? -WALKING_VELOCITY : WALKING_VELOCITY;
          }
        } else {
          // IN AIR
          this.vel.x = dir === LEFT ? -WALKING_VELOCITY : WALKING_VELOCITY;
        }
      }

      // Work on running frames
      if (this.vel.x !== 0) {
        this.runningAnimationFramesMs -= delta;
        if (this.runningAnimationFramesMs <= 0) {
          this.runningAnimationFramesMs = RUN_TOTAL_MS;
        }
      }

      //Jump handler (while on ground)
      const canJump = this.onGround;
      if (canJump && engine.input.keyboard.wasPressed(JUMP_KEY)) {
        this.vel.y = JUMP_VELOCITY;
      }
      // Variable jump - shut off negative velocity when releasing the key
      if (engine.input.keyboard.wasReleased(JUMP_KEY) && this.vel.y < 0) {
        this.vel.y = 0;
      }
    }

    // Grab ladder handler while in air
    if (this.ladderOverlap && !this.onGround && keyboard.wasPressed(keys.Up)) {
      this.setLadderLocked(true);
    }

    // Enter ladder downwards from ground
    if (this.ladderOverlap && this.onGround && keyboard.wasPressed(keys.Down)) {
      this.pos.x = this.ladderOverlap.x; // Sync to ladder X
      this.climbTopState = {
        msRemaining: DURATION_CLIMB_TOP_TOTAL_MS,
        action: "CLIMB_DOWN",
      };
    }

    //Shoot handler (Ground/Air)
    this.checkForShootInput(engine);

    // Limit falling speed
    if (this.vel.y > MAX_FALLING_VELOCITY) {
      this.vel.y = MAX_FALLING_VELOCITY;
    }

    // Demo pain setter
    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
      this.takeDamage(22);
    }
  }

  checkForShootInput(engine) {
    const SHOOT_KEY = ex.Input.Keys.X;
    if (engine.input.keyboard.wasPressed(SHOOT_KEY)) {
      this.shootBullet(engine);
    }
  }

  onPreUpdate(engine, delta) {
    // Do any physics things
    this.onPreUpdatePhysics(engine, delta);

    // Show correct frame for Mega Man's state
    this.onPreUpdateAnimationLoop(delta);
  }

  takeDamage(num = 10) {
    const engine = this.scene.engine;

    if (this.isFlashingInPain) {
      return;
    }

    engine.emit(CUSTOM_EVENT_MM_DAMAGED, num);

    this.setLadderLocked(false); //Fall off ladder if on one
    this.painState = {
      moveDirection: this.spriteDirection === LEFT ? RIGHT : LEFT,
      msRemaining: 400,
    };

    Sounds.PAIN.play();
    const painFlash = new HeroPain(this);
    engine.add(painFlash);

    void this.beginPainFlashing();
  }

  async beginPainFlashing() {
    this.isFlashingInPain = true;
    const PAIN_FLASH_SPEED = 200;
    for (let i = 0; i <= 4; i++) {
      this.graphics.opacity = 0;
      await this.actions.delay(PAIN_FLASH_SPEED).toPromise();
      this.graphics.opacity = 1;
      await this.actions.delay(PAIN_FLASH_SPEED).toPromise();
    }
    this.isFlashingInPain = false;
  }

  shootBullet(engine) {
    this.shootingMsLeft = 300;

    // Get ideal bullet position per direction
    let bulletX = this.pos.x - 18 * SCALE;
    if (this.spriteDirection === RIGHT) {
      bulletX = this.pos.x + 18 * SCALE;
    }

    Sounds.SHOOT.play();
    const bullet = new HeroBullet(
      bulletX,
      this.pos.y - 8,
      this.spriteDirection
    );
    engine.add(bullet);
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

  getLadderAnim() {
    const isShooting = this.shootingMsLeft > 0;
    const isRight = this.spriteDirection === RIGHT;

    if (isShooting) {
      this.ladderAnimationFramesMs = LADDER_TOTAL_MS;
      return isRight ? anims.ladderShootR : anims.ladderShoot;
    }
    if (this.ladderAnimationFramesMs < LADDER_TOTAL_MS * 0.5) {
      return anims.ladder;
    }
    return anims.ladderR;
  }
}
