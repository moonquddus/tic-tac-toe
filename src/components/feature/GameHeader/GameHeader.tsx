import { useRecoilValue } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'

function GameHeader(){
  const currentGameState = useRecoilValue(gameState)
  const { gameStatus, winner } = currentGameState

  return (
    <div>
      <h1>Lets Tic Tac Toe it out</h1>

      {gameStatus === 'victory' && (
        <p>Player {winner} wins!</p>  
      )}
    
      {gameStatus === 'draw' && (
        <p>Draw!</p>
      )}
    </div>
  )
}

export default GameHeader
