import React from "react";
import type { TileData } from "./Tile";
import type { JSX } from "react";
import Tile from "./Tile";
import styles from './TileGrid.module.css'

interface GridProps {
    tiles: TileData[];
    numRows: number;
    numCols: number;
    tileClickHandler?: (pos: number) => void;
    children?: React.ReactNode;
    className?: string
}

function TileGrid({ 
    tiles, 
    numRows, 
    numCols, 
    tileClickHandler, 
    children,
    className
}: GridProps): JSX.Element {
    // function names

    // Equal width squares aligned in a grid of size numRows x numCols

    let style = {
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
    };

    return (
      <div className={`${styles['grid-wrapper']} ${className || ''}`}>
        <div className={styles['main-grid']} style={style}>
            {tiles.map((tile: TileData, index: number) => (
                <Tile 
                key={tile.id}
                position={index}
                color={tile.color} 
                clickHandler={tileClickHandler || undefined} 
                />
            ))}
        </div>
        {children}
      </div>
    )
  
}
  
export default TileGrid;
  