import React from "react";
import { motion } from "motion/react";
import type { JSX } from "react";
import './Square.css'
// function names

// 1. interface makes new shape obj
// 2. SquareProps is the name of obj
// 3. color is the name of the string -
//    property and the component must get a -
//    color string type

export type CubeColor = 'red'|'yellow'|'orange'|'white'|'blue'|'green'|'empty'|undefined;

/*
Props for the square (like attributes).
inMiddle checks to see if it is in 3x3 portion of the
grid and has a question mark to say that this 
prop/attribute is optional and is a string.
*/
interface SquareProps {
    position: number;
    color: CubeColor;
    clickHandler: (pos: number) => void;
}

function Square({ position, color, clickHandler }: SquareProps): JSX.Element { 

    return (
        <motion.div 
        className={`square ${color ? `bg-${color}` : ''}`}
        layout
        // Try 'circOut', 'easeInOut', 'anticipate'
        transition={{ duration: 0.1, ease: 'easeOut'}}
        onClick={() => clickHandler(position)}
        />
    )

}

export default Square;
