import { checkMisereWinCondition, checkStandardWinCondition, findGameCompletingTurns } from '../gameUtils'
import { createPartiallyFilledGrid, createWinnableGridForBoth, createWinningDiagGrid } from '../__fixtures__/grid.fixtures'
import { TIC_TAC_TOE_SYMBOL } from '../../model'

const { NOUGHT, CROSS } = TIC_TAC_TOE_SYMBOL

describe('checkStandardWinCondition', () => {
  it('should declare a winner for Player 1', () => {
    const grid = createWinningDiagGrid()
    const currentPlayerTurn = 1
    expect(checkStandardWinCondition({ grid, currentPlayerTurn})).toStrictEqual({
      winner: 1,
      completingLine: {
        direction: 'diag'
      }
    })
  })

  it('should NOT declare a winner when there is no winning grid', () => {
    const grid = createPartiallyFilledGrid()
    const currentPlayerTurn = 1
    expect(checkStandardWinCondition({ grid, currentPlayerTurn })).toStrictEqual(null)
  })
})

describe('checkMisereWinCondition', () => {
  it('should declare a winner for Player 2 instead of Player 1', () => {
    const grid = createWinningDiagGrid()
    const currentPlayerTurn = 1
    expect(checkMisereWinCondition({ grid, currentPlayerTurn})).toStrictEqual({
      winner: 2,
      completingLine: {
        direction: 'diag'
      }
    })
  })

  it('should NOT declare a winner when there is no winning grid', () => {
    const grid = createPartiallyFilledGrid()
    const currentPlayerTurn = 1
    expect(checkMisereWinCondition({ grid, currentPlayerTurn })).toStrictEqual(null)
  })
})

describe('findGameCompletingTurns', () => {
  it('should return the possible winning move for ONLY noughts', () => {
    const grid = createWinnableGridForBoth()
    const availableSymbols = [NOUGHT]
    expect(findGameCompletingTurns(grid, availableSymbols)).toStrictEqual([[0, 2, NOUGHT]])
  })

  it('should return the possible winning move for ONLY crosses', () => {
    const grid = createWinnableGridForBoth()
    const availableSymbols = [CROSS]
    expect(findGameCompletingTurns(grid, availableSymbols)).toStrictEqual([[1, 0, CROSS]])
  })

  it('should return the possible winning move for both (in Wild mode)', () => {
    const grid = createWinnableGridForBoth()
    const availableSymbols = [CROSS, NOUGHT]
    expect(findGameCompletingTurns(grid, availableSymbols)).toStrictEqual([
      [0, 2, NOUGHT],
      [1, 0, CROSS],
    ])
  })

  it('should return null when there are no winnable moves to make', () => {
    const grid = createPartiallyFilledGrid()
    const availableSymbols = [CROSS, NOUGHT]
    expect(findGameCompletingTurns(grid, availableSymbols)).toStrictEqual([])
  })
})
