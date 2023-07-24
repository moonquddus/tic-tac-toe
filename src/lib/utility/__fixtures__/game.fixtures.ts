import { GameStateType } from '../../atoms/gameState'

export function createGameState(override: Partial<GameStateType>): GameStateType {
  return {
    gameStatus: 'active',
    turn: 1,
    winner: null,
    completingLine: null,
    ...override
  }
}
