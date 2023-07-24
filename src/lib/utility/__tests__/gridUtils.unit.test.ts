import { createDrawnGrid, createEmptyGrid, createPartiallyFilledGrid, createWinningAntiDiagGrid, createWinningColGrid, createWinningDiagGrid, createWinningRowGrid } from '../__fixtures__/grid.fixtures'
import { getAvailablePositions, getCompleteLine, isGridEmpty } from '../gridUtils'

describe('isGridEmpty', () => {
  it('should return true when the grid is empty', () => {
    const grid = createEmptyGrid()
    expect(isGridEmpty(grid)).toStrictEqual(true)
  })

  it('should return true when the grid is populated', () => {
    const grid = createPartiallyFilledGrid()
    expect(isGridEmpty(grid)).toStrictEqual(false)
  })
})

describe('getCompleteLine', () => {
  it('should return a complete row', () => {
    const grid = createWinningRowGrid()
    expect(getCompleteLine(grid)).toStrictEqual({direction: 'row', position: 0})
  })

  it('should return a complete col', () => {
    const grid = createWinningColGrid()
    expect(getCompleteLine(grid)).toStrictEqual({direction: 'col', position: 1})
  })

  it('should return a complete diagonal', () => {
    const grid = createWinningDiagGrid()
    expect(getCompleteLine(grid)).toStrictEqual({direction: 'diag'})
  })

  it('should return a complete anti-diagonal', () => {
    const grid = createWinningAntiDiagGrid()
    expect(getCompleteLine(grid)).toStrictEqual({direction: 'anti-diag'})
  })

  it('should return null when there is not a winning grid', () => {
    const grid = createPartiallyFilledGrid()
    expect(getCompleteLine(grid)).toStrictEqual(null)
  })
})

describe('getAvailablePositions', () => {
  it('should return a list of all available positions on the grid', () => {
    const grid = createPartiallyFilledGrid()
    expect(getAvailablePositions(grid)).toStrictEqual([
      {col: 1, row: 0}, {col: 2, row: 0}, {col: 0, row: 1}, {col: 1, row: 1}, {col: 0, row: 2}, {col: 2, row: 2}
    ])
  })

  it('should return an empty list when the grid is full', () => {
    const grid = createDrawnGrid()
    expect(getAvailablePositions(grid)).toStrictEqual([])
  })
})
