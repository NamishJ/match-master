import type { TileData } from './Tile';
import TileGrid from './TileGrid';
// import styles from './TargetGrid.module.css';

// Frame Scrambler
// There are 9 6-sided die
// Each one is rolled, and the index is mapped to a color in TILE_COLORS

interface TargetGridProps {
    tiles: TileData[];
    className?: string
}

function TargetGrid({ tiles, className }: TargetGridProps) {

    return (
        <TileGrid
        className={className}
        tiles={tiles}
        numRows={3}
        numCols={3}
        />
    );
};

export default TargetGrid;