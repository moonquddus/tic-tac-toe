import { atom } from 'recoil'
import { CompleteLinePayload } from '../model'

// TODO: implement a waiting state for CPU
// TODO: make the interface a bit stricter - completingLine & winner should be null at the same time
export type GameStateType = {
  turn: number
  gameStatus: 'active' | 'waiting' | 'victory' | 'draw'
  winner: 1 | 2 | null
  completingLine: CompleteLinePayload | null
}

export const GAME_STATE_ID = 'gameState'

export const gameState = atom<GameStateType>({
  key: GAME_STATE_ID,
  default: {
    turn: 1,
    gameStatus: 'active',
    winner: null,
    completingLine: null,
  }
})
