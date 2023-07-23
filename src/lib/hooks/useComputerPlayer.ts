import { GridType } from '../atoms/gridState'
import { WinModeType } from '../atoms/winModeState'
import { TIC_TAC_TOE_SYMBOL, TurnActionType } from '../model'
import { useMisereComputer } from './useMisereComputer'
import { useStandardComputer } from './useStandardComputer'


export function useComputerPlayer(grid: GridType, availableSymbols: TIC_TAC_TOE_SYMBOL[], winMode: WinModeType){
  const winModeToCPUInstructions = {
    'standard': useStandardComputer,
    'misere': useMisereComputer,
  }

  const makeTurn = (): TurnActionType => {
    // TODO: I think it might be kinda cool to make the player wait a bit with a setTimeout
    // Makes the CPU seem more realistic
    const takeInstructions = winModeToCPUInstructions[winMode](grid, availableSymbols)
    return takeInstructions()
  }

  return makeTurn
}
