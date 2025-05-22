/*
The way this works is the data that was originally in playergrid/targetgrid has been moved over to here.
this is because those classes dont really need that data and this file which will continously be checking the state of the game to find the winner
needs that data! That's why the code was transferred here.

When importing, youre not importing the class per say, but the methods that u can use.
So for example, we import gentargetgrid, etc and thos are methods we can use. We dont import the class as a whole (so if i import playergrid i cant just do playergrid[i])
i have to move the data over so i can use it. 
*/

import React, { useEffect, useState } from 'react';
import { 
    generateTargetGrid, 
    shuffle, 
    getGameTiles,
    locateEmpty,
    isAdjacentToEmpty,
    getInnerGrid,
    arraysEqual,
    getAdjacentFlatIndex,
    type direction
} from '../assets/utils';
import PlayerGrid from './PlayerGrid';
import TargetGrid from './TargetGrid';

// Replace magic numbers (5) with these constants
let NUM_ROWS = 5;
let NUM_COLS = 5;

const OnePlayerGame: React.FC = () => {

    const [playerTiles, setPlayerTiles] = useState(shuffle(getGameTiles()))
    const [emptyPos, setEmptyPos] = useState(locateEmpty(playerTiles))
    const [targetTiles, setTargetTiles] = useState(generateTargetGrid())
    const [gameWon, setGameWon] = useState(false)
    const [moveCount, setMoveCount] = useState(0)

    const checkWin = () => {
        let inner = getInnerGrid(playerTiles);
        let innerColors = inner.map((value) => value.color);
        let targetColors = targetTiles.map((value) => value.color);
        if (arraysEqual(innerColors, targetColors)) {
            console.log("You Won");
            setGameWon(true);
        }
    }

    useEffect(() => {
        checkWin();
    }, [playerTiles])

    useEffect(() => {

        // Handler
        const handler = (event: KeyboardEvent) => {

            let dir: direction = undefined;
            // Move empty space in OPPOSITE direction of keypress
            // TODO
            // Use method 'getAdjacentFlatIndex' from utils with 'swapWithEmpty' 
            // event.key contains string of pressed key
            switch (event.key) {
                case "ArrowLeft":
                    dir = 'right'
                    break;
                case "ArrowRight":
                    dir = 'left'
                    break;
                case "ArrowUp":
                    dir = 'down'
                    break;
                case "ArrowDown":
                    dir = 'up'
                    break;
                default:
                    // Optionally handle other keys or do nothing
                    break;
            }
            
            if(dir) {
                // TO prevent scroll
                event.preventDefault();
                swapWithEmpty(getAdjacentFlatIndex(emptyPos, dir, NUM_ROWS, NUM_COLS))
            }
        };
        
        // Event Listener
        window.addEventListener('keydown', handler);

        // Clean up on umount
        return () => {
            window.removeEventListener('keydown', handler); // Clean up on unmount
        };
    })

    const swapWithEmpty = (pos: number) => {

        // getAdjacentFlatIndex returns -1 when there the adjacent cell in
        // the specified direction is out of bounds. We still want to use this
        // method, so add a condition on pos
        if(pos >= 0 && pos < NUM_ROWS * NUM_COLS) {

            let newPlayerTiles = [...playerTiles];

            // Swap
            let temp = newPlayerTiles[pos];
            newPlayerTiles[pos] = newPlayerTiles[emptyPos];
            newPlayerTiles[emptyPos] = temp;
    
            // Update
            setPlayerTiles(newPlayerTiles);
            setEmptyPos(pos);

            // update amount of moves
            setMoveCount(moveCount + 1);
        }
    }

    const tileClickHandler = (pos: number) => {
        if(isAdjacentToEmpty(pos, emptyPos, NUM_ROWS, NUM_COLS)) {
            swapWithEmpty(pos);
        }
    }

    return (
        <>
            <PlayerGrid 
            tiles={playerTiles} 
            tileClickHandler={tileClickHandler} />
            <TargetGrid tiles={targetTiles} /> 
            <hr/>
            {
                gameWon ? (
                    <div>we did it boys</div>
                ) : (
                    <></>
                )
            }
            <div>Moves: {moveCount}</div>
            
        </>
    );
};

export default OnePlayerGame;