/* Common types and enums go here */

export enum TIC_TAC_TOE_SYMBOL {
  NOUGHT = 'O',
  CROSS = 'X',
}

export type TurnActionType = [number, number, TIC_TAC_TOE_SYMBOL]
