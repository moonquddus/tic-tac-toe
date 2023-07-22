import { selector } from 'recoil'
import { winModeState } from './winModeState'
import { variationState } from './variationState'
import { gameModeState } from './gameModeState'

const SETTING_STATE_ID = 'settingState'

export default selector({
  key: SETTING_STATE_ID,
  get: ({get}) => {
    const winMode = get(winModeState)
    const variation = get(variationState)
    const gameMode = get(gameModeState)

    return { winMode, variation, gameMode }
  }
})
