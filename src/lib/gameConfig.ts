import StandardGame from '../components/feature/StandardGame/StandardGame'
import { checkMisereWinCondition, checkStandardWinCondition } from './utility/gameUtils'

export const variationMap = {
  standard: StandardGame,
  wild: StandardGame,
}

export const winModeMap = {
  standard: checkStandardWinCondition,
  misere: checkMisereWinCondition,
}
