import { GridType } from '../atoms/gridState'
import { WinModeType } from '../atoms/winModeState'
import { TIC_TAC_TOE_SYMBOL, TurnActionType } from '../model'
import { getRandomEntryFromArray, getUniqueArrayEntries } from '../utility/arrayUtils'
import { findGameCompletingTurns } from '../utility/gameUtils'
import { getAvailablePositions } from '../utility/gridUtils'

export function useComputerPlayer(grid: GridType, availableSymbols: TIC_TAC_TOE_SYMBOL[], winMode: WinModeType){
  const makeTurn = (): TurnActionType => {
    // TODO: I think it might be kinda cool to make the player wait a bit with a setTimeout
    // Makes the CPU seem more realistic
    const completingTurns = findGameCompletingTurns(grid, availableSymbols)
    if (completingTurns.length === 0)
      return makeRandomMove()

    return winMode === 'standard' ? makeWinningMove(completingTurns) : makeLossAvoidingMove(completingTurns)
  }

  const makeWinningMove = (completingTurns: TurnActionType[]): TurnActionType => {
    // TODO: This is an optimistic/self-centered win check for standard mode
    // We should have some competitive logic to stop Player 1 from winning
    return getRandomEntryFromArray(completingTurns)
  }

  const makeLossAvoidingMove = (completingTurns: TurnActionType[]): TurnActionType => {
    const allPossibleActions = getAvailablePositions(grid).flatMap(position => {
      return availableSymbols.map(symbol => {
        return [position.row, position.col, symbol]
      })
    }) as TurnActionType[] // I know, I hate type casting too haha

    const validActions = getUniqueArrayEntries(allPossibleActions, completingTurns)
    if (validActions.length === 0)
      return makeRandomMove()

    return getRandomEntryFromArray(validActions)
  }

  const makeRandomMove = (): TurnActionType => {
    const position = getRandomEntryFromArray(getAvailablePositions(grid))
    const symbol = getRandomEntryFromArray(availableSymbols)
    return [position.row, position.col, symbol]
  }

  return makeTurn
}
