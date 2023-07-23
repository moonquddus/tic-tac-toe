import { atom } from 'recoil'

export type GameStateType = {
  turn: number
  gameStatus: 'active' | 'waiting' | 'victory' | 'draw'
  winner: 1 | 2 | null
}

export const GAME_STATE_ID = 'gameState'

export const gameState = atom<GameStateType>({
  key: GAME_STATE_ID,
  default: {
    turn: 1,
    gameStatus: 'active',
    winner: null
  }
})
