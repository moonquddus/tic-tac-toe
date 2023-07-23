import { GridType } from '../atoms/gridState'
import { TIC_TAC_TOE_SYMBOL, TurnActionType, getAllSymbols } from '../model'
import { getRandomEntryFromArray } from '../utility/arrayUtils'
import { findGameCompletingTurns } from '../utility/gameUtils'
import { getAvailablePositions } from '../utility/gridUtils'


export function useStandardComputer(grid: GridType, availableSymbols: TIC_TAC_TOE_SYMBOL[]){
  const makeMove = () => {
    const allCompletingTurns = findGameCompletingTurns(grid, getAllSymbols())
    return makeWinningMove(allCompletingTurns) || makeDefensiveMove(allCompletingTurns) || makeRandomMove()
  }

  const makeWinningMove = (completingTurns: TurnActionType[]): TurnActionType | null => {
    console.log('AVAILABLE SYMBOLS', availableSymbols)
    const ownWinningMoves = completingTurns.filter(([_row, _col, symbol]) => availableSymbols.includes(symbol))
    console.log('OWN WINNING MOVES', ownWinningMoves)
    if (ownWinningMoves.length === 0) return null
    return getRandomEntryFromArray(ownWinningMoves)
  }

  const makeDefensiveMove = (completingTurns: TurnActionType[]): TurnActionType | null => {
    const enemyWinningTurns = completingTurns.filter(([_row, _col, symbol]) => !availableSymbols.includes(symbol))
    if (enemyWinningTurns.length === 0) return null

    const [row, col] = getRandomEntryFromArray(enemyWinningTurns)
    return [row, col, getRandomEntryFromArray(availableSymbols)]
  }

  const makeRandomMove = (): TurnActionType => {
    const position = getRandomEntryFromArray(getAvailablePositions(grid))
    const symbol = getRandomEntryFromArray(availableSymbols)
    return [position.row, position.col, symbol]
  }

  return makeMove
}
