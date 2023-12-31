import { GridType } from '../atoms/gridState'
import { CompleteLinePayload } from '../model'

export function cloneGrid(grid: GridType): GridType {
  // Spread only makes a shallow copy, so I have to do it the ol' fashioned way
  return JSON.parse(JSON.stringify(grid))
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

export function getCompleteLine(grid: GridType): CompleteLinePayload | null {
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
      return {direction: 'row', position: row} // X in a row
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
      return {direction: 'col', position: col} // X in a column
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
      return {direction: 'diag'} // X in the main diagonal
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
      return {direction: 'anti-diag'} // X in the anti-diagonal
    }
  }

  return null
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
