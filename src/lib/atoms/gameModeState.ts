// In hindsight, should have called this playerMode state
// Makes it a bit clear as to what this is

import { atom } from 'recoil'

export type GameModeType = 'single-player' | 'multi-player'

export const GAMEMODE_STATE_ID = 'gameModeState'

export const gameModeState = atom<GameModeType>({
  key: GAMEMODE_STATE_ID,
  default: 'single-player'
})
