import { atom } from 'recoil'
import { TIC_TAC_TOE_SYMBOL } from '../model'

export type GridCellType = TIC_TAC_TOE_SYMBOL | null

// I'm using tuples here to limit the array to a max of 3
export type GridRowType = [GridCellType, GridCellType, GridCellType]

export type GridType = [GridRowType, GridRowType, GridRowType]

export const GRID_STATE_ID = 'gridState'

export const gridState = atom<GridType>({
  key: GRID_STATE_ID,
  default: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]
})
