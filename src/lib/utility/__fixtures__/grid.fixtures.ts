import { GridType } from '../../atoms/gridState'
import { TIC_TAC_TOE_SYMBOL } from '../../model'

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

export function createWinningGrid(): GridType {
  return [
    [NOUGHT, null, null],
    [null, NOUGHT, CROSS],
    [null, CROSS, NOUGHT],
  ]
}
