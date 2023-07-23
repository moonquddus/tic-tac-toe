import { GridType } from '../atoms/gridState'
import { TIC_TAC_TOE_SYMBOL, TurnActionType } from '../model'
import { cloneGrid, hasLineBeenMade } from './gridUtils'

type WinConditionFunctionPayload = {
  grid: GridType
  currentPlayerTurn: 1 | 2
}

type WinConditionReturnType = 1 | 2 | null

export function checkStandardWinCondition({grid, currentPlayerTurn}: WinConditionFunctionPayload): WinConditionReturnType {
  if (!hasLineBeenMade(grid)) return null

  return currentPlayerTurn
}

export function checkMisereWinCondition({grid, currentPlayerTurn}: WinConditionFunctionPayload): WinConditionReturnType {
  if (!hasLineBeenMade(grid)) return null

  return currentPlayerTurn === 1 ? 2 : 1
}

export function findGameCompletingTurns(grid: GridType, availableSymbols: TIC_TAC_TOE_SYMBOL[]): TurnActionType[] {
  const completingTurns: TurnActionType[] = []

  // Loops through every empty space, tries putting each symbol in there, and then checks if that is a winning combo
  // 99.9% chance there's optimisations to be made here
  // e.g we don't even need to check for lines that don't intersect that specific grid cell

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === null) {
        const newGrid = cloneGrid(grid)
        availableSymbols.forEach(symbol => {
          newGrid[row][col] = symbol
          if (hasLineBeenMade(newGrid)){
            completingTurns.push([row, col, symbol])
          }
        })
      }
    }
  }

  return completingTurns
}
