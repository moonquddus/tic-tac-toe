import { useRecoilState, useRecoilValue } from 'recoil'
import GameGrid from '../GameGrid/GameGrid'
import { gridState } from '../../../lib/atoms/gridState'
import { insertValueIntoGrid, isGridEmpty } from '../../../lib/utility/gridUtils'
import { useEffect, useMemo } from 'react'
import { isOdd } from '../../../lib/utility/numberUtils'
import { gameState } from '../../../lib/atoms/gameState'
import { winModeState } from '../../../lib/atoms/winModeState'
import { winModeMap } from '../../../lib/gameConfig'
import { TIC_TAC_TOE_SYMBOL, TurnActionType } from '../../../lib/model'
import { gameModeState } from '../../../lib/atoms/gameModeState'

interface BaseGameProps {
  symbol: TIC_TAC_TOE_SYMBOL
  onComputerTurn: () => TurnActionType
}

function BaseGame({symbol, onComputerTurn}: BaseGameProps) {
  const [grid, setGrid] = useRecoilState(gridState)
  const [currentGameState, setGameState] = useRecoilState(gameState)
  const { turn, gameStatus } = currentGameState
  
  const gameMode = useRecoilValue(gameModeState)

  const winMode = useRecoilValue(winModeState)
  const hasGameBeenCompleted = winModeMap[winMode]

  const gridIsEmpty = useMemo(() => {
    if (turn > 1) return false
    return isGridEmpty(grid)
  }, [grid, turn])

  useEffect(() => {
    if (turn > Math.pow(grid.length, 2) && gameStatus === 'active'){
      setGameState({
        ...currentGameState,
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

    const winner = hasGameBeenCompleted({grid, currentPlayerTurn})
    if (winner){
      setGameState({
        ...currentGameState,
        gameStatus: 'victory',
        winner: winner,
      })
      return
    }

    nextTurn()
  }, [grid])

  const currentPlayerTurn = useMemo(() => {
    return isOdd(turn) ? 1 : 2
  }, [turn])

  const nextTurn = () => {
    setGameState({
      ...currentGameState,
      turn: turn + 1,
    })
  }

  const completeTurn = (x: number, y: number, selectedSymbol = symbol) => {
    if (gameStatus !== 'active') return
    const newGrid = insertValueIntoGrid(grid, x, y, selectedSymbol)
    setGrid(newGrid)
  }

  return (
    <GameGrid grid={grid} onCellClick={completeTurn} />
  )
}

export default BaseGame
