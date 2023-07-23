import { useRecoilValue } from 'recoil'
import GameGrid from '../GameGrid/GameGrid'
import { useEffect, useMemo } from 'react'
import { isOdd } from '../../../lib/utility/numberUtils'
import { winModeState } from '../../../lib/atoms/winModeState'
import { winModeMap } from '../../../lib/gameConfig'
import { TIC_TAC_TOE_SYMBOL, TurnActionType } from '../../../lib/model'
import { gameModeState } from '../../../lib/atoms/gameModeState'
import { useGrid } from '../../../lib/hooks/useGrid'
import { useGame } from '../../../lib/hooks/useGame'

interface BaseGameProps {
  symbol: TIC_TAC_TOE_SYMBOL
  onComputerTurn: () => TurnActionType
}

function BaseGame({symbol, onComputerTurn}: BaseGameProps) {
  const { grid, addToGrid, gridIsEmpty } = useGrid()
  const { gameState, updateGame } = useGame()
  const { turn, gameStatus } = gameState

  const gameMode = useRecoilValue(gameModeState)

  const winMode = useRecoilValue(winModeState)
  const hasGameBeenCompleted = winModeMap[winMode].validation

  useEffect(() => {
    if (turn > Math.pow(grid.length, 2) && gameStatus === 'active'){
      updateGame({
        gameStatus: 'draw'
      })
      return
    }

    if (gameStatus === 'active' && gameMode === 'single-player' && currentPlayerTurn === 2){
      const [row, col, selectedSymbol] = onComputerTurn()
      completeTurn(row, col, selectedSymbol)
    }
  }, [turn])

  useEffect(() => {
    if (gridIsEmpty) return

    const gameResults = hasGameBeenCompleted({grid, currentPlayerTurn})
    if (gameResults !== null){
      const {winner, completingLine} = gameResults
      updateGame({
        gameStatus: 'victory',
        winner,
        completingLine,
      })
      return
    }

    nextTurn()
  }, [grid])

  const currentPlayerTurn = useMemo(() => {
    return isOdd(turn) ? 1 : 2
  }, [turn])

  const nextTurn = () => {
    updateGame({
      turn: turn + 1,
    })
  }

  const completeTurn = (x: number, y: number, selectedSymbol = symbol) => {
    if (gameStatus !== 'active') return
    addToGrid(x, y, selectedSymbol)
  }

  return (
    <GameGrid grid={grid} onCellClick={completeTurn} />
  )
}

export default BaseGame
