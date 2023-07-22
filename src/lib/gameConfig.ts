import StandardGame from '../components/feature/StandardGame/StandardGame'
import WildGame from '../components/feature/WildGame/WildGame'
import { checkMisereWinCondition, checkStandardWinCondition } from './utility/gameUtils'

export const variationMap = {
  standard: StandardGame,
  wild: WildGame,
}

export const winModeMap = {
  standard: checkStandardWinCondition,
  misere: checkMisereWinCondition,
}
