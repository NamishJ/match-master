import React from "react";
import Square from "./Square";
import type { CubeColor } from "./Square";
import './Grid.css'
import { useState } from "react";

interface GamePiece {
    id: number;
    color: CubeColor;
}

let colors: Array<CubeColor> = [
    'red', 
    'green', 
    'blue', 
    'white', 
    'yellow', 
    'orange'
]

function getGamePieces(): Array<GamePiece> {
    let pieces: Array<GamePiece> = [];

    for (let i = 0; i < colors.length; i++) {
        for (let x = 0; x < 4; x++) {
            let piece = {
                id: i * 4 + x,
                color: colors[i]
            }
            pieces.push(piece);
        }
    }

    // for empty square
    pieces.push({
        id: pieces.length,
        color: 'empty'
    });

    return pieces;
}

function shuffle(arr: Array<T>) {

    for (let i = arr.length - 1; i > 0; i--) {
        let randIdx = Math.floor(Math.random() * i);

        let temp = arr[i];
        arr[i] = arr[randIdx];
        arr[randIdx] = temp;
    }

    return arr;
}

function locateEmpty(arr: Array<GamePiece>) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].color == 'empty') {
            return i;
        }
    }
    return -1;
}

function isAdjacentToEmpty(pos: number, emptyPos: number) {

    let posRow = pos % 5;
    let posCol = Math.floor(pos / 5);
    let emptyPosRow = emptyPos % 5;
    let emptyPosCol = Math.floor(emptyPos / 5);

    let sameRow = posRow == emptyPosRow;
    let sameCol = posCol == emptyPosCol;
    let adjCol = posCol == emptyPosCol - 1 || posCol == emptyPosCol + 1
    let adjRow = posRow == emptyPosRow - 1 || posRow == emptyPosRow + 1

    return (sameRow && adjCol) || (sameCol && adjRow);
}

function Grid() {
    // function names

    const [grid, setGrid] = useState(shuffle(getGamePieces()))
    const [emptyPos, setEmptyPos] = useState(locateEmpty(grid))

    console.log(grid)

    const squareClicked = (pos: number) => {
        // idx [0-24]
        if(isAdjacentToEmpty(pos, emptyPos)) {
            let newGrid = [...grid];

            // Swap
            let temp = newGrid[pos];
            newGrid[pos] = newGrid[emptyPos];
            newGrid[emptyPos] = temp;

            // Update
            setGrid(newGrid);
            setEmptyPos(pos);
        }
    }

    // Motion animates based on react key. We cannot update key 
    // based on index because keys need to be consistent across
    // states. Therefore, we can use uniquely assigned ids
    // that stay the same for each piece regardless of its location.

    return (
      <div className='grid-wrapper'>
        <div className="main-grid">
            {grid.map((gamePiece: GamePiece, index: number) => (
                <Square 
                key={gamePiece.id}
                position={index}
                color={gamePiece.color} 
                clickHandler={squareClicked} 
                />
            ))}
        </div>
        <div className='overlay-grid'>
            <div className="glow-overlay"></div>
        </div>
      </div>
    )
  
}
  
export default Grid;
  