import { atom } from 'recoil'
import { ArrayOfSize, TIC_TAC_TOE_SYMBOL } from '../model'

// I originally used tuples here to limit the array to a max of 3
// export type GridRowType = [GridCellType, GridCellType, GridCellType]
// But lets see if we can make it a bit more dynamic
export type GridType = ArrayOfSize<GridRowType, 3>
export type GridRowType = ArrayOfSize<GridCellType, 3>
export type GridCellType = TIC_TAC_TOE_SYMBOL | null

export const GRID_STATE_ID = 'gridState'

export const gridState = atom<GridType>({
  key: GRID_STATE_ID,
  default: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]
})
