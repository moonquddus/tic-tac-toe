import { GridType } from '../../atoms/gridState'
import { TIC_TAC_TOE_SYMBOL } from '../../model'
import { cloneGrid } from '../gridUtils'

const {NOUGHT, CROSS} = TIC_TAC_TOE_SYMBOL

export function createEmptyGrid(): GridType {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]
}

export function createPartiallyFilledGrid(): GridType {
  return [
    [NOUGHT, null, null],
    [null, null, CROSS],
    [null, CROSS, null],
  ]
}

export function createWinnableGridForNoughts(): GridType {
  return [
    [NOUGHT, null, null],
    [null, NOUGHT, CROSS],
    [null, CROSS, null],
  ]
}

export function createWinnableGridForCrosses(): GridType {
  return [
    [NOUGHT, null, null],
    [null, CROSS, CROSS],
    [null, CROSS, null],
  ]
}

export function createWinnableGridForBoth(): GridType {
  return [
    [NOUGHT, NOUGHT, null],
    [null, CROSS, CROSS],
    [null, null, null],
  ]
}

export function createWinningRowGrid(): GridType {
  return [
    [NOUGHT, NOUGHT, NOUGHT],
    [null, null, CROSS],
    [null, CROSS, null],
  ]
}

export function createWinningColGrid(): GridType {
  return [
    [null, NOUGHT, null],
    [null, NOUGHT, CROSS],
    [CROSS, NOUGHT, null],
  ]
}

export function createWinningDiagGrid(): GridType {
  return [
    [NOUGHT, null, null],
    [null, NOUGHT, CROSS],
    [null, CROSS, NOUGHT],
  ]
}

export function createWinningAntiDiagGrid(): GridType {
  return [
    [null, null, NOUGHT],
    [null, NOUGHT, CROSS],
    [NOUGHT, CROSS, null],
  ]
}

export function createDrawnGrid(): GridType {
  return [
    [CROSS, CROSS, NOUGHT],
    [NOUGHT, NOUGHT, CROSS],
    [CROSS, NOUGHT, NOUGHT],
  ]
}

export function manuallyInjectIntoGrid(grid: GridType, row: number, col: number, symbol: TIC_TAC_TOE_SYMBOL): GridType {
  const newGrid = cloneGrid(grid)
  newGrid[row][col] = symbol
  return newGrid
}
