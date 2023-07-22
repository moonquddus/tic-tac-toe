import BaseGame from '../BaseGame/BaseGame'
import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import { isOdd } from '../../../lib/utility/numberUtils'
import { TIC_TAC_TOE_SYMBOL } from '../../../lib/model'
import GameHeader from '../GameHeader/GameHeader'

function StandardGame(){
  const navigate = useNavigate()

  const currentGameState = useRecoilValue(gameState)
  const { gameStatus, turn } = currentGameState

  const currentPlayerTurn = isOdd(turn) ? 1 : 2
  const symbol = currentPlayerTurn === 1 ? TIC_TAC_TOE_SYMBOL.NOUGHT : TIC_TAC_TOE_SYMBOL.CROSS

  const onExitButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // TODO (someday...): add a warning modal if you're about to leave in the middle of a game
    event.preventDefault()
    navigate('/')
  }

  return (
    <div>
      <GameHeader />
      {gameStatus === 'active' && (
        <>
          <p>Turn: Player {currentPlayerTurn}</p>
          <p>Symbol: {symbol}</p>
        </>
      )}

      <BaseGame symbol={symbol} />

      <button onClick={onExitButtonClick}>Exit game</button>
    </div>
  )
}

export default StandardGame