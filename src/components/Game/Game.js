import * as ex from "excalibur";
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { loader } from "./resources.js";
import { Hero } from "./actors/Hero/Hero.js";
import { Martian_Stage } from "./Stages/Matian_Stage.js";
import { initialize_game } from './main.js';

const Game = () => {
    const { running_spritesheet_url, idle_spritesheet_url, jump_spritesheet_url } = useSelector((state) => state.game);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const gameContainerRef = useRef(null);
    const hasMounted = useRef(false);

    const start_game = async (running_spritesheet_url, idle_spritesheet_url, jump_spritesheet_url) => {
        console.log({
            running_spritesheet_url,
            idle_spritesheet_url,
            jump_spritesheet_url
        })
        const game = await initialize_game(running_spritesheet_url, idle_spritesheet_url, jump_spritesheet_url);
        game.start(loader, gameContainerRef.current);
    }

    useEffect(() => {
        if (hasMounted.current) return;
        hasMounted.current = true;
        let isGameRunning = false;
        setIsGameRunning(true);
        if(idle_spritesheet_url && jump_spritesheet_url) start_game(running_spritesheet_url, idle_spritesheet_url, jump_spritesheet_url);

        return () => {
            if (isGameRunning) {
                // game.stop();
            }
        };
    }, [idle_spritesheet_url, running_spritesheet_url, jump_spritesheet_url]);

    return (
        <div>
            <h1>The Game</h1>
            <div ref={gameContainerRef} id="game"></div>
        </div>
    );
};

export default Game;
