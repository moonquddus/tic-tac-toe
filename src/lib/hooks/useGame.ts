import { useRecoilState, useResetRecoilState } from 'recoil'
import { GameStateType, gameState } from '../atoms/gameState'

export function useGame(){
  const [currentGameState, setGameState] = useRecoilState(gameState)
  const resetGame = useResetRecoilState(gameState)

  const updateGame = (args: Partial<GameStateType>) => {
    setGameState({
      ...currentGameState,
      ...args,
    })
  }

  return {
    gameState: currentGameState,
    updateGame,
    resetGame,
  }
}
