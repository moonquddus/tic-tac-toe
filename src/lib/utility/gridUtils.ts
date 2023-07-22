import { GridCellType, GridType } from '../atoms/gridState'

export function insertValueIntoGrid(grid: GridType, row: number, col: number, value: GridCellType): GridType {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
    throw new Error('Invalid coordinates. Out of bounds.')
  }

  // Spread only makes a shallow copy, so I have to do it the ol' fashioned way
  const newGrid: GridType = JSON.parse(JSON.stringify(grid))

  newGrid[row][col] = value
  return newGrid
}
