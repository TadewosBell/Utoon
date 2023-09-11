import * as ex from "excalibur";
import { loader } from "./resources.js";
import { Hero } from "./actors/Hero/Hero.js";
import { Floar } from "./actors/Floor.js";
import { Martian_Stage } from "./Stages/Matian_Stage.js";

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

const hero = new Hero(200, 200);

game.add(hero);

game.on("initialize", () => {
    game.currentScene.camera.strategy.lockToActor(hero);
})

// // Set background color
// await game.start(loader)

// export game as a component
export default game;