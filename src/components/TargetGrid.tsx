import React, { useState } from 'react';
import { TILE_COLORS, type TileData } from './Tile';
import TileGrid from './TileGrid';

import './TargetGrid.css';
import { getGameTiles, shuffle } from '../assets/utils';

// Frame Scrambler
// There are 9 6-sided die
// Each one is rolled, and the index is mapped to a color in TILE_COLORS

interface TargetGridProps {
    tiles: TileData[];
}

function TargetGrid({ tiles }: TargetGridProps) {

    return (
        <TileGrid
        tiles={tiles}
        numRows={3}
        numCols={3}
        />
    );
};

export default TargetGrid;