import { GridType } from '../atoms/gridState'
import { TIC_TAC_TOE_SYMBOL, TurnActionType, getAllSymbols } from '../model'
import { getRandomEntryFromArray, getUniqueArrayEntries } from '../utility/arrayUtils'
import { findGameCompletingTurns } from '../utility/gameUtils'
import { getAvailablePositions } from '../utility/gridUtils'


export function useMisereComputer(grid: GridType, availableSymbols: TIC_TAC_TOE_SYMBOL[]){
  const makeMove = () => {
    const allCompletingTurns = findGameCompletingTurns(grid, getAllSymbols())
    // this is a bit simpler than standard mode
    // would rather focus on not accidentally losing, instead of forcing the other player to lose
    return makeDefensiveMove(allCompletingTurns) || makeRandomMove()
  }

  const makeDefensiveMove = (completingTurns: TurnActionType[]): TurnActionType | null => {
    const allPossibleActions = getAvailablePositions(grid).flatMap(position => {
      return availableSymbols.map(symbol => {
        return [position.row, position.col, symbol]
      })
    }) as TurnActionType[] // I know, I hate type casting too haha

    // Make sure that each valid action is not a game-ending one
    const validActions = getUniqueArrayEntries(allPossibleActions, completingTurns)
    if (validActions.length === 0) return null

    return getRandomEntryFromArray(validActions)
  }

  const makeRandomMove = (): TurnActionType => {
    const position = getRandomEntryFromArray(getAvailablePositions(grid))
    const symbol = getRandomEntryFromArray(availableSymbols)
    return [position.row, position.col, symbol]
  }

  return makeMove
}
