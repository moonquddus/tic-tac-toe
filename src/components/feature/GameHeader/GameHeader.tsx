import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import { isOdd } from '../../../lib/utility/numberUtils'

function GameHeader(){
  const currentGameState = useRecoilValue(gameState)
  const { gameStatus, turn, winner } = currentGameState

  const currentPlayerTurn = useMemo(() => {
    return isOdd(turn) ? 1 : 2
  }, [turn])

  return (
    <div>
      <h1>Lets Tic Tac Toe it out</h1>

      {gameStatus === 'victory' && (
        <p>Player {winner} wins!</p>  
      )}
    
      {gameStatus === 'draw' && (
        <p>Draw!</p>
      )}
    
      {gameStatus === 'active' && (
        <p>Turn: Player {currentPlayerTurn}</p>
      )}
    </div>
  )
}

export default GameHeader
