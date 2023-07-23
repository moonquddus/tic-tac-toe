import { GridType } from '../atoms/gridState'
import { CompleteLinePayload, TIC_TAC_TOE_SYMBOL, TurnActionType } from '../model'
import { cloneGrid, getCompleteLine } from './gridUtils'

export type WinConditionFunctionPayload = {
  grid: GridType
  currentPlayerTurn: 1 | 2
}

export type WinConditionReturnType = null | {
  winner: 1 | 2
  completingLine: CompleteLinePayload
}

export function checkStandardWinCondition({grid, currentPlayerTurn}: WinConditionFunctionPayload): WinConditionReturnType {
  const completingLine = getCompleteLine(grid)
  if (completingLine === null) return completingLine

  return {
    winner: currentPlayerTurn,
    completingLine,
  }
}

export function checkMisereWinCondition({grid, currentPlayerTurn}: WinConditionFunctionPayload): WinConditionReturnType {
  const completingLine = getCompleteLine(grid)
  if (completingLine === null) return completingLine

  return {
    winner: currentPlayerTurn === 1 ? 2 : 1,
    completingLine
  }
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
          if (getCompleteLine(newGrid) !== null){
            completingTurns.push([row, col, symbol])
          }
        })
      }
    }
  }

  return completingTurns
}
