import * as ex from "excalibur";
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { loader } from "./resources.js";
import { Hero } from "./actors/Hero/Hero.js";
import game from './main.js';

const Game = () => {
    const { running_spritesheet_url, idle_spritesheet_url } = useSelector((state) => state.game);
    const gameContainerRef = useRef(null);

    useEffect(() => {
        const customResources = {}
        const customAnimationsMap = {}
        let isGameRunning = false;

        if (running_spritesheet_url) {
            customResources.astroRunningSheet = new ex.ImageSource(running_spritesheet_url);

            customResources.astroRunningSheet.load().then(() => {
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
                customAnimationsMap.astro_run = [astro_run_left, astro_run_right]
                const hero = new Hero(200, 200, customAnimationsMap);

                // game.add(hero);
                // Check if hero already exists in the scene
                const existingHero = game.currentScene.actors.find(actor => actor === hero);

                // If existingHero is not undefined, it means the hero already exists in the scene
                if (existingHero) {
                // You can perform actions or log a message here
                console.log('Hero already exists in the scene.');
                } else {
                // Add the hero to the scene
                game.add(hero);
                }

                game.on("initialize", () => {
                    game.currentScene.camera.strategy.lockToActor(hero);
                });

                if (!isGameRunning) {
                    game.start(loader, gameContainerRef.current);
                    isGameRunning = true;
                }
            });
        }

        return () => {
            if (isGameRunning) {
                game.stop();
            }
        };
    }, []);

    return (
        <div>
            <h1>The Game</h1>
            <div ref={gameContainerRef} id="game"></div>
        </div>
    );
};

export default Game;
