import BaseGame from '../BaseGame/BaseGame'
import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'

function StandardGame(){
  const navigate = useNavigate()

  const onExitButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // TODO (someday...): add a warning modal if you're about to leave in the middle of a game
    event.preventDefault()
    navigate('/')
  }

  return (
    <div>
      <BaseGame />

      <button onClick={onExitButtonClick}>Exit game</button>
    </div>
  )
}

export default StandardGame