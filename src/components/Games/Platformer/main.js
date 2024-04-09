import * as ex from "excalibur";
import React, {useEffect, useState} from 'react';
import { Hero } from "./actors/Hero/Hero.js";
import { Martian_Stage } from "./Stages/Martian_Stage.js";
import { MM_CameraStrategy } from "./classes/CameraStrategy.js";
import {
    CUSTOM_EVENT_CAMERA_Y_CHANGE,
    SCALE,
    SCALED_CELL,
    TAG_HERO,
  } from "./constants.js";
import { Lifebar } from "./hud/Lifebar.js";
import { HeroHp } from "./classes/HeroHp.js";

//delclare async function intialize_game (running_spritesheet_url, idle_spritesheet_url)
export const initialize_game = async (urls) =>
{
    const customResources = {}
    const customAnimationsMap = {}
    let isGameRunning = false;
    const SCALE = 2;
    const game = new ex.Engine({
        width: 700 * SCALE,
        height: 300 * SCALE,
        fixedUpdateFps: 60,
        antialiasing: false, // Pixel art graphics
        configurePerformanceCanvas2DFallback: {
            allow: false
        }
    });

    // Set global gravity
    ex.Physics.acc = new ex.Vector(0, 1500);
    const mmHp = new HeroHp(game);

    const stage = new Martian_Stage();

    stage.rooms.forEach((room) => {
        game.add(room);
    });

    customResources.astroRunningSheet = new ex.ImageSource(urls.running_spritesheet_url);
    customResources.astroIdleSheet = new ex.ImageSource(urls.idle_spritesheet_url);
    customResources.astroJumpSheet = new ex.ImageSource(urls.jump_spritesheet_url);
    customResources.pain = new ex.ImageSource(urls.pain_spritesheet_url);
    await customResources.astroIdleSheet.load();
    if (customResources.astroIdleSheet.isLoaded()) {

        const idle_sheet = ex.SpriteSheet.fromImageSource({
            image: customResources.astroIdleSheet,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 1500 / 20,
                spriteHeight: 65,
            }
        });
        const idle_right = ex.Animation.fromSpriteSheet(idle_sheet, ex.range(0, 20), 25);
        const idle_left = ex.Animation.fromSpriteSheet(idle_sheet, ex.range(0, 20), 25);
        idle_left.flipHorizontal = true;
        console.log("Loaded custom animations");
        customAnimationsMap.IDLE = [idle_left, idle_right]
    }

    await customResources.astroRunningSheet.load();
    if (customResources.astroRunningSheet.isLoaded()) {
        const run_sheet = ex.SpriteSheet.fromImageSource({
            image: customResources.astroRunningSheet,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 1500 / 20,
                spriteHeight: 65,
            }
        });
        const run_right = ex.Animation.fromSpriteSheet(run_sheet, ex.range(0, 20), 25);
        const run_left = ex.Animation.fromSpriteSheet(run_sheet, ex.range(0, 20), 25);
        run_left.flipHorizontal = true;
        customAnimationsMap.RUN =  [run_left, run_right]
    };


    await customResources.astroJumpSheet.load();
    if (customResources.astroJumpSheet.isLoaded()) {

        const jump_sheet = ex.SpriteSheet.fromImageSource({
            image: customResources.astroJumpSheet,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 75,
                spriteHeight: 65,
            }
        });
        const jump_right = ex.Animation.fromSpriteSheet(jump_sheet, ex.range(0, 4), 150);
        const jump_left = ex.Animation.fromSpriteSheet(jump_sheet, ex.range(0, 4), 150);
        jump_left.flipHorizontal = true;
        customAnimationsMap.JUMP = [jump_left, jump_right]
    }

    await customResources.pain.load();
    if (customResources.pain.isLoaded()) {
        const pain_sheet = ex.SpriteSheet.fromImageSource({
            image: customResources.pain,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 75,
                spriteHeight: 65,
            }
        });
        const pain_right = ex.Animation.fromSpriteSheet(pain_sheet, ex.range(0, 4), 150);
        const pain_left = ex.Animation.fromSpriteSheet(pain_sheet, ex.range(0, 4), 150);
        pain_left.flipHorizontal = true;
        customAnimationsMap.PAIN = [pain_left, pain_right, pain_left, pain_right]
        console.log("Loaded pain animations")
    }

    const hero = new Hero(45 * SCALED_CELL, 2 * SCALED_CELL, customAnimationsMap);
    game.add(hero);
    const cameraStrategy = new MM_CameraStrategy(hero);
    console.log("Limits: ", stage.firstMap.limits)
    cameraStrategy.setRoomLimits(stage.firstMap.limits);
    
    const lifebar = new Lifebar();
    game.add(lifebar);
    
    
    game.on("initialize", () => {
      game.currentScene.camera.addStrategy(cameraStrategy);
      game.currentScene.world.queryManager.createQuery([TAG_HERO]);
    });
    
    game.on(CUSTOM_EVENT_CAMERA_Y_CHANGE, async ({ yPos, direction, room }) => {
      // Change Y position
      cameraStrategy.onPinChange(yPos);
      cameraStrategy.setRoomLimits(room.limits);
    
      hero.setTransitioningRooms(direction);
    
      // Let the camera catch up
      await hero.actions.delay(1500).toPromise();
    
      hero.setTransitioningRooms(null);
    });
    
    mmHp.init();
    mmHp.hero = hero;
    return game;
}

