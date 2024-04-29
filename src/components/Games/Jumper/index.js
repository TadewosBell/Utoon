import React, { useEffect, useRef, useState } from 'react';
import * as ex from "excalibur";
import { useDispatch, useSelector } from 'react-redux';
import { initialize_game } from './main.js';


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
        const running_spritesheet_url = `https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/${drawingID}_Running_sprite_sheet.png`;
        return {
            running_spritesheet_url,
        }
    }


    const start_game = async (urls) => {
        console.log(urls)
        const game = await initialize_game(urls);
        const loader = new ex.Loader();
        loader.suppressPlayButton = true;
        game.start(loader, gameContainerRef.current);
    }

    useEffect(() => {
        if (urlsGenerated) {
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
