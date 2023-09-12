import * as ex from "excalibur";
import React, {useEffect, useState} from 'react';

import { loader } from "./resources.js";
import AnimationMap from "./actors/Hero/animations.js";
import { Hero } from "./actors/Hero/Hero.js";
import { Floar } from "./actors/Floor.js";
import { Martian_Stage } from "./Stages/Matian_Stage.js";
import Store from "../../redux/store";

const SCALE = 2;


const game = new ex.Engine({
    width: 700 * SCALE,
    height: 300 * SCALE,
    fixedUpdateFps: 60,
    antialiasing: false, // Pixel art graphics
});

// Set global gravity
ex.Physics.acc = new ex.Vector(0, 1500);

const stage = new Martian_Stage();

stage.rooms.forEach((room) => {
    game.add(room);
});


// if running_spritesheet_url is not null set astroRunningSheet to running_spritesheet_url


// Set background color
// await game.start(loader)

// export game as a component
export default game;

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