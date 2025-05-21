import React from "react";
import type { TileData } from "./Tile";
import TileGrid from "./TileGrid";
import './PlayerGrid.css'

interface PlayerGridProps {
    tiles: TileData[];
    tileClickHandler: (pos: number) => void;
}

function PlayerGrid({ tiles, tileClickHandler }: PlayerGridProps) {
    // function names

    // Motion animates based on react key. We cannot update key 
    // based on index because keys need to be consistent across
    // states. Therefore, we can use uniquely assigned ids
    // that stay the same for each piece regardless of its location.

    return (
      <TileGrid
      tiles={tiles}
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
  