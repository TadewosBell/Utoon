import * as ex from "excalibur";
import React, { useEffect, useState } from 'react';

import { ANCHOR_CENTER, LEFT, SCALE_2x, RIGHT } from "../../constants";
import animations, {animationMap} from "./animations.js";
import { Sounds } from "../../resources";
import { DirectionQueue } from "../../classes/DirectionQueue";

//Moving speed
const WALKING_VELOCITY = 300;
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
const RUN_TOTAL_MS = RUN_ANIM_SPEED * 10;

const LADDER_ANIM_SPEED = 220;
const LADDER_TOTAL_MS = LADDER_ANIM_SPEED * 2;

export class Hero extends ex.Actor {
    constructor(x, y, customAnimationMap=null) {
        super({
            x: x,
            y: y,
            width: 48,
            height: 48,
            collider: ex.Shape.Box(11, 48, ANCHOR_CENTER, new ex.Vector(8, -3)),
            scale: SCALE_2x,
            collisionType: ex.CollisionType.Active,
            color: ex.Color.Green,
        })

        this.animations = {...animations};
        this.animationMap = {...animationMap};

        // replace default animationMap with only values provided in customAnimationMap
        if(customAnimationMap) {
            for (const key in customAnimationMap) {
                this.animationMap[key] = customAnimationMap[key];
            }
        }

        this.graphics.use(this.animations.idleRight);
        this.onGround = false;
        this.directionQueue = new DirectionQueue();
        this.spriteDirection = RIGHT;
        this.runningAnimationFramesMs = RUN_TOTAL_MS;

        this.on("postcollision", (evt) => this.onPostCollision(evt));
    }

    onPostCollision(evt) {

        //if hero hits the floor on the bottom side then he is on the ground
        if(evt.other.isFloor && evt.side === ex.Side.Bottom) {

            // play sound when landing
            if(!this.onGround) {
                Sounds.LANDING.play();
            }

            this.onGround = true;
        }
    }

    onPreUpdate(engine, delta) {
        //do any phisics things
        this.onPreUpdatePhysics(engine, delta);

        //show correct frame for Hero's state
        this.onPreUpdateAnimationLoop(delta);
    }

    onPreUpdatePhysics(engine, delta) {
        const keyboard =  engine.input.keyboard;
        const keys = ex.Keys;
        const JUMP_KEY = keys.Space;

        [
            { key: keys.Left, dir: LEFT },
            { key: keys.Right, dir: RIGHT },
        ].forEach((group) => {
            if(engine.input.keyboard.wasPressed(group.key)) {
                this.directionQueue.add(group.dir);
            }
            if(engine.input.keyboard.wasReleased(group.key)) {
                this.directionQueue.remove(group.dir);
            }
        })

        //if y is pressed make hero dance
        if(engine.input.keyboard.wasPressed(keys.Y)) {
            this.graphics.use(animations.YMCA)
        }

        //Reset grounding
        if(this.vel.y !== 0) {
            this.onGround = false;
        }

        this.vel.x = 0;
        const dir = this.directionQueue.direction;
        if(dir) {
            this.vel.x = dir === LEFT ? -WALKING_VELOCITY : WALKING_VELOCITY;
            // running animation needs more work
            this.runningAnimationFramesMs -= delta;
            if(this.runningAnimationFramesMs <= 0) {
                this.runningAnimationFramesMs = RUN_TOTAL_MS;
            }
        }

        this.spriteDirection = this.directionQueue.direction ?? this.spriteDirection;

        //Jump handler (while on ground)
        const canJump = this.onGround;
        if(canJump && keyboard.isHeld(JUMP_KEY)) {
            this.vel.y = JUMP_VELOCITY;
        }
        // variable jump - shut off negative velocity when releasing the key
        if(keyboard.wasReleased(JUMP_KEY) && this.vel.y < 0) {
            this.vel.y = 0;
        }

    }

    onPreUpdateAnimationLoop(delta) {
        let index = this.spriteDirection === LEFT ? 0 : 1;

        if(!this.onGround) {
            this.graphics.use(this.animationMap["JUMP"][index]);
            return;
        }

        if(this.vel.x !== 0 ) {
            this.graphics.use(this.getRunningAnim(index));
            return;
        }

        this.graphics.use(this.animationMap["IDLE"][index]);
    }

    getRunningAnim(index) {
        if (this.runningAnimationFramesMs < RUN_TOTAL_MS * 0.25) {
          return this.animationMap["astro_run"][index];
        }
        if (this.runningAnimationFramesMs < RUN_TOTAL_MS * 0.5) {
          return this.animationMap["astro_run"][index];
        }
        if (this.runningAnimationFramesMs < RUN_TOTAL_MS * 0.75) {
          return this.animationMap["astro_run"][index];
        }
        return this.animationMap["astro_run"][index];
    }
}
