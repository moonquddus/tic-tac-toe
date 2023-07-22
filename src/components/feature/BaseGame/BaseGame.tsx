import { useRecoilState, useRecoilValue } from 'recoil'
import GameGrid from '../GameGrid/GameGrid'
import { gridState } from '../../../lib/atoms/gridState'
import { insertValueIntoGrid, isGridEmpty } from '../../../lib/utility/gridUtils'
import { useEffect, useMemo } from 'react'
import { isOdd } from '../../../lib/utility/numberUtils'
import { TIC_TAC_TOE_SYMBOL } from '../../../lib/model'
import { gameState } from '../../../lib/atoms/gameState'
import { winModeState } from '../../../lib/atoms/winModeState'
import { winModeMap } from '../../../lib/gameConfig'

function BaseGame() {
  const [grid, setGrid] = useRecoilState(gridState)
  const [currentGameState, setGameState] = useRecoilState(gameState)
  const { turn, gameStatus } = currentGameState
  
  const winMode = useRecoilValue(winModeState)
  const hasGameBeenCompleted = winModeMap[winMode]

  const gridIsEmpty = useMemo(() => {
    if (turn > 1) return false
    return isGridEmpty(grid)
  }, [grid, turn])

  useEffect(() => {
    if (turn > 9 && gameStatus === 'active')
      setGameState({
        ...currentGameState,
        gameStatus: 'draw'
      })
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

  const playerTurnHandler = (x: number, y: number) => {
    if (gameStatus !== 'active') return
    const symbol = currentPlayerTurn === 1 ? TIC_TAC_TOE_SYMBOL.NOUGHT : TIC_TAC_TOE_SYMBOL.CROSS
    const newGrid = insertValueIntoGrid(grid, x, y, symbol)
    setGrid(newGrid)
  }

  return (
    <GameGrid grid={grid} onCellClick={playerTurnHandler} />
  )
}

export default BaseGame
