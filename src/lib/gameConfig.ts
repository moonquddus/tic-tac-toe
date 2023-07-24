import StandardGame from '../components/feature/StandardGame/StandardGame'
import WildGame from '../components/feature/WildGame/WildGame'
import { GameModeType } from './atoms/gameModeState'
import { VariationType } from './atoms/variationState'
import { WinConditionFunctionPayload, WinConditionReturnType, checkMisereWinCondition, checkStandardWinCondition } from './utility/gameUtils'
import { WinModeType } from './atoms/winModeState'

type GameModeConfig = {
  id: GameModeType
  title: string
  description: string
}
export const gameModeMap: Record<string, GameModeConfig> = {
  'single-player': {
    id: 'single-player',
    title: 'Single-player',
    description: 'Play against our *Ultra-Braniac-Super-Smart-Prodigious-AI 🤖 (*made in <2 hours with a dozen energy drinks & Metallica blasting in the background)'
  },
  'multi-player': {
    id: 'multi-player',
    title: 'Multi-player',
    description: 'Play against the friend right next to you. All is fair in love and war. Distract them with a funny dance, or that marvellous singing voice of yours.'
  }
}

type VariationConfig = {
  id: VariationType
  title: string
  description: string
  component: () => JSX.Element
}
export const variationMap: Record<string, VariationConfig> = {
  standard: {
    id: 'standard',
    title: 'Standard',
    description: 'The classic. Player 1 has the noughts, Player 2 has the crosses.',
    component: StandardGame
  },
  wild: {
    id: 'wild',
    title: 'Wild',
    description: 'Let\'s get freaky! You can choose each turn whether to put down a nought or cross.',
    component: WildGame
  },
}

type WinModeConfig = {
  id: WinModeType
  title: string
  description: string
  validation: (args: WinConditionFunctionPayload) => WinConditionReturnType
}
export const winModeMap: Record<string, WinModeConfig> = {
  standard: {
    id: 'standard',
    title: 'Standard',
    description: 'If there\'s three-in-a-row at the end of your turn, you win. Easy stuff.',
    validation: checkStandardWinCondition
  },
  misere: {
    id: 'misere',
    title: 'Misere',
    description: 'If there\'s three-in-a-row at the end of your turn, you LOSE 😱😱😱',
    validation: checkMisereWinCondition
  },
}
