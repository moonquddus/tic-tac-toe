import BaseGame from '../BaseGame/BaseGame'
import { MouseEventHandler, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import { isOdd } from '../../../lib/utility/numberUtils'
import GameHeader from '../GameHeader/GameHeader'
import { TIC_TAC_TOE_SYMBOL } from '../../../lib/model'

function WildGame(){
  const navigate = useNavigate()

  const currentGameState = useRecoilValue(gameState)
  const { gameStatus, turn } = currentGameState
  const [selectedSymbol, setSymbol] = useState<TIC_TAC_TOE_SYMBOL>(TIC_TAC_TOE_SYMBOL.NOUGHT)

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
      <GameHeader />

      {gameStatus === 'active' && (
        <p>Turn: Player {currentPlayerTurn}</p>
      )}

      <form>
        <fieldset>
          <legend>Symbol:</legend>
          {[TIC_TAC_TOE_SYMBOL.NOUGHT, TIC_TAC_TOE_SYMBOL.CROSS].map(symbol => (
            <label key={`symbol-label-${symbol}`}>
              <input 
                type='radio' 
                name='symbol' 
                value={symbol} 
                defaultChecked={symbol === selectedSymbol} 
                onClick={() => setSymbol(symbol)}
              /> {symbol}
            </label>
          ))}
        </fieldset>
      </form>

      <BaseGame symbol={selectedSymbol} />

      <button onClick={onExitButtonClick}>Exit game</button>
    </div>
  )
}

export default WildGame
