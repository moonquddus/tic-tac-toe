import { useNavigate } from 'react-router-dom'
import { PAGE_PATH } from '../../../lib/router'
import { MouseEventHandler, useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { variationState } from '../../../lib/atoms/variationState'
import { winModeState } from '../../../lib/atoms/winModeState'
import { gameModeState } from '../../../lib/atoms/gameModeState'
import { gridState } from '../../../lib/atoms/gridState'
import { gameState } from '../../../lib/atoms/gameState'

function Menu() {
  const navigate = useNavigate()

  const resetGame = useResetRecoilState(gameState)
  const resetGrid = useResetRecoilState(gridState)

  const [gameMode, setGameMode] = useRecoilState(gameModeState)
  const [variation, setVariation] = useRecoilState(variationState)
  const [winMode, setWinMode] = useRecoilState(winModeState)

  useEffect(() => {
    resetGame()
    resetGrid()
  }, [])

  const onNewGameClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    navigate(PAGE_PATH.GAME)
  }

  // I could make this all fancy, and generate this entire form from a config Map or something...
  // But there is such a thing as over-engineering haha
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <sub>Moon Edition</sub>
      <form>
        <fieldset>
          <legend>Game mode:</legend>
          <label>
            <input type='radio' name='gameMode' value='single-player' defaultChecked={gameMode === 'single-player'} onClick={() => setGameMode('single-player')} /> Single player (vs CPU)
          </label>
          <label>
            <input type='radio' name='gameMode' value='multi-player' defaultChecked={gameMode === 'multi-player'} onClick={() => setGameMode('multi-player')} /> Multiplayer (2 players)
          </label>
        </fieldset>

        <fieldset>
          <legend>Variation:</legend>
          <label>
            <input type='radio' name='variation' value='standard' defaultChecked={variation === 'standard'} onClick={() => setVariation('standard')} /> Standard
          </label>
          <label>
            <input type='radio' name='variation' value='wild' defaultChecked={variation === 'wild'} onClick={() => setVariation('wild')} /> Wild
          </label>
        </fieldset>

        <fieldset>
          <legend>Win conditions:</legend>
          <label>
            <input type='radio' name='winMode' value='standard' defaultChecked={winMode === 'standard'} onClick={() => setWinMode('standard')} /> Standard
          </label>
          <label>
            <input type='radio' name='winMode' value='misere' defaultChecked={winMode === 'misere'} onClick={() => setWinMode('misere')} /> Misere
          </label>
        </fieldset>
      </form>
      <button onClick={onNewGameClick}>Start game</button>
    </div>
  )
}

export default Menu
