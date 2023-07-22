import { GridType } from '../atoms/gridState'
import { hasLineBeenMade } from './gridUtils'

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
