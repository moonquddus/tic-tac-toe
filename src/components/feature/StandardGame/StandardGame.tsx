import BaseGame from '../BaseGame/BaseGame'
import { MouseEventHandler, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import { isOdd } from '../../../lib/utility/numberUtils'
import { TIC_TAC_TOE_SYMBOL } from '../../../lib/model'
import GameHeader from '../GameHeader/GameHeader'

function StandardGame(){
  const navigate = useNavigate()

  const [currentGameState, setGameState] = useRecoilState(gameState)
  const { gameStatus, turn, selectedSymbol } = currentGameState

  const currentPlayerTurn = useMemo(() => {
    return isOdd(turn) ? 1 : 2
  }, [turn])

  useEffect(() => {
    setGameState({
      ...currentGameState,
      selectedSymbol: currentPlayerTurn === 1 ? TIC_TAC_TOE_SYMBOL.NOUGHT : TIC_TAC_TOE_SYMBOL.CROSS
    })
  }, [currentPlayerTurn])

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
          <p>Symbol: {selectedSymbol}</p>
        </>
      )}

      <BaseGame />

      <button onClick={onExitButtonClick}>Exit game</button>
    </div>
  )
}

export default StandardGame