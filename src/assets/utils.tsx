import { TILE_COLORS, type TileData } from "../components/Tile";

export type direction = 'up'|'down'|'left'|'right'|undefined;

export function getGameTiles(includeEmpty: boolean = true): Array<TileData> {
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
    if(includeEmpty) {
        pieces.push({
            id: pieces.length,
            color: 'empty'
        });
    }

    return pieces;
}

export function shuffle<T>(arr: Array<T>) {

    for (let i = arr.length - 1; i > 0; i--) {
        let randIdx = Math.floor(Math.random() * i);

        let temp = arr[i];
        arr[i] = arr[randIdx];
        arr[randIdx] = temp;
    }

    return arr;
}

export function locateEmpty(arr: Array<TileData>) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].color == 'empty') {
            return i;
        }
    }
    return -1;
}

export function coordinatesFromFlatIndex(
    pos: number,
    numRows: number,
    numCols: number
): [number, number] {
    let row = Math.floor(pos / numRows)
    let col = pos % numCols
    return [row, col];
}

export function isAdjacentToEmpty(
    pos: number, 
    emptyPos: number,
    numRows: number,
    numCols: number
) {

    // "Tuple unpacking" syntax. 
    let [posRow, posCol] = coordinatesFromFlatIndex(pos, numRows, numCols);
    let [emptyPosRow, emptyPosCol] = coordinatesFromFlatIndex(emptyPos, numRows, numCols);

    let sameRow = posRow == emptyPosRow;
    let sameCol = posCol == emptyPosCol;
    let adjCol = posCol == emptyPosCol - 1 || posCol == emptyPosCol + 1
    let adjRow = posRow == emptyPosRow - 1 || posRow == emptyPosRow + 1

    return (sameRow && adjCol) || (sameCol && adjRow);
}

export function getAdjacentFlatIndex(
    pos: number, 
    dir: direction,
    numRows: number,
    numCols: number) {
    /* 
    Returns index of cell adjacent to {pos} in {direction}.
    Returns -1 if out of bounds.
    */
    let [r, c] = coordinatesFromFlatIndex(pos, numRows, numCols);

    switch(dir) {
        case 'left': 
            c--
            break;
        case 'right':
            c++
            break;
        case 'up':
            r--
            break;
        case 'down':
            r++
            break;
        default:
            return -1
    }

    if ((r < 0) || (r >= numRows) || (c < 0) || (c >= numCols)) {
        return -1;
    }

    let flatIndex =  r * numCols + c;
   
    return flatIndex;
}

export function rollDie(start: number, numSides: number): number {
    return Math.floor(Math.random() * numSides) + start;
}

export function generateTargetGrid(): TileData[] {
    return shuffle(getGameTiles(false)).splice(0, 9);
}

export function getInnerGrid(tiles: TileData[]) {
    let innerIndices = [6, 7, 8, 11, 12, 13, 16, 17, 18];
    const subset = innerIndices.map(index => tiles[index]);
    return subset;
}

// Ts have to be same across the board
export function arraysEqual<T>(a: T[], b: T[]): boolean {
    if (a.length == b.length) {
        return a.every((value, index) => value === b[index]);
    }
    return false;
}