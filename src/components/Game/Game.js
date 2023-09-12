// rander excalibur game in react component 
import React, { useEffect } from 'react';
import { loader } from "./resources.js";
import game from './main.js';


const Game = (props) => {
    useEffect(() => {
        // Set background color
        game.start(loader)
        return () => {
            game.stop();
        };
    }, []);
    return (
    <div>
        <h1>The Game</h1>
        <div id="game">
        </div>
    </div>
    );
};
export default Game;