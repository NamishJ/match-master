import type { TileData } from "./Tile";
import TileGrid from "./TileGrid";
import styles from './PlayerGrid.module.css'

interface PlayerGridProps {
    tiles: TileData[];
    tileClickHandler: (pos: number) => void;
    className?: string
}

function PlayerGrid({ tiles, tileClickHandler, className }: PlayerGridProps) {
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
      className={className}
      >
        <div className={styles['overlay-grid']}>
            <div className={styles['glow-overlay']}></div>
        </div>
      </TileGrid>
    )
  
}
  
export default PlayerGrid;
  