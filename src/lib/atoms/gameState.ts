import { atom } from 'recoil'
import { TIC_TAC_TOE_SYMBOL } from '../model'

export type GameStateType = {
  turn: number
  selectedSymbol: TIC_TAC_TOE_SYMBOL
  gameStatus: 'active' | 'victory' | 'draw'
  winner: 1 | 2 | null
}

export const GAME_STATE_ID = 'gameState'

export const gameState = atom<GameStateType>({
  key: GAME_STATE_ID,
  default: {
    turn: 1,
    selectedSymbol: TIC_TAC_TOE_SYMBOL.NOUGHT,
    gameStatus: 'active',
    winner: null
  }
})
