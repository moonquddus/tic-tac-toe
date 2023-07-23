import { useNavigate } from 'react-router-dom'
import { PAGE_PATH } from '../../../lib/router'
import { MouseEventHandler, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { variationState } from '../../../lib/atoms/variationState'
import { winModeState } from '../../../lib/atoms/winModeState'
import { gameModeState } from '../../../lib/atoms/gameModeState'
import { useGame } from '../../../lib/hooks/useGame'
import { useGrid } from '../../../lib/hooks/useGrid'
import { gameModeMap, variationMap, winModeMap } from '../../../lib/gameConfig'
import styles from './Menu.module.css'
import Button from '../../ui/Button/Button'

function Menu() {
  const navigate = useNavigate()

  const { resetGame } = useGame()
  const { resetGrid } = useGrid()

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

  // I could clean this up even more, there are still a few too many things hardcoded
  // But I didn't want this to take too long, and this was a lower priority
  return (
    <div>
      <h1>Tic Tac Toe: Moon Edition</h1>
      <form>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Game mode:</legend>
          {Object.values(gameModeMap).map(configEntry => (
            <label className={styles.label} key={`game-mode-label-${configEntry.id}`}>
              <input className={styles.radio} type='radio' name='gameMode' value={configEntry.id} defaultChecked={gameMode === configEntry.id} onClick={() => setGameMode(configEntry.id)} /> {configEntry.title}
            </label>
          ))}
          <p className={styles.description}>{gameModeMap[gameMode].description}</p>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Variation:</legend>
          {Object.values(variationMap).map(configEntry => (
            <label className={styles.label} key={`variation-label-${configEntry.id}`}>
              <input className={styles.radio} type='radio' name='variation' value={configEntry.id} defaultChecked={variation === configEntry.id} onClick={() => setVariation(configEntry.id)} /> {configEntry.title}
            </label>
          ))}
          <p className={styles.description}>{variationMap[variation].description}</p>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Win conditions:</legend>
          {Object.values(winModeMap).map(configEntry => (
            <label className={styles.label} key={`win-mode-label-${configEntry.id}`}>
              <input className={styles.radio} type='radio' name='winMode' value={configEntry.id} defaultChecked={winMode === configEntry.id} onClick={() => setWinMode(configEntry.id)} /> {configEntry.title}
            </label>
          ))}
          <p className={styles.description}>{winModeMap[winMode].description}</p>
        </fieldset>
      </form>
      <div className={styles.formControls}>
        <Button type='button' onClick={onNewGameClick}>Start game</Button>
      </div>
    </div>
  )
}

export default Menu
