import React from "react";
import { TILE_COLORS } from "./Tile";
import type { TileData } from "./Tile";
import { useState } from "react";
import TileGrid from "./TileGrid";
import './PlayerGrid.css'

function getGamePieces(): Array<TileData> {
    let pieces: Array<TileData> = [];

    for (let i = 0; i < TILE_COLORS.length; i++) {
        for (let x = 0; x < 4; x++) {
            let piece = {
                id: i * 4 + x,
                color: TILE_COLORS[i]
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

function shuffle<T>(arr: Array<T>) {

    for (let i = arr.length - 1; i > 0; i--) {
        let randIdx = Math.floor(Math.random() * i);

        let temp = arr[i];
        arr[i] = arr[randIdx];
        arr[randIdx] = temp;
    }

    return arr;
}

function locateEmpty(arr: Array<TileData>) {
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

function PlayerGrid() {
    // function names

    const [grid, setGrid] = useState(shuffle(getGamePieces()))
    const [emptyPos, setEmptyPos] = useState(locateEmpty(grid))

    const tileClickHandler = (pos: number) => {
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
      <TileGrid
      tiles={grid}
      numRows={5}
      numCols={5}
      tileClickHandler={tileClickHandler}
      >
        <div className='overlay-grid'>
            <div className="glow-overlay"></div>
        </div>
      </TileGrid>
    )
  
}
  
export default PlayerGrid;
  