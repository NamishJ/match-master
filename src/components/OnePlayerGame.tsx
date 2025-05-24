/*
The way this works is the data that was originally in playergrid/targetgrid has been moved over to here.
this is because those classes dont really need that data and this file which will continously be checking the state of the game to find the winner
needs that data! That's why the code was transferred here.

When importing, youre not importing the class per say, but the methods that u can use.
So for example, we import gentargetgrid, etc and thos are methods we can use. We dont import the class as a whole (so if i import playergrid i cant just do playergrid[i])
i have to move the data over so i can use it. 
*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
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
import Timer from './Timer';
import { useSwipeable } from 'react-swipeable';
import styles from './OnePlayerGame.module.css'


// Replace magic numbers (5) with these constants
let NUM_ROWS = 5;
let NUM_COLS = 5;



const OnePlayerGame: React.FC = () => {

    const navigate = useNavigate();

    const [playerTiles, setPlayerTiles] = useState(shuffle(getGameTiles()))
    const [emptyPos, setEmptyPos] = useState(locateEmpty(playerTiles))
    const [targetTiles, setTargetTiles] = useState(generateTargetGrid())
    const [gameWon, setGameWon] = useState(false)
    const [moveCount, setMoveCount] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [hasGameStarted, setHasGameStarted] = useState(false);
    

    const resetGame = () => {
        const newTiles = shuffle(getGameTiles());
    
        setPlayerTiles(newTiles);
        setEmptyPos(locateEmpty(newTiles));
        setTargetTiles(generateTargetGrid());
        setGameWon(false);
        setMoveCount(0);
        setTime(0);
        setIsTimerRunning(false);
        setHasGameStarted(false);
    }

    const checkWin = () => {
        let inner = getInnerGrid(playerTiles);
        let innerColors = inner.map((value) => value.color);
        let targetColors = targetTiles.map((value) => value.color);
        if (arraysEqual(innerColors, targetColors)) {
            console.log("You Won");
            setGameWon(true);
            setIsTimerRunning(false);
        }
        
    }

    useEffect(() => {
        checkWin();
    }, [playerTiles])

    // Swipe/KB Handler Helper
    const fillEmptyTileFromDirection = (dir: direction) => {
        if (gameWon) {
            return;
        }
        swapWithEmpty(getAdjacentFlatIndex(emptyPos, dir, NUM_ROWS, NUM_COLS));
    }

    // Keyboard Event Handlers
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
                fillEmptyTileFromDirection(dir);
            }
        };
        
        // Event Listener
        window.addEventListener('keydown', handler);

        // Clean up on umount
        return () => {
            window.removeEventListener('keydown', handler); // Clean up on unmount
        };
    })

    // Swipe Event Handlers (Added directly to game wrapper div)
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => fillEmptyTileFromDirection('right'),
        onSwipedRight: () => fillEmptyTileFromDirection('left'),
        onSwipedUp: () => fillEmptyTileFromDirection('down'),
        onSwipedDown: () => fillEmptyTileFromDirection('up'),
        preventScrollOnSwipe: true,
        trackTouch: true
      });

    const swapWithEmpty = (pos: number) => {
        // might be redundant but for extra net so that game does not cont after gameWon true
        if (gameWon) {
            return;
        }

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

            // start Timer maybe (first move dependency)
            if (!hasGameStarted) {
                setHasGameStarted(true);
                setIsTimerRunning(true);
            }
        }
    }

    const tileClickHandler = (pos: number) => {
        if (gameWon) {
            return;
        } 
        if(isAdjacentToEmpty(pos, emptyPos, NUM_ROWS, NUM_COLS)) {
            swapWithEmpty(pos);
        }
    }

    return (
        <>
            <div className={styles['game-wrapper']}>
                <div className={styles['target-grid-container']}>
                    <div className={styles['button-container']}>
                        <button onClick={() => navigate('/')}>Home</button>
                        <button onClick = {() => navigate('/leaderboard')}>Leaderboard</button>
                        <button onClick = {resetGame}>Reset</button>
                    </div>
                    <TargetGrid 
                    tiles={targetTiles}
                    className={styles['game-target-grid']}
                    /> 
                    {
                        gameWon ? (
                            <div className={styles['win-container']}>
                                we did it boys
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </div>
                <div  {...swipeHandlers} className={styles['player-grid-container']}>
                    <PlayerGrid 
                    tiles={playerTiles} 
                    tileClickHandler={tileClickHandler}
                    className={styles['game-player-grid']}
                    />
                    <div className={styles['hud']}>
                        <Timer 
                            isRunning={isTimerRunning}
                            time={time}
                            setTime={setTime}>
                        </Timer>
                        <p>Moves: {moveCount}</p> 
                    </div>
                </div>
            </div>           
        </>
    );
};

export default OnePlayerGame;