import { useRecoilState } from 'recoil'
import GameGrid from '../../feature/GameGrid/GameGrid'
import { gridState } from '../../../lib/atoms/gridState'
import { insertValueIntoGrid } from '../../../lib/utility/gridUtils'
import { useMemo } from 'react'
import { isOdd } from '../../../lib/utility/numberUtils'
import { TIC_TAC_TOE_SYMBOL } from '../../../lib/model'
import { gameState } from '../../../lib/atoms/gameState'

function Game() {
  const [grid, setGrid] = useRecoilState(gridState)
  const [currentGameState, setGameState] = useRecoilState(gameState)

  const { turn } = currentGameState

  const currentPlayerTurn = useMemo(() => {
    return isOdd(turn) ? 'player1' : 'player2'
  }, [turn])

  const nextTurn = () => {
    setGameState({
      ...currentGameState,
      turn: turn + 1,
    })
  }

  const playerTurnHandler = (x: number, y: number) => {
    const symbol = currentPlayerTurn === 'player1' ? TIC_TAC_TOE_SYMBOL.NOUGHT : TIC_TAC_TOE_SYMBOL.CROSS
    const newGrid = insertValueIntoGrid(grid, x, y, symbol)
    setGrid(newGrid)
    nextTurn()
  }

  return (
    <div>
      Lets Tic Tac Toe it out
      <GameGrid grid={grid} onCellClick={playerTurnHandler} />
    </div>
  )
}

export default Game
