import { useNavigate } from 'react-router-dom'
import Button from '../../ui/Button/Button'
import styles from './GameFooter.module.css'
import { useGame } from '../../../lib/hooks/useGame'
import { useGrid } from '../../../lib/hooks/useGrid'
import { MouseEventHandler } from 'react'

function GameFooter(){
  const navigate = useNavigate()
  const { resetGame } = useGame()
  const { resetGrid } = useGrid()

  const onRestartClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    resetGame()
    resetGrid()
  }

  const onExitButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // TODO (someday...): add a warning modal if you're about to leave in the middle of a game
    event.preventDefault()
    navigate('/')
  }

  return (
    <footer className={styles.footer}>
      <Button onClick={onRestartClick} variation='primary' data-testid='reset-button'>Restart game</Button>
      <Button onClick={onExitButtonClick} variation='secondary'>Exit to menu</Button>
    </footer>
  )
}

export default GameFooter
