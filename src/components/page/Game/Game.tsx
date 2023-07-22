import { useRecoilValue } from 'recoil'
import { variationState } from '../../../lib/atoms/variationState'
import { variationMap } from '../../../lib/gameConfig'

function Game() {
  const variation = useRecoilValue(variationState)
  const GameComponent = variationMap[variation]

  return (
    <GameComponent />
  )
}

export default Game
