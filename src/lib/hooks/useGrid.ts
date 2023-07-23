import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { GridCellType, GridType, gridState } from '../atoms/gridState'
import { cloneGrid, isGridEmpty } from '../utility/gridUtils'
import { TIC_TAC_TOE_SYMBOL } from '../model'
import { useMemo } from 'react'
import { gameState } from '../atoms/gameState'

export function useGrid(){
  const [grid, setGrid] = useRecoilState(gridState)
  const resetGrid = useResetRecoilState(gridState)
  const { turn } = useRecoilValue(gameState)
  
  const addToGrid = (row: number, col: number, symbol: TIC_TAC_TOE_SYMBOL) => {
    try {
      const newGrid = insertValueIntoGrid(grid, row, col, symbol)
      setGrid(newGrid)
    } catch(err){
      console.error(err)
    }
  }

  const insertValueIntoGrid = (grid: GridType, row: number, col: number, value: GridCellType): GridType => {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      throw new Error('Invalid coordinates. Out of bounds.')
    }

    if (grid[row][col] !== null){
      throw new Error('Invalid coordinates. Cell is already populated')
    }
  
    const newGrid = cloneGrid(grid)
  
    newGrid[row][col] = value
    return newGrid
  }

  const gridIsEmpty = useMemo(() => {
    if (turn > 1) return false
    return isGridEmpty(grid)
  }, [grid, turn])

  return {grid, addToGrid, resetGrid, gridIsEmpty}
}
