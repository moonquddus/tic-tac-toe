import BaseGame from '../BaseGame/BaseGame'
import { MouseEventHandler, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import { isOdd } from '../../../lib/utility/numberUtils'
import GameHeader from '../GameHeader/GameHeader'
import { TIC_TAC_TOE_SYMBOL } from '../../../lib/model'

function WildGame(){
  const navigate = useNavigate()

  const [currentGameState, setGameState] = useRecoilState(gameState)
  const { gameStatus, turn, selectedSymbol } = currentGameState

  const currentPlayerTurn = useMemo(() => {
    return isOdd(turn) ? 1 : 2
  }, [turn])

  const setSymbol = (symbol: TIC_TAC_TOE_SYMBOL): void => {
    setGameState({
      ...currentGameState,
      selectedSymbol: symbol
    })
  }

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
                defaultChecked={selectedSymbol === symbol} 
                onClick={() => setSymbol(symbol)}
              /> {symbol}
            </label>
          ))}
        </fieldset>
      </form>

      <BaseGame />

      <button onClick={onExitButtonClick}>Exit game</button>
    </div>
  )
}

export default WildGame
