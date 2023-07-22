import { useRecoilValue } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import BaseGame from '../BaseGame/BaseGame'
import { MouseEventHandler, useMemo } from 'react'
import { isOdd } from '../../../lib/utility/numberUtils'
import { useNavigate } from 'react-router-dom'

function StandardGame(){
  const navigate = useNavigate()

  const currentGameState = useRecoilValue(gameState)
  const { gameStatus, turn } = currentGameState

  const currentPlayerTurn = useMemo(() => {
    return isOdd(turn) ? 1 : 2
  }, [turn])

  const onExitButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // TODO (someday...): add a warning modal if you're about to leave in the middle of a game
    event.preventDefault()
    navigate('/')
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

      <BaseGame />

      <button onClick={onExitButtonClick}>Exit game</button>
    </div>
  )
}

export default StandardGame