import BaseGame from '../BaseGame/BaseGame'
import { useRecoilValue } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import { isOdd } from '../../../lib/utility/numberUtils'
import { TIC_TAC_TOE_SYMBOL } from '../../../lib/model'
import GameHeader from '../GameHeader/GameHeader'
import { useComputerPlayer } from '../../../lib/hooks/useComputerPlayer'
import { gridState } from '../../../lib/atoms/gridState'
import { winModeState } from '../../../lib/atoms/winModeState'
import GameFooter from '../GameFooter/GameFooter'

function StandardGame(){
  const grid = useRecoilValue(gridState)
  const winMode = useRecoilValue(winModeState)
  const { gameStatus, turn } = useRecoilValue(gameState)

  const currentPlayerTurn = isOdd(turn) ? 1 : 2
  const symbol = currentPlayerTurn === 1 ? TIC_TAC_TOE_SYMBOL.NOUGHT : TIC_TAC_TOE_SYMBOL.CROSS

  const makeComputerTurn = useComputerPlayer(grid, [symbol], winMode)

  return (
    <div>
      <GameHeader>
        {gameStatus === 'active' && (
          <>
            <p><strong>Turn:</strong> Player {currentPlayerTurn}</p>
            <p><strong>Symbol:</strong> {symbol}</p>
          </>
        )}
      </GameHeader>

      <BaseGame symbol={symbol} onComputerTurn={() => makeComputerTurn()} />

      <GameFooter />
    </div>
  )
}

export default StandardGame
