/*
The way this works is the data that was originally in playergrid/targetgrid has been moved over to here.
this is because those classes dont really need that data and this file which will continously be checking the state of the game to find the winner
needs that data! That's why the code was transferred here.

When importing, youre not importing the class per say, but the methods that u can use.
So for example, we import gentargetgrid, etc and thos are methods we can use. We dont import the class as a whole (so if i import playergrid i cant just do playergrid[i])
i have to move the data over so i can use it. 
*/

import React, { useState } from 'react';
import { 
    generateTargetGrid, 
    shuffle, 
    getGameTiles,
    locateEmpty,
    isAdjacentToEmpty,
    getInnerGrid,
    arraysEqual
} from '../assets/utils';
import PlayerGrid from './PlayerGrid';
import TargetGrid from './TargetGrid';
import type { TileData } from './Tile';


const OnePlayerGame: React.FC = () => {

    const [playerTiles, setPlayerTiles] = useState(shuffle(getGameTiles()))
    const [emptyPos, setEmptyPos] = useState(locateEmpty(playerTiles))
    const [targetTiles, setTargetTiles] = useState(generateTargetGrid())
    const [gameWon, setGameWon] = useState(false)

    getInnerGrid(playerTiles);
    const tileClickHandler = (pos: number) => {
        // idx [0-24]
        if(isAdjacentToEmpty(pos, emptyPos)) {
            let newPlayerTiles = [...playerTiles];

            // Swap
            let temp = newPlayerTiles[pos];
            newPlayerTiles[pos] = newPlayerTiles[emptyPos];
            newPlayerTiles[emptyPos] = temp;

            // Update
            setPlayerTiles(newPlayerTiles);
            setEmptyPos(pos);

            // Check Win Condition
            let inner = getInnerGrid(newPlayerTiles);
            let innerColors = inner.map((value) => value.color);
            let targetColors = targetTiles.map((value) => value.color);
            if (arraysEqual(innerColors, targetColors)) {
                console.log("You Won");
                setGameWon(true);
            }
        }
    }


    return (
        <>
            <PlayerGrid 
            tiles={playerTiles} 
            tileClickHandler={tileClickHandler} />
            <TargetGrid tiles={targetTiles} /> 
            <br></br>
            {
                gameWon ? (
                    <div>we did it boys</div>
                ) : (
                    <></>
                )
            }
        </>
    );
};

export default OnePlayerGame;