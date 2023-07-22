import { atom } from 'recoil'

export type VariationType = 'standard' | 'wild'

export const VARIATION_STATE_ID = 'variationState'

export const variationState = atom<VariationType>({
  key: VARIATION_STATE_ID,
  default: 'standard'
})
