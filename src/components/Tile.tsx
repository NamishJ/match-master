import { motion } from "motion/react";
import type { JSX } from "react";
import styles from './Tile.module.css'

// function names

// 1. interface makes new shape obj
// 2. SquareProps is the name of obj
// 3. color is the name of the string -
//    property and the component must get a -
//    color string type

export type TileColor = 'red'|'yellow'|'orange'|'white'|'blue'|'green'|'empty'|undefined;
export const TILE_COLORS: Array<TileColor> = [
    'red', 
    'green', 
    'blue', 
    'white', 
    'yellow', 
    'orange'
]

export interface TileData {
    id: number;
    color: TileColor;
}

/*
Props for the square (like attributes).
inMiddle checks to see if it is in 3x3 portion of the
grid and has a question mark to say that this 
prop/attribute is optional and is a string.
*/

interface TileProps {
    position: number;
    color: TileColor;
    clickHandler?: (pos: number) => void;
}

function Tile({ position, color, clickHandler }: TileProps): JSX.Element { 

    const tileStyle = color === 'empty' ? (
        {border: 'none'}
    ) : (
        {backgroundColor: color}
    )

    return (
        <motion.div 
        className={`${styles['tile']}`}
        style={tileStyle}
        layout
        // Try 'circOut', 'easeInOut', 'anticipate'
        transition={{ duration: 0.1, ease: 'easeOut'}}
        onClick={clickHandler ? () => clickHandler(position) : undefined}
        />
    )

}

export default Tile;
