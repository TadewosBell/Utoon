import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loader } from "./resources.js";
import { Hero } from "./actors/Hero/Hero.js";
import { Martian_Stage } from "./Stages/Martian_Stage.js";
import { initialize_game } from './main.js';
import { generateAllSpritesheetUrls } from "../../../redux/GameStore";

const Game = () => {
    const dispatch = useDispatch();
    const { running_spritesheet_url, idle_spritesheet_url, jump_spritesheet_url } = useSelector((state) => state.game);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const gameContainerRef = useRef(null);
    const hasMounted = useRef(false);
    const [urlsGenerated, setUrlGenerated] = useState(false);

    const GetDrawingIdQueryParam = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const drawingID = urlParams.get('drawingID');
        return drawingID;
    }
    const generateUrls = (drawingID) => {
        console.log("generateAllSpritesheetUrls", drawingID);
        const running_spritesheet_url = `https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/${drawingID}_Running_sprite_sheet.png`;
        const idle_spritesheet_url = `https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/${drawingID}_Idle_sprite_sheet.png`;
        const jump_spritesheet_url = `https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/${drawingID}_Game_Jump_sprite_sheet.png`;
        const pain_spritesheet_url = `https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/${drawingID}_Pain_sprite_sheet.png`;
        return {
            running_spritesheet_url,
            idle_spritesheet_url,
            jump_spritesheet_url,
            pain_spritesheet_url
        }
    }


    const start_game = async (urls) => {
        console.log(urls)
        const game = await initialize_game(urls);
        game.start(loader, gameContainerRef.current);
    }

    // useEffect(() => {
    //     if (hasMounted.current) return;
    //     console.log("Game useEffect", jump_spritesheet_url);
    //     hasMounted.current = true;
    //     let isGameRunning = false;
    //     setIsGameRunning(true);
    //     if(idle_spritesheet_url && jump_spritesheet_url) start_game(running_spritesheet_url, idle_spritesheet_url, jump_spritesheet_url);

    //     return () => {
    //         if (isGameRunning) {

    //         }
    //     };
    // }, [jump_spritesheet_url]);

    useEffect(() => {
        if (urlsGenerated) {
            console.log("Game useEffect", urlsGenerated);
            const drawingID = GetDrawingIdQueryParam();
            const urls = generateUrls(drawingID);
    
            if (urls) {
                start_game(urls);
            }
        }
        else {
            setUrlGenerated(true);
        }
    }, [urlsGenerated]);
    return (
        <div>
            <div ref={gameContainerRef} id="game"></div>
        </div>
    );
};

export default Game;
