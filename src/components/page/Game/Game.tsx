import { useRecoilState } from 'recoil'
import GameGrid from '../../feature/GameGrid/GameGrid'
import { gridState } from '../../../lib/atoms/gridState'
import { checkGameHasBeenWon, insertValueIntoGrid, isGridEmpty } from '../../../lib/utility/gridUtils'
import { useEffect, useMemo } from 'react'
import { isOdd } from '../../../lib/utility/numberUtils'
import { TIC_TAC_TOE_SYMBOL } from '../../../lib/model'
import { gameState } from '../../../lib/atoms/gameState'

function Game() {
  const [grid, setGrid] = useRecoilState(gridState)
  const [currentGameState, setGameState] = useRecoilState(gameState)
  const { turn, gameStatus } = currentGameState

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

    if (checkGameHasBeenWon(grid)){
      setGameState({
        ...currentGameState,
        gameStatus: 'victory'
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
    <div>
      <h1>Lets Tic Tac Toe it out</h1>
      
      {gameStatus === 'victory' && (
        <p>Player {currentPlayerTurn} wins!</p>  
      )}

      {gameStatus === 'draw' && (
        <p>Draw!</p>
      )}

      {gameStatus === 'active' && (
        <p>Turn: Player {currentPlayerTurn}</p>
      )}

      <GameGrid grid={grid} onCellClick={playerTurnHandler} />
    </div>
  )
}

export default Game
