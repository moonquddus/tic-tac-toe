import { GridCellType, GridType } from '../atoms/gridState'

export function cloneGrid(grid: GridType): GridType {
  // Spread only makes a shallow copy, so I have to do it the ol' fashioned way
  return JSON.parse(JSON.stringify(grid))
}

export function insertValueIntoGrid(grid: GridType, row: number, col: number, value: GridCellType): GridType {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
    throw new Error('Invalid coordinates. Out of bounds.')
  }

  const newGrid = cloneGrid(grid)

  newGrid[row][col] = value
  return newGrid
}

export function isGridEmpty(grid: GridType): boolean {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] !== null) {
        return false
      }
    }
  }
  return true
}

export function hasLineBeenMade(grid: GridType): boolean {
  const size = grid.length

  // Check rows
  for (let row = 0; row < size; row++) {
    const firstElement = grid[row][0]
    if (firstElement === null) continue
    
    let isRowEqual = true
    for (let col = 1; col < size; col++) {
      if (grid[row][col] !== firstElement) {
        isRowEqual = false
        break
      }
    }
    if (isRowEqual) {
      return true // X in a row
    }
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    const firstElement = grid[0][col]
    if (firstElement === null) continue

    let isColumnEqual = true
    for (let row = 1; row < size; row++) {
      if (grid[row][col] !== firstElement) {
        isColumnEqual = false
        break
      }
    }
    if (isColumnEqual) {
      return true // X in a column
    }
  }

  // Check diagonals
  let firstElement = grid[0][0]
  let isDiagonalEqual = false
  
  if (firstElement !== null){
    isDiagonalEqual = true
    for (let i = 1; i < size; i++) {
      if (grid[i][i] !== firstElement) {
        isDiagonalEqual = false
        break
      }
    }
    if (isDiagonalEqual) {
      return true // X in the main diagonal
    }
  }

  firstElement = grid[0][size - 1]
  if (firstElement !== null){
    isDiagonalEqual = true
    for (let i = 1; i < size; i++) {
      if (grid[i][size - 1 - i] !== firstElement) {
        isDiagonalEqual = false
        break
      }
    }
    if (isDiagonalEqual) {
      return true // X in the anti-diagonal
    }
  }

  return false
}

export function getAvailablePositions(grid: GridType) {
  const availablePositions = []
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === null) {
        availablePositions.push({ row, col })
      }
    }
  }
  return availablePositions
}
