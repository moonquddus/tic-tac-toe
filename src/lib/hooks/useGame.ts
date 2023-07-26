import { useRecoilState, useResetRecoilState } from 'recoil'
import { GameStateType, gameState } from '../atoms/gameState'

// basically provides a some helper functions for the game state
// could move over some utility functions if I wanted to, though
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
