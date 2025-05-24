import type React from "react";
import { getRandColor } from "../assets/utils";
import type { JSX } from "react";
import { TILE_COLORS } from "./Tile";

function generateRubiksText(text: string): JSX.Element {
    /* Randomly assigns one of TILE_COLORS to each letter in string.
        Returns a JSXElement containing a series of spans containing single letters 
        with the appropriate colors. 
    */

    // TODO

    let numColors = TILE_COLORS.length;
    const coloredText = text.split('').map((char, index) => (
        <span 
        key={index} 
        style={{ color: getRandColor() }}
        >
            {char}
        </span>
    ))

    return (
        <>{coloredText}</>
    )
}

interface RubiksTextProps {
    className?: string
    text: string;
}

const RubiksText: React.FC<RubiksTextProps> = ({
    className,
    text
}: RubiksTextProps) => {

    const rubiksText = generateRubiksText(text);

    return (
        <div className={className || ''}>
            {rubiksText}
        </div>
    )

}

export default RubiksText;