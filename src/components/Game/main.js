import * as ex from "excalibur";
import React, {useEffect, useState} from 'react';

import { loader } from "./resources.js";
import AnimationMap from "./actors/Hero/animations.js";
import { Hero } from "./actors/Hero/Hero.js";
import { Floar } from "./actors/Floor.js";
import { Martian_Stage } from "./Stages/Matian_Stage.js";
import { MM_CameraStrategy } from "./classes/CameraStrategy.js";
import Store from "../../redux/store";
//delclare async function intialize_game (running_spritesheet_url, idle_spritesheet_url)
export const initialize_game = async ( running_spritesheet_url, idle_spritesheet_url, jump_spritesheet_url) =>
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

    const stage = new Martian_Stage();

    stage.rooms.forEach((room) => {
        game.add(room);
    });


    customResources.astroRunningSheet = new ex.ImageSource(running_spritesheet_url);
    customResources.astroIdleSheet = new ex.ImageSource(idle_spritesheet_url);
    customResources.astroJumpSheet = new ex.ImageSource(jump_spritesheet_url);

    await customResources.astroRunningSheet.load();
    if (customResources.astroRunningSheet.isLoaded()) {
        const astro_run_sheet = ex.SpriteSheet.fromImageSource({
            image: customResources.astroRunningSheet,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 1500 / 20,
                spriteHeight: 65,
            }
        });
        const astro_run_right = ex.Animation.fromSpriteSheet(astro_run_sheet, ex.range(0, 20), 25);
        const astro_run_left = ex.Animation.fromSpriteSheet(astro_run_sheet, ex.range(0, 20), 25);
        astro_run_left.flipHorizontal = true;
        customAnimationsMap.astro_run =  [astro_run_left, astro_run_right]
    };

    await customResources.astroIdleSheet.load();
    if (customResources.astroIdleSheet.isLoaded()) {

        const astro_idle_sheet = ex.SpriteSheet.fromImageSource({
            image: customResources.astroIdleSheet,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 1500 / 20,
                spriteHeight: 65,
            }
        });
        const astro_idle_right = ex.Animation.fromSpriteSheet(astro_idle_sheet, ex.range(0, 20), 25);
        const astro_idle_left = ex.Animation.fromSpriteSheet(astro_idle_sheet, ex.range(0, 20), 25);
        astro_idle_left.flipHorizontal = true;
        customAnimationsMap.IDLE = [astro_idle_left, astro_idle_right]
    }

    await customResources.astroJumpSheet.load();
    if (customResources.astroJumpSheet.isLoaded()) {

        const astro_jump_sheet = ex.SpriteSheet.fromImageSource({
            image: customResources.astroJumpSheet,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 75,
                spriteHeight: 65,
            }
        });
        const astro_jump_right = ex.Animation.fromSpriteSheet(astro_jump_sheet, ex.range(0, 4), 150);
        const astro_jump_left = ex.Animation.fromSpriteSheet(astro_jump_sheet, ex.range(0, 4), 150);
        astro_jump_left.flipHorizontal = true;
        customAnimationsMap.JUMP = [astro_jump_left, astro_jump_right]
    }

    const hero = new Hero(200, 200, customAnimationsMap);
    const cameraStrategy = new MM_CameraStrategy(hero);
    cameraStrategy.setRoomLimits(stage.firstMap.limits);
    // Add the hero to the scene
    game.add(hero);
    

    game.on("initialize", () => {
        game.currentScene.camera.addStrategy(cameraStrategy);
    });

    return game;
}

// const SCALE = 2;


// const game = new ex.Engine({
//     width: 700 * SCALE,
//     height: 300 * SCALE,
//     fixedUpdateFps: 60,
//     antialiasing: false, // Pixel art graphics
//     configurePerformanceCanvas2DFallback: {
//         allow: false
//     }
// });

// Set global gravity
// ex.Physics.acc = new ex.Vector(0, 1500);

// const stage = new Martian_Stage();

// stage.rooms.forEach((room) => {
//     game.add(room);
// });


// if running_spritesheet_url is not null set astroRunningSheet to running_spritesheet_url


// Set background color
// await game.start(loader)

// export game as a component
// export default game;

// export default function GameLoader({astroRunningSheet = '/sprites/astro_running.png'}) {
//     const [game, setGame] = useState(null);
//     const { animations, animationMap } = AnimationMap(astroRunningSheet);


//     useEffect(() => {
        
//         const SCALE = 2;


//         const game = new ex.Engine({
//             width: 700 * SCALE,
//             height: 300 * SCALE,
//             fixedUpdateFps: 60,
//             antialiasing: false, // Pixel art graphics
//         });

//         // Set global gravity
//         ex.Physics.acc = new ex.Vector(0, 1500);

//         const stage = new Martian_Stage();

//         stage.rooms.forEach((room) => {
//             game.add(room);
//         });

//         const hero = new Hero(200, 200, animations, animationMap);

//         game.add(hero);

//         game.on("initialize", () => {
//             game.currentScene.camera.strategy.lockToActor(hero);
//         })

//         setGame(game);

//         // // Set background color
//         // await game.start(loader)
//     }, [animations, animationMap]);

//     return {
//         game,
//     }

// }