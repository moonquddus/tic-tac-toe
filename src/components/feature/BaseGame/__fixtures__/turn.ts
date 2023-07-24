import { TIC_TAC_TOE_SYMBOL, TurnActionType } from '../../../../lib/model'

export function createTurnAction(row: number, col: number, symbol: TIC_TAC_TOE_SYMBOL): TurnActionType{
  return [row, col, symbol]
}
