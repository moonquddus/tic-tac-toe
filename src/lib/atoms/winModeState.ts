import { atom } from 'recoil'

export type WinModeType = 'standard' | 'misere'

export const WINMODE_STATE_ID = 'winModeState'

export const winModeState = atom<WinModeType>({
  key: WINMODE_STATE_ID,
  default: 'standard'
})
