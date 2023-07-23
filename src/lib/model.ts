/* Common types and enums, quick helpers go here */

export enum TIC_TAC_TOE_SYMBOL {
  NOUGHT = 'O',
  CROSS = 'X',
}

export function getAllSymbols() {
  return Object.values(TIC_TAC_TOE_SYMBOL)
}

export type TurnActionType = [number, number, TIC_TAC_TOE_SYMBOL]

export type CompleteLinePayload = {
  direction: 'row' | 'col' | 'diag' | 'anti-diag'
  position?: number
}
