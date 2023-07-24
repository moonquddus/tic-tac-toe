import BaseGame from '../BaseGame/BaseGame'
import { useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { gameState } from '../../../lib/atoms/gameState'
import { isOdd } from '../../../lib/utility/numberUtils'
import GameHeader from '../GameHeader/GameHeader'
import { TIC_TAC_TOE_SYMBOL, getAllSymbols } from '../../../lib/model'
import { gridState } from '../../../lib/atoms/gridState'
import { winModeState } from '../../../lib/atoms/winModeState'
import { useComputerPlayer } from '../../../lib/hooks/useComputerPlayer'
import GameFooter from '../GameFooter/GameFooter'
import gameStyles from './WildGame.module.css'
import formStyles from '../../../assets/styling/form.module.css'
import { gameModeState } from '../../../lib/atoms/gameModeState'
import { getPlayerName } from '../../../lib/utility/gameUtils'

function WildGame(){
  const grid = useRecoilValue(gridState)
  const winMode = useRecoilValue(winModeState)
  const gameMode = useRecoilValue(gameModeState)
  const { gameStatus, turn } = useRecoilValue(gameState)
  const [selectedSymbol, setSymbol] = useState<TIC_TAC_TOE_SYMBOL>(TIC_TAC_TOE_SYMBOL.NOUGHT)

  const currentPlayerTurn = useMemo(() => {
    return isOdd(turn) ? 1 : 2
  }, [turn])
  const activePlayerName = getPlayerName(currentPlayerTurn, gameMode)

  const makeComputerTurn = useComputerPlayer(grid, getAllSymbols(), winMode)

  return (
    <div>
      <GameHeader>
        {gameStatus === 'active' && (
          <p><strong>Turn:</strong> {activePlayerName}</p>
        )}

        <form className={gameStyles.form}>
          <fieldset className={formStyles.fieldset}>
            <legend className={formStyles.legend}>Choose a symbol:</legend>
            {getAllSymbols().map(symbol => (
              <label className={`${formStyles.label} ${symbol === selectedSymbol ? formStyles.activeLabel : ''}`} key={`symbol-label-${symbol}`}>
                <input
                  className={formStyles.radio}
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
      </GameHeader>


      <BaseGame symbol={selectedSymbol} onComputerTurn={() => makeComputerTurn()} />

      <GameFooter />
    </div>
  )
}

export default WildGame
